import BaseMeta from './basemeta.class'
import {md_catalogs} from '../database/config/models/md_catalogs'
import MdTypeField from './mdTypeField.class'
import * as mdHelper from '../helpers/mdObjectHelper'
export default class MdCatalog extends BaseMeta{
    constructor(id:string){
        
        super(id);

        this.typeId= '834cd9ad-9720-4fc5-aa09-cef6f7a895a0';
        this.modelName= 'md_catalogs';
        this.typeName = 'Catalog'
        
        this.mdFields.push(new MdTypeField('listName', "char(150)", "", "", false, "list_name"));
        this.mdFields.push(new MdTypeField('isHierarchical',"Boolean", false, false, false, "is_hierarchical"));
        this.mdFields.push(new MdTypeField('typeId', "char(150)", this.typeId, "", true,''));
    }

    static async getAllCatalogs() 
    {
        //if(MdCatalog._catalogs.size===0){
            await MdCatalog.fetchCatalogs();
        //}
        return MdCatalog.mdObjects;
    }

    private static async fetchCatalogs()
    { 
        const catalogsModels = await md_catalogs.findAll();
        catalogsModels.forEach(async (element:any) => {
            await MdCatalog.getInstance(element.id);
        });
    };
    public static async getInstance(id:string)
    { 
        if(!id){//its new
            return new MdCatalog(id); 
        };
        let catalog:BaseMeta| undefined=MdCatalog.mdObjects.find(element=>element.id === id); 
        if(!catalog){
            catalog =  await MdCatalog.loadCatalog(id);       
        } 
        return catalog;
    } 
    
    private static async loadCatalogFromModelData(modelData:any)
    {
        let catalog = new MdCatalog(modelData['id']);
        mdHelper.loadFromModelData(catalog, modelData);
        return catalog; 
    } 

    private static async loadCatalog(id:string) 
    {
        const mdCatalogModel = await mdHelper.getModelData("md_catalogs", id);
        if(!mdCatalogModel){return;}
        return await MdCatalog.loadCatalogFromModelData(mdCatalogModel);
    }   

}