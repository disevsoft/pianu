import {authHeader} from '../../helpers/authHeader';
import EventBus from '../../components/configurator/CfgEventBus';

export class MdApiCommandArgs{

    commandName='';
    options:any={};
    constructor(commandName:string, options:any){
        this.commandName = commandName;
        this.options = options;
    }
}

export class MdApi{

    private static async getHeaders(){
        const headers:Headers = authHeader();
        headers.set('Content-Type', 'application/json');
        return headers;
    } 
  
    private static async post(commandArgs:MdApiCommandArgs) {
        const headers = await MdApi.getHeaders();
        const response = await fetch("/api/md", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(commandArgs),
        });
        let result = undefined;
        try{
        const resData = await response.json();  
        EventBus.emit('apiEvent', resData.info);
        result = resData.data;
        } catch(e){
            EventBus.emit('apiEvent', e);
        }
        return result;
      }
   
    public static async execApiCommand(commandArgs:MdApiCommandArgs) {
        return await MdApi.post(commandArgs);
    }
}
