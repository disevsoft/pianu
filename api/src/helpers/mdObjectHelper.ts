import BaseMeta from '../metadata/basemeta.class'
import MdType from '../metadata/mdType.class'

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
    console.log('4get model data start');    
    const mdModel = await getMdModel(modelName);  

    console.log('6get model data progress', mdModel);
    const mdModelData:any = await mdModel.findOne({ where: { id: mdObjectId } });
     console.log('7get model data end'); 
    return mdModelData;  
} 

export function getMdModel(modelName:string){    
    console.log('5getMdModel');         
    const mdModel =  require('../database/config/models/'+modelName)[modelName];
    console.log('51 modelModule[modelName]', mdModel);  
    return mdModel; 
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
    const newObject:any =  new DynamicClass(className, id); 
    if(!id){//its new
        return newObject;  
    };
    let mdObject:BaseMeta|undefined=BaseMeta.mdObjects.find((element:any)=>element.id === id); 
    console.log('3getInstance start');
    if(!mdObject){
        const mdModelData = await getModelData(newObject?.modelName, id);
        console.log('8getInstance progress');
        if(!mdModelData){console.log('no model data ' + newObject?.modelName); return;}      
        await loadFromModelData(newObject, mdModelData);
        BaseMeta.mdObjects.push(newObject);
        mdObject = newObject;
    } 
    console.log('9getInstance end');
    return mdObject;
} 

export async function getObjectsList(mdTypeId:string, parentId:string){
    const t= BaseMeta.mdObjects;
    console.log('1start',t);
    
    if(!mdTypeId) {return undefined};
    const mdType:any = await MdType.getMdType(mdTypeId);   
    await fetchAllData(mdType); 
    const filteredObjects = BaseMeta.mdObjects.filter(elem=>elem.typeId ===mdTypeId);
    console.log('end',BaseMeta.mdObjects);
    
    return filteredObjects; 
}

export async function fetchAllData(mdType:MdType) {
    const mdModel =  await require('../database/config/models/'+mdType.tableName)[mdType.tableName];
    if (!mdModel){
        console.log('model not found ' + mdType.tableName);
        return; 
    }
    const modelData = await mdModel.findAll();
    await modelData.forEach(async(element:any) => {
        console.log('2 now fetch');
        
        await getInstance(mdType.className, element.id);  
    }); 
};