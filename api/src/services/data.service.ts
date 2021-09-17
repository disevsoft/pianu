import ResponseArgs from "../helpers/responseArgs";

const processors: { [K: string]: Function } = {
    getListDataForView: getListDataForView,
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
