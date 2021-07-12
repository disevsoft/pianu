import BaseMeta from '../metadata/basemeta.class'

export async function loadFromModelData(mdObject:BaseMeta, modelData:any){
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