import BaseMeta from '../metadata/basemeta.class';
import {Metadata} from '../metadata/metadata.class'
import ResponseArgs from '../helpers/responseArgs'
export async function processCommand(req:any, res:any)
 {
    let body = req.body;
    const commandName = body.command;
    const options = body.options;
    if (!commandName){
        res.status(500).send('there is no command to process');
    }
    const resArgs = new ResponseArgs(res);
    await processRequest(commandName, options, resArgs);
    resArgs.send();
 }

 function processRequest(name: string, params: any, resArgs:ResponseArgs) {
    if (!processors[name]) {
        resArgs.res.status(500).send('unprocessed request');
        return;
    }
      return processors[name](params, resArgs);
}


async function getMdObjectsList(options: any, resArgs:ResponseArgs){
    const t = await Metadata.Catalogs;
    resArgs.resData = JSON.stringify([...t]); 
    resArgs.sendJson=false;
    return true;
}; 

export async function getMdObjectData(options: any, resArgs:ResponseArgs){
    const mdTypeId = options.mdTypeId;
    const mdObjectId = options.mdObjectId;
    if(!mdTypeId){
        resArgs.messageId = 1;
        resArgs.status = 500;
    }
    else
    {
        await Metadata.getMdObjectFields(mdTypeId, mdObjectId, resArgs);
    }
    return true;
} 

export async function saveMdObject(options: any, resArgs:ResponseArgs){
    const fieldValues = options.mdObject;
    
    if(!fieldValues){
        resArgs.res.status(500).send('expected data object ');       
        return true;
    }
    const mdObject = await Metadata.saveMdObject(fieldValues, resArgs);
    mdObject.save();
    resArgs.resData = mdObject?.mdFields;
    //resArgs.res.json(mdObject?.mdFields);  
    
} 



const processors: { [K: string]: Function } = {
    getMdObjectsList: getMdObjectsList,
    getMdObject:getMdObjectData,
    saveMdObject:saveMdObject
};


