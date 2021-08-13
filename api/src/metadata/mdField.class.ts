import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'
import {MdTypes} from './mdTypes'
export default class MdField extends BaseMeta{
    type:string = '';
    length:number = 0;
    fraction:number = 0;
    mask:string='';
    isDBField = false;
    unique = false;
    databaseName= '';
    constructor(id:string){ 
        super(id);

        this.typeId= '8c474f75-b63a-4f3a-b624-f9a58cb7eeae';
        this.modelName= 'md_fields';
        this.typeName = 'Field'
    }

    public get mdFields(){
        let mdFields = super.mdFields;
        mdFields.push(new MdTypeField('type', MdTypes.None, 0, "", "", false, "type"));
        mdFields.push(new MdTypeField('length', MdTypes.Number, 10, 0, 0, false, "length"));
        mdFields.push(new MdTypeField('fraction', MdTypes.Number, 10, 0, 0, false, "fraction"));
        mdFields.push(new MdTypeField('mask', MdTypes.String, 150, "", "", false, "mask"));
        mdFields.push(new MdTypeField('isDBField', MdTypes.Boolean, 0,false, false, false, "is_db_field"));
        mdFields.push(new MdTypeField('databaseName', MdTypes.String, 150, this.databaseName, "", false, "database_name")); 
        mdFields.push(new MdTypeField('unique', MdTypes.Boolean, 0,false, false, false, "unique"));      
        return mdFields;
    }
}