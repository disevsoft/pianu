import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'

export default class MdField extends BaseMeta{
    constructor(id:string){
        
        super(id);

        this.typeId= '8c474f75-b63a-4f3a-b624-f9a58cb7eeae';
        this.modelName= 'md_fields';
        this.typeName = 'Field'
        
        this.mdFields.push(new MdTypeField('listName', "char(150)", "", "", false, "list_name"));
        this.mdFields.push(new MdTypeField('typeId', "char(150)", this.typeId, "", true,''));
    }
}