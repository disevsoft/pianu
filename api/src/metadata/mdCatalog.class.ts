import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'
import {MdTypes} from './mdTypes'
export default class MdCatalog extends BaseMeta{
    isHierarchical = false;
    hierarchicalLevels = 0;
    constructor(id:string){
        
        super(id);

        this.typeId= '834cd9ad-9720-4fc5-aa09-cef6f7a895a0';
        this.modelName= 'md_catalogs';
        this.typeName = 'Catalog'
    }

    public get mdFields(){
        let mdFields = super.mdFields;
        mdFields.push(new MdTypeField('listName', MdTypes.String, 150, "", "", false, "list_name"));
        mdFields.push(new MdTypeField('isHierarchical',MdTypes.Boolean, 0, false, false, false, "is_hierarchical"));      
        mdFields.push(new MdTypeField('hierarchicalLevels',MdTypes.Number, 2, 0, 0, false, "hierarchical_levels"));
        return mdFields;
    }
}