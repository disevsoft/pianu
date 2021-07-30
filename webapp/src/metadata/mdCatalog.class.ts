import BaseMeta from './basemeta.class'
import { MdTypes } from './MdTypes';
export default class MdCatalog extends BaseMeta{
    isHierarchical = false;
    hierarchicalLevels = 0;
    constructor(id:string){
        super(id);
        this.typeId= MdTypes.Catalog;
        this.typeName = 'Catalog'        
    }
}