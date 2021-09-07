export class FormFactory{

    private _openForms:Form[] = [];
    public static openFormById(formId:string){
       console.log(formId);
       
    }
}

export class Form{
    path = '';
    owner = '';
    objectId = '';
    constructor(){
        const k=1;
    }
}