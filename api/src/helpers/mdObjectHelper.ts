import BaseMeta from '../metadata/basemeta.class'
import MdType from '../metadata/mdType.class'
import {md_objects_types} from '../database/config/models/md_objects_types'
import {md_types} from '../database/config/models/md_types'
import {md_map} from '../database/config/models/md_map'
import {createDefaultUser, getUserMenuId} from '../services/user.service'
import db from '../database/config/sequilize.metadata'
import { MdTypes } from '../metadata/mdTypes'
import { getMdObjectById, getMdObjectData } from '../services/metadata.service'
import { Metadata } from '../metadata/metadata.class'
import UserRights from '../classes/userRights.class'
import MdMenuItem from '../metadata/mdMenuItem.class'

export class DynamicClass {   

    constructor(className: string, opts: any) {
        const Store = require('../metadata/mdStore').Store;
        if (Store[className] === undefined || Store[className] === null) {
            throw new Error(`Class type of \'${className}\' is not in the store`);
        } 
        return new Store[className](opts);  
    } 
}

export async function loadFromModelData(mdObject:any, modelData:any){
    for (let mdField of mdObject.mdFields) {
        if(mdField.fieldMap){
            (<any>mdObject)[mdField.name] = modelData[mdField.fieldMap];
            }
        }
    return mdObject;
};

export async function getModelData(modelName:string, mdObjectId:string){
    if(!mdObjectId || !modelName){
        console.log('empty');           
        return undefined;
    }
    const mdModel = await getMdModel(modelName);  
    const mdModelData:any = await getModelDataFromDB(mdModel, mdObjectId);
    return mdModelData;    
} 

export async function getMdModel(modelName:string){    
    const mdModel = await require('../database/config/models/'+modelName)[modelName];
    return mdModel; 
}

export async function getModelDataFromDB(mdModel:any, mdObjectId:string){
    const mdModelData:any = await mdModel.findOne({ where: { id: mdObjectId } });
    return mdModelData;
} 

export async function getInstanceById(mdObjectId:string) {
    const mdTypeIdModel:any= await md_objects_types.findOne({ attributes: ['md_type_id'], where: {md_object_id:mdObjectId}});

    if(!mdTypeIdModel || !mdTypeIdModel['md_type_id']) {return undefined};
    const mdType:MdType|undefined = await MdType.getMdType(mdTypeIdModel['md_type_id']); 
    if(!mdType || !mdType.isMdType){return undefined}
    return getInstance(mdType.className, mdObjectId);
}

export async function getInstance(className:string, id:string){    
    const newObject:any =  new DynamicClass(className, id); 
    if(!id){//its new
        return newObject;   
    };
    
    let mdObject:BaseMeta|undefined=  BaseMeta.mdObjects.find((element:BaseMeta)=> element.id === id);  
    if(!mdObject){ 
        const mdModelData = await getModelData(newObject?.modelName, id);
        if(!mdModelData){console.log('no model data ' + newObject?.modelName); return;}      
        await loadFromModelData(newObject, mdModelData);
        BaseMeta.mdObjects.push(newObject);  
        mdObject = newObject;
    } 
    return mdObject; 
} 

export async function getObjectsList(mdTypeId:string, parentId:string){
    if(!mdTypeId) {return undefined};
    const mdType:any = await MdType.getMdType(mdTypeId);  
    let filteredObjects =[];
    if(parentId){
        await fetchChildrenData(mdType, parentId); 
        filteredObjects = BaseMeta.mdObjects.filter(elem=>elem.typeId ===mdTypeId && elem.parentId===parentId);
    }else{
        //await fetchAllData(mdType);  
        await fetchAllDataWithoutParent(mdType);
        filteredObjects = BaseMeta.mdObjects.filter(elem=>elem.typeId ===mdTypeId );
    }
    return filteredObjects;  
}

export async function getUserMenu(userId:string){
    const menuid = await getUserMenuId(userId);
    const itemArray:BaseMeta[] = [];
    const menuRoot =  await Metadata.getMdObject(MdTypes.MenuItem, menuid, '');
    itemArray.push(menuRoot);
    await getChildrenMenuItems(userId, menuid, itemArray);

    return itemArray;  
}

