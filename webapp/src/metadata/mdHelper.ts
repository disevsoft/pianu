import {MdTypes} from './MdTypes'
import {ApiCommandArgs, ApiMain} from '../services/app/api.service'
import MdType from './mdType.class'
import BaseMeta from './basemeta.class'
import {Store} from './mdStore'

export class DynamicClass {  
    constructor(className: string, opts: any) {
        if (Store[className] === undefined || Store[className] === null) {
            throw new Error(`Class type of ${className} is not in the store`);
        } 
        return new Store[className](opts); 
    } 
}

export async function getMdObject(mdTypeId:MdTypes, mdObjectId:string, parentId:string) {
    let mdObject = BaseMeta.mdObjects.find(elem=>elem.id === mdObjectId && elem.parentId === parentId);  
    if(!mdObject){
        await getMdObjects(mdTypeId, parentId);
        mdObject = BaseMeta.mdObjects.find(elem=>elem.id === mdObjectId && elem.parentId === parentId);  
    }
    return mdObject
}

export async function getMdObjectById(mdObjectId:string, parentId:string) {
    const mdType = await MdType.getType((mdObjectId as MdTypes))
    if(mdType){return mdType}
    let mdObject = BaseMeta.mdObjects.find(elem=>elem.id === mdObjectId && elem.parentId === parentId);  
    if(!mdObject){
        await loadMdObject(mdObjectId, parentId);
        mdObject = BaseMeta.mdObjects.find(elem=>elem.id === mdObjectId && elem.parentId === parentId);  
    }
    return mdObject
}

async function loadMdObject(mdObjectId:string, parentId:string){
    const apiCommandArgs = new ApiCommandArgs("getMdObjectById", {mdObjectId: mdObjectId, parentId: parentId})
    const data = await ApiMain.execApiCommand(apiCommandArgs);
    
    if(!data){
        throw Error(`object id = ${mdObjectId} not found`);
    }
    await loadMdObjectFromData(data);
}


export async function loadMdObjectFromData(data:any){
    for await (const iterator of (data as any)) {
        if(!iterator){continue;}
        const mdType = await MdType.getType(iterator.typeId)
        if(!mdType){
            console.log('type ' + iterator.typeId + ' not found');
            continue;       
        }
        const newObject:any =  new DynamicClass(mdType.className, iterator.mdId);           
        await loadObjectFromData(newObject, iterator);    
        BaseMeta.mdObjects.push(newObject);
    }   
}

export async function getMdObjects(mdTypeId:MdTypes, parentId:string) {      
    
    let mdObjects = BaseMeta.mdObjects.filter(elem=>elem.typeId === mdTypeId && elem.parentId === parentId);   
    if(mdObjects.length ===0){
        await loadMdObjects(mdTypeId, parentId);
        mdObjects = BaseMeta.mdObjects.filter(elem=>elem.typeId === mdTypeId && elem.parentId === parentId);  
    }  
    return mdObjects;
}

export async function resetCache() {
   await MdType.resetCache();
   BaseMeta.mdObjects = [];
}

async function loadMdObjects(mdTypeId:MdTypes, parentId:string){  
    
    const mdType = await MdType.getType(mdTypeId);      
    if(!mdType){
        console.log('type ' + mdTypeId + ' not found');
        return;       
    }
    if (mdType.cached){return}
    if(!mdType.isMdType){return}

    const apiCommandArgs = new ApiCommandArgs("getMdObjectsList", {mdTypeId: mdTypeId, parentId: parentId})
    const data = await ApiMain.execApiCommand(apiCommandArgs);
    
    for await (const iterator of (data as any)) {
        const newObject:any =  new DynamicClass(mdType.className, iterator.mdId);           
        await loadObjectFromData(newObject, iterator);    
        BaseMeta.mdObjects.push(newObject);
    }   
    mdType.cached = true;
}

async function loadObjectFromData(mdObject:any, data:any){ 
    for (const key in mdObject) {
        (mdObject as any)[key] = data[key];
    }  
};