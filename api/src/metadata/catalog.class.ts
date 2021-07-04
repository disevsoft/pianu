import BaseMeta from './basemeta.class'
import {md_catalogs} from '../database/config/models/md_catalogs'
import MdTypeField from './mdTypeField.class'

export default class Catalog extends BaseMeta{
    constructor(id:string){
        super(id);

        this.typeId= '834cd9ad-9720-4fc5-aa09-cef6f7a895a0';
        this.modelName= 'md_catalogs';
        this.typeName = 'Catalog'
        this.mdFields.set('listName', new MdTypeField("char(150)", "", "", false, "list_name"));
        this.mdFields.set('isHierarchical', new MdTypeField("Boolean", false, false, false, "is_hierarchical"));
    }

    private static _catalogs: Map<String, Catalog> =new Map();
    static getAllCatalogs() 
    {
        if(Catalog._catalogs.size===0){
            Catalog.fetchCatalogs();
        }
        return Catalog._catalogs;
    }

    private static async fetchCatalogs()
    {
        const catalogsModels = await md_catalogs.findAll();
        catalogsModels.forEach((element:any) => {
            let catalog = new Catalog(element.id);
            for (let mdField of catalog.mdFields.values()) {
                if(mdField.fieldMap){
                    mdField.value = element[mdField.fieldMap]
                }
              }
              catalog.name = catalog.mdFields.get('name')?.value;
              catalog.sinonym = catalog.mdFields.get('sinonym')?.value
              Catalog._catalogs.set(catalog.mdFields.get('name')?.value, catalog);   
        });
    }   
}