export async function getChildrenMenuItems(userId:string, menuItemId:string, itemArray:BaseMeta[]) {
    const childItems = await getObjectsList(MdTypes.MenuItem, menuItemId);  
    if(!childItems){return}
   for await (const iterator of childItems) {
    if (await UserRights.canReadObject(userId, (iterator as MdMenuItem).objectId)){
        itemArray.push(iterator);    
    }
    await getChildrenMenuItems(userId, iterator.id, itemArray)
   }
}

export async function getMdTypesList(){ 
    return MdType.getAllTypes();
}

export async function fetchChildrenData(mdType:MdType, parentId:string) {
    if(!mdType.tableName){return}
    const mdModel =  await require('../database/config/models/'+mdType.tableName)[mdType.tableName];
    if (!mdModel){
        console.log('model not found ' + mdType.tableName);
        return; 
    }
    const childrenData:any = await md_map.findAll({where:{md_owner_id:parentId}});
    for (let element of childrenData){
        const instance = await getInstanceById(element.md_object_id);   
        if(instance){ 
            await instance.setParentId(parentId);
        }
    } 
}
export async function fetchAllData(mdType:MdType) {
    if(!mdType.tableName){return}
    const mdModel =  await require('../database/config/models/'+mdType.tableName)[mdType.tableName];
    if (!mdModel){
        console.log('model not found ' + mdType.tableName);
        return; 
    }
    const modelData = await mdModel.findAll({ order: [['name', 'ASC'], ],});
    for (let element of modelData){
        await getInstance(mdType.className, element.id);    
    } 
};

export async function fetchAllDataWithoutParent(mdType:MdType) {
    if(!mdType.tableName){return}
    const mdModel =  await require('../database/config/models/'+mdType.tableName)[mdType.tableName];
    if (!mdModel){
        console.log('model not found ' + mdType.tableName);
        return; 
    }

    const modelData = await mdModel.findAll({ order: [['name', 'ASC'], ],});
    const childrenData:any = await md_map.findAll();
    for (let element of modelData){
        const instance = await getInstance(mdType.className, element.id);    
        const parent = await childrenData.find((elem:any)=>elem.md_object_id ===element.id)
        if(parent){
            await instance.setParentId(parent.md_owner_id)
        }
    } 
};


export async function initModel(force:boolean){
    let updateOpts:any={};
    if(force){
      updateOpts.force = true;
    }else{
      updateOpts.alter = true;
    }
    await db.sequelize.sync(updateOpts).then(() => {
      console.log('Alter database');
    });
    
    initMdModel('md_domain_users');

    await setBaseValues();  
    
    await db.sequelize.sync(updateOpts).then(() => {
      console.log('Alter database');
    });
    await createDefaultUser(); 
    await createDefaultMenu(); 
  };
  
  async function initMdModel(modelName:string){
    await require('../database/config/models/' + modelName)[modelName]; 
  };
  
  async function setBaseValues(){
    const mdTypes = require('../database/config/md_types.config') 
    for (const item of mdTypes){      
      if(item.is_md_type){ await initMdModel(item.table_name)};
     
      const obj = await md_types.findOne({ where: { id: item.id } });
      if(obj){
         await md_types.update(item, 
          { 
            where: { id: item.id }
          })
      } else{ 
          await md_types.create(item); 
      }  
    };
  }; 

  async function createDefaultMenu(){
    const fullInterface = {id:'e5691804-20cf-4b13-a0a3-7338cdadccec', name:'FulInterface', synonym:'Полное меню'};
    const md_menu_item = await require('../database/config/models/' + 'md_menu_items')['md_menu_items']; 
    const obj = await md_menu_item.findOne({ where: { id: fullInterface.id } });
    
    if(obj){
        await md_menu_item.update(md_menu_item, 
         { 
           where: { id: fullInterface.id }
         })
     } else{ 
        await md_menu_item.create(fullInterface); 
     }  

     const md_objects_types = await require('../database/config/models/' + 'md_objects_types')['md_objects_types']; 
     const objectType = await md_objects_types.findOne({ where: { md_object_id: fullInterface.id } });
     if(objectType){
        await md_objects_types.update({md_object_id:fullInterface.id, md_type_id:MdTypes.MenuItem}, 
         { 
           where: { md_object_id:fullInterface.id}
         })
     } else{ 
         await md_objects_types.create({md_object_id:fullInterface.id, md_type_id:MdTypes.MenuItem}); 
     }  
  }
