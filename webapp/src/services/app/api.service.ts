class apiCommandArgs{

    commandName:string='';
    options:any={};
    constructor(commandName:string, options:any){
        this.commandName = commandName;
        this.options = options;
    }
}



class ApiMain{

    public static async execApiCommand(commandArgs:apiCommandArgs) {
        
    }

}
