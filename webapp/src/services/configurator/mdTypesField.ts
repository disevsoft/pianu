import {MdTypes} from '../../metadata/MdTypes'
import MdType from '../../metadata/mdType.class'
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
    mdType:MdType|undefined=undefined;
    public constructor(name:string, type: MdTypes, size:number, value: any, defaultValue: any, readOnly: boolean, fieldMap:string){
        this.name = name;
        this.type = type;
        this.size = size;
        this.value = value; 
        this.defaultValue = defaultValue;
        this.readOnly=readOnly;
        this.fieldMap=fieldMap;
    };

    public static async getTypeField(name:string, type: MdTypes, size:number, value: any, defaultValue: any, readOnly: boolean, fieldMap:string){
        const typeField = new MdTypeField(name, type, size, value, defaultValue, readOnly, fieldMap);
        typeField.mdType = await MdType.getType(typeField.type);
        return  typeField;
    }
}