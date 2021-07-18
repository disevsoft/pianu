import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'

export default class MdDocument extends BaseMeta{
    constructor(id:string){
        
        super(id);

        this.typeId= 'cc94220b-20f8-4a63-9f29-d02fe64ba918';
        this.modelName= 'md_documents';
        this.typeName = 'Document'
        
        this.mdFields.push(new MdTypeField('listName', "String", "", "", false, "list_name"));
        this.mdFields.push(new MdTypeField('typeId', "String", this.typeId, "", true,''));
    }
}