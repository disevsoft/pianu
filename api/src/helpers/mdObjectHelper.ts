import BaseMeta from '../metadata/basemeta.class'
import MdType from '../metadata/mdType.class'
import {md_objects_types} from '../database/config/models/md_objects_types'

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
    return getInstance(mdObjectId, mdType.className);
}

export async function getInstance(id:string, className:string){    
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
    await fetchAllData(mdType); 
    const filteredObjects = BaseMeta.mdObjects.filter(elem=>elem.typeId ===mdTypeId);
    return filteredObjects;  
}

export async function fetchAllData(mdType:MdType) {
    const mdModel =  await require('../database/config/models/'+mdType.tableName)[mdType.tableName];
    if (!mdModel){
        console.log('model not found ' + mdType.tableName);
        return; 
    }
    const modelData = await mdModel.findAll();
    for (let element of modelData){
        await getInstance(mdType.className, element.id);    
    } 
};