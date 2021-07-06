import MdCatalog from './mdCatalog.class';
import { any, ne } from 'sequelize/types/lib/operators';

import MdType from './mdType.class';

export class Metadata{

    private static _types={
        'MdCatalog':MdCatalog   
    };
    public static get Catalogs()
    {   
        return MdCatalog.getAllCatalogs();
    }

    public static getMdObject(mdTypeId:string, mdObjectId:string){

         
        const objectType = MdType.getMdType(mdTypeId);
        if(objectType?.className)
        {
            if(objectType?.className === 'MdCatalog'){
                return new MdCatalog(mdObjectId);
            }
        }
        return undefined; 
    } 
}