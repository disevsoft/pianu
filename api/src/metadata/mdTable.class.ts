import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'

export default class MdTable extends BaseMeta{
    constructor(id:string){
        
        super(id);

        this.typeId= '0cf72dda-2547-4333-aec0-c852d2f3f235';
        this.modelName= 'md_tables';
        this.typeName = 'Table'
        
        this.mdFields.push(new MdTypeField('listName', "String", "", "", false, "list_name"));
        this.mdFields.push(new MdTypeField('typeId', "String", this.typeId, "", true,''));
        this.mdFields.push(new MdTypeField('databaseName', "String", "", "", false, "database_name")); 
    }
}