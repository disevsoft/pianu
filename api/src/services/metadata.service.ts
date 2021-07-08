import BaseMeta from '../metadata/basemeta.class';
import {Metadata} from '../metadata/metadata.class'

export async function processCommand(req:any, res:any)
 {
    let body = req.body;
    const commandName = body.command;
    const options = body.options;
    if (!commandName){
        res.status(500).send('there is no command to process');
    }
    processRequest(commandName, options, res)
 }

async function getMdObjectsList(options: any, res: any){
    const t = await Metadata.Catalogs;
    res.send(JSON.stringify([...t]));  
    return true;
};

export async function getMdObjectData(options: any, res: any){
    const mdTypeId = options.mdTypeId;
    const mdObjectId = options.mdObjectId;
    if(!mdTypeId){
        res.status(500).send('type not defined');       
    }
    const mdObject = await Metadata.getMdObject(mdTypeId, mdObjectId);

    res.json(mdObject?.mdFields);  
    return true;
} 

export async function saveMdObject(options: any, res: any){
    const fieldValues = options.mdObject;
    
    if(!fieldValues){
        res.status(500).send('expected data object ');       
    }
    const mdObject = await Metadata.saveMdObject(fieldValues);
    res.json(mdObject?.mdFields);  
    return true;
} 



const processors: { [K: string]: Function } = {
    getMdObjectsList: getMdObjectsList,
    getMdObject:getMdObjectData,
    saveMdObject:saveMdObject
};

function processRequest(name: string, params: any, res:any) {
    if (!processors[name]) {
        res.status(500).send('unprocessed request');
        return;
    }
      return processors[name](params, res);
}

