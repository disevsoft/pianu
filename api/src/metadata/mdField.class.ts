import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'

export default class MdField extends BaseMeta{
    type:string = '';
    length:number = 0;
    fraction:number = 0;
    mask:string='';

    constructor(id:string){ 
        super(id);

        this.typeId= '8c474f75-b63a-4f3a-b624-f9a58cb7eeae';
        this.modelName= 'md_fields';
        this.typeName = 'Field'
    }

    public get mdFields(){
        let mdFields = super.mdFields;
        mdFields.push(new MdTypeField('typeId', "String", this.typeId, "", true,''));
        mdFields.push(new MdTypeField('listName', "String", "", "", false, "list_name"));
        mdFields.push(new MdTypeField('type', "String", "", "", false, "type"));
        mdFields.push(new MdTypeField('length', "Number", 0, 0, false, "length"));
        mdFields.push(new MdTypeField('fraction', "Number", 0, 0, false, "fraction"));
        mdFields.push(new MdTypeField('mask', "String", "", "", false, "mask"));
        
        return mdFields;
    }
}