import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'
import {MdTypes} from './mdTypes'
export default class MdTable extends BaseMeta{
    constructor(id:string){
        
        super(id);

        this.typeId= '0cf72dda-2547-4333-aec0-c852d2f3f235';
        this.modelName= 'md_tables';
        this.typeName = 'Table'
    }

    public get mdFields(){
        let mdFields = super.mdFields;
        mdFields.push(new MdTypeField('listName', MdTypes.String, 150, "", "", false, "list_name"));
        mdFields.push(new MdTypeField('databaseName', MdTypes.String, 150, "", "", false, "database_name")); 
        
        return mdFields;
    }
}