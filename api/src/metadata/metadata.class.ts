import MdCatalog from './mdCatalog.class';
import MdType from './mdType.class';

export class Metadata{

    public static get Catalogs()
    {   
        return MdCatalog.getAllCatalogs();
    }

    public static getMdObject(mdTypeId:string, mdObjectId:string){
        const objectType = MdType.getMdType(mdTypeId);

    } 
}