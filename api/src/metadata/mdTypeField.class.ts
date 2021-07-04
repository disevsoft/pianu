export default class MdTypeField
{
    type='';
    value:any=undefined;
    defaultValue:any = undefined;
    readonly = false;
    fieldMap = '';
    constructor(type: string, value: any, defaultValue: any, readOnly: boolean, fieldMap:string){
        this.type = type;
        this.value = value;
        this.defaultValue = defaultValue;
        this.readonly=readOnly;
        this.fieldMap=fieldMap;
    }
}