export default class MdTypeField
{
    name='';
    type='';
    value:any=undefined;
    defaultValue:any = undefined;
    readonly = false;
    fieldMap = '';
    constructor(name:string, type: string, value: any, defaultValue: any, readOnly: boolean, fieldMap:string){
        this.name = name;
        this.type = type;
        this.value = value; 
        this.defaultValue = defaultValue;
        this.readonly=readOnly;
        this.fieldMap=fieldMap;
    }
}