import BaseMeta from './basemeta.class'

import MdTypeField from './mdTypeField.class'
export default class MdCatalog extends BaseMeta{
    constructor(id:string){
        
        super(id);

        this.typeId= '834cd9ad-9720-4fc5-aa09-cef6f7a895a0';
        this.modelName= 'md_catalogs';
        this.typeName = 'Catalog'
        
        this.mdFields.push(new MdTypeField('listName', "String", "", "", false, "list_name"));
        this.mdFields.push(new MdTypeField('isHierarchical',"Boolean", false, false, false, "is_hierarchical"));
        this.mdFields.push(new MdTypeField('typeId', "String", this.typeId, "", true,''));
    }
}