import {authHeader} from '../../helpers/authHeader';
import EventBus from '../../components/configurator/CfgEventBus';

export class DataApiCommandArgs{

    commandName='';
    options:any={};
    constructor(commandName:string, options:any){
        this.commandName = commandName;
        this.options = options;
    }
}

export class DataApi{

    private static async getHeaders(){
        const headers:Headers = authHeader();
        headers.set('Content-Type', 'application/json');
        return headers;
    } 
  
    private static async post(commandArgs:DataApiCommandArgs) {
        const headers = await DataApi.getHeaders();
        const response = await fetch("/api/data", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(commandArgs),
        });
        let result = undefined;
        try{
        const resData = await response.json();  
        EventBus.emit('dataEvent', resData.info);
        result = resData.data;
        } catch(e){
            EventBus.emit('dataEvent', e);
        }
        return result;
    }
   
    public static async run(commandArgs:DataApiCommandArgs) {
        return await DataApi.post(commandArgs);
    }
}
