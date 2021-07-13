import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'

export default class MdDocument extends BaseMeta{
    constructor(id:string){
        
        super(id);

        this.typeId= '834cd9ad-9720-4fc5-aa09-cef6f7a895a0';
        this.modelName= 'md_documents';
        this.typeName = 'Document'
        
        this.mdFields.push(new MdTypeField('listName', "char(150)", "", "", false, "list_name"));
        this.mdFields.push(new MdTypeField('typeId', "char(150)", this.typeId, "", true,''));
    }
}