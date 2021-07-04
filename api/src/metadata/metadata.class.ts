import Catalog from './catalog.class';
export class Metadata{

    static get Catalogs()
    {   
        return Catalog.getAllCatalogs();
    }

}