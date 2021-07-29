import BaseMeta from '../metadata/basemeta.class';
import {Metadata} from '../metadata/metadata.class'
import ResponseArgs from '../helpers/responseArgs'
import * as mdHelper from '../helpers/mdObjectHelper'

export async function processCommand(req:any, res:any)
 {
    let body = req.body;
    const commandName = body.commandName;
    const options = body.options;
    if (!commandName){
        res.status(500).send('there is no command to process');
    }
    const resArgs = new ResponseArgs(res);
    await processRequest(commandName, options, resArgs);
    await resArgs.send();
 }

 async function processRequest(name: string, params: any, resArgs:ResponseArgs) {
    if (!processors[name]) {
        resArgs.res.status(500).send('unprocessed request');
        return;
    }
      return await processors[name](params, resArgs);
}


async function getMdObjectsList(options: any, resArgs:ResponseArgs){
    const mdTypeId = options.mdTypeId;
    const parentId = options.parentId;
    const t = await mdHelper.getObjectsList(mdTypeId, parentId);  
    resArgs.resData = t;  
    return true;
}; 

async function getMdTypesList(options: any, resArgs:ResponseArgs){
    const t = await mdHelper.getMdTypesList();  
    resArgs.resData = t;  
    return true;
}; 
 

export async function getMdObjectData(options: any, resArgs:ResponseArgs){
    const mdTypeId = options.mdTypeId;
    const mdObjectId = options.mdObjectId;
    const mdParentId = options.parentId;
    if(!mdTypeId){
        resArgs.messageId = 1;
        resArgs.status = 500;
    }
    else
    {
        await Metadata.getMdObjectFields(mdTypeId, mdObjectId, mdParentId, resArgs);
    }
    return true;
} 

export async function deleteMdObject(options: any, resArgs:ResponseArgs){
    const mdTypeId = options.mdTypeId;
    const mdObjectId = options.mdObjectId;
    if(!mdObjectId){
        resArgs.messageId = 1;
        resArgs.status = 500;
    }
    else
    {
        await Metadata.deleteMdObject(mdTypeId, mdObjectId, resArgs);
    }
    return true;
} 

export async function saveMdObject(options: any, resArgs:ResponseArgs){
    const fieldValues = options.mdObject;
    
    if(!fieldValues){
        resArgs.res.status(500).send('expected data object ');       
        return true;
    }
    const mdObject = await Metadata.fillMdObject(fieldValues, resArgs);
    await mdObject.save();
    await Metadata.getMdObjectFields(mdObject.typeId, mdObject.id, mdObject.parentId, resArgs); 
     
    return true;
} 

export async function initConfigModel(options:any, resArgs:ResponseArgs) {
    let force = options.force;
    if(!force){force = false}
    try{
        await mdHelper.initModel(force);
        resArgs.messageId = 2;
    }catch(e){
        resArgs.status = 500;
        resArgs.messageId = 3;
        resArgs.errorDescription = String(e); 
        resArgs.cancel = true;
    }
}


const processors: { [K: string]: Function } = {
    getMdObjectsList: getMdObjectsList,
    getMdObject:getMdObjectData,
    saveMdObject:saveMdObject,
    initConfigModel:initConfigModel,
    deleteMdObject:deleteMdObject,
    getMdTypesList:getMdTypesList
};


