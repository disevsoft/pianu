import BaseMeta from '../metadata/basemeta.class'
import MdType from '../metadata/mdType.class'
import {md_objects_types} from '../database/config/models/md_objects_types'
import {md_types} from '../database/config/models/md_types'
import {md_map} from '../database/config/models/md_map'


import db from '../database/config/sequilize.metadata'

export async function loadFromModelData(mdObject:any, modelData:any){
    for (let mdField of mdObject.mdFields) {
        if(mdField.fieldMap){
            mdField.value = modelData[mdField.fieldMap];
            (<any>mdObject)[mdField.name] =  mdField.value;  
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
    const mdModelData:any = await GetModelDataFromDB(mdModel, mdObjectId);
    return mdModelData;    
} 

export async function getMdModel(modelName:string){    
    const mdModel = await require('../database/config/models/'+modelName)[modelName];
    return mdModel; 
}

export async function GetModelDataFromDB(mdModel:any, mdObjectId:string){
    const mdModelData:any = await mdModel.findOne({ where: { id: mdObjectId } });
    return mdModelData;
} 


export class DynamicClass {  

    constructor(className: string, opts: any) {
        const Store = require('../metadata/mdStore').Store;
        if (Store[className] === undefined || Store[className] === null) {
            throw new Error(`Class type of \'${className}\' is not in the store`);
        } 
        return new Store[className](opts); 
    } 
}

export async function getInstanceById(mdObjectId:string) {
    const mdTypeIdModel:any= await md_objects_types.findOne({ attributes: ['md_type_id'], where: {md_object_id:mdObjectId}});

    if(!mdTypeIdModel || !mdTypeIdModel['md_type_id']) {return undefined};
    const mdType:MdType|undefined = await MdType.getMdType(mdTypeIdModel['md_type_id']); 
    if(!mdType){return undefined}
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
        await fetchAllData(mdType);  
        filteredObjects = BaseMeta.mdObjects.filter(elem=>elem.typeId ===mdTypeId);
    }
    return filteredObjects;  
}

export async function fetchChildrenData(mdType:MdType, parentId:string) {
    const mdModel =  await require('../database/config/models/'+mdType.tableName)[mdType.tableName];
    if (!mdModel){
        console.log('model not found ' + mdType.tableName);
        return; 
    }
    const childrenData:any = await md_map.findAll({where:{md_owner_id:parentId}});
    for (let element of childrenData){
        const instance = await getInstanceById(element.md_object_id);    
        await instance.setParentId(parentId);
    } 
}
export async function fetchAllData(mdType:MdType) {
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
  };
  
  async function initMdModel(modelName:string){
    await require('../database/config/models/' + modelName)[modelName]; 
  };
  
  async function setBaseValues(){
    const mdTypes = require('../database/config/md_types.config') 
    for (const item of mdTypes){      
      if(item.is_database_type){continue};
      await initMdModel(item.table_name);
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