import BaseMeta from '../metadata/basemeta.class'
import MdType from '../metadata/mdType.class'

export async function loadFromModelData(mdObject:any, modelData:any){
    for (let mdField of mdObject.mdFields) {
    if(mdField.fieldMap){
        mdField.value = modelData[mdField.fieldMap];
        (<any>mdObject)[mdField.name] =  mdField.value;  
    }
    }
    BaseMeta.mdObjects.push(mdObject);  
    return mdObject;
};

export async function getModelData(modelName:string, mdObjectId:string){
    if(!mdObjectId || !modelName){
        console.log('empty');           
        return undefined;
    }
    const mdModel =  await require('../database/config/models/'+modelName)[modelName];
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

export async function getInstance(className:string, id:string){    
    let catalog:any =  new DynamicClass(className, id); 
    if(!id){//its new
        return catalog;  
    };
    let mdObject:BaseMeta| undefined=BaseMeta.mdObjects.find((element:any)=>element.id === id); 
    if(!mdObject){
        const mdModelData = await getModelData(catalog.modelName, id);
        if(!mdModelData){return;}
        
        loadFromModelData(catalog, mdModelData);
    } 
    return mdObject;
} 

export async function getObjectsList(mdTypeId:string, parentId:string){
    const mdType:any = await MdType.getMdType(mdTypeId); 
    await fetchAllData(mdType);
    return BaseMeta.mdObjects; 
}

export async function fetchAllData(mdType:MdType) {
    const mdModel =  await require('../database/config/models/'+mdType.tableName)[mdType.tableName];
    if (!mdModel){
        console.log('model not found ' + mdType.tableName);
        return;
    }
    const modelData = await mdModel.findAll();
    modelData.forEach(async (element:any) => {
        await getInstance(mdType.className, element.id); 
    });
};