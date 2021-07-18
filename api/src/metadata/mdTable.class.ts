import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'

export default class MdTable extends BaseMeta{
    constructor(id:string){
        
        super(id);

        this.typeId= '0cf72dda-2547-4333-aec0-c852d2f3f235';
        this.modelName= 'md_tables';
        this.typeName = 'Table'
        
        this.mdFields.push(new MdTypeField('listName', "char(150)", "", "", false, "list_name"));
        this.mdFields.push(new MdTypeField('typeId', "char(150)", this.typeId, "", true,''));
    }
}