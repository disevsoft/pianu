
import { Domain } from "domain";
import { md_domain_users } from "../database/config/models/md_domain_users";
import ResponseArgs from "../helpers/responseArgs";
import MdDomain from "../metadata/mdDomain.class";

const processors: { [K: string]: Function } = {
    getListDataForView: getListDataForView,
    getDomainUsers:getDomainUsers,
    saveDomainUsers:saveDomainUsers
};

export async function processCommand(req:any, res:any)
 {
    let body = req.body;
    const commandName = body.commandName;
    const options = body.options;
    if (!commandName){
        res.status(500).send('there is no command to process');
    }
    const resArgs = new ResponseArgs(res, req.userId);
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
async function getListDataForView(options: any, resArgs:ResponseArgs){
    resArgs.resData = [];  
    return true;
}; 

async function getDomainUsers(options: any, resArgs:ResponseArgs){
    const domainId = options.domainId;
    const data  = await md_domain_users.findAll({where: {md_domain_id:domainId}}); 
    resArgs.resData = data;
    return true;
}; 

async function saveDomainUsers(options: any, resArgs:ResponseArgs){
    const domainId = options.domainId;
    const domainUsers = options.domainUsers;
    const domain = new MdDomain(domainId);
    domain.saveUsers(domainUsers);
    return true;
}; 


