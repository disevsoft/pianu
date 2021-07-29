import {authHeader} from '../../helpers/authHeader';
import EventBus from '../../components/configurator/CfgEventBus';

export class ApiCommandArgs{

    commandName='';
    options:any={};
    constructor(commandName:string, options:any){
        this.commandName = commandName;
        this.options = options;
    }
}

export class ApiMain{

    private static async getHeaders(){
        const headers:Headers = authHeader();
        headers.set('Content-Type', 'application/json');
        return headers;
    } 
  
    private static async post(commandArgs:ApiCommandArgs) {

        const headers = await ApiMain.getHeaders();
        const response = await fetch("/api/md", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(commandArgs),
        });
        
        const resData = await response.json();  
        EventBus.emit('api', resData.info);
        return resData.data;
      }
   
    public static async execApiCommand(commandArgs:ApiCommandArgs) {
        return await ApiMain.post(commandArgs);
    }
}
