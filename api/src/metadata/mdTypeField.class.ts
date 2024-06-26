import {MdTypes} from './mdTypes'
export default class MdTypeField
{
    name='';
    type=MdTypes.None;
    value:any=undefined;
    defaultValue:any = undefined;
    readOnly = false;
    fieldMap = '';
    objectField = '';
    size = 0;
    sendValueToClient = true;
    constructor(name:string, type: MdTypes, size:number, value: any, defaultValue: any, readOnly: boolean, fieldMap:string){
        this.name = name;
        this.type = type;
        this.size = size;
        this.value = value; 
        this.defaultValue = defaultValue;
        this.readOnly=readOnly;
        this.fieldMap=fieldMap;
    };
}