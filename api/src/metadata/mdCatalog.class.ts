import BaseMeta from './basemeta.class'
import {md_catalogs} from '../database/config/models/md_catalogs'
import MdTypeField from './mdTypeField.class'

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

    private static _catalogs: Map<String, MdCatalog> =new Map();
    static async getAllCatalogs() 
    {
        if(MdCatalog._catalogs.size===0){
            await MdCatalog.fetchCatalogs();
        }
        return MdCatalog._catalogs;
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
        let catalog:MdCatalog| null=null; 
        MdCatalog._catalogs.forEach(async (val, key) => {
            if(val.id === id){
                return val;
            }
        });
        if(!catalog){
            return await MdCatalog.loadCatalog(id);       
        }

    } 
    
    private static async loadCatalogFromModelData(modelData:any)
    {
        let catalog = new MdCatalog(modelData['id']);
        for (let mdField of catalog.mdFields) {
            if(mdField.fieldMap){
                mdField.value = modelData[mdField.fieldMap];
                (<any>catalog)[mdField.name] =  mdField.value;  
            }
          }
          MdCatalog._catalogs.set(catalog.name, catalog);  
          return catalog;
    } 

    private static async loadCatalog(id:string) 
    {
        if(!id){
            console.log('empty');           
        }
        const mdCatalogModel:any = await md_catalogs.findOne({ where: { id: id } });
        if(!mdCatalogModel){return;}
        return await MdCatalog.loadCatalogFromModelData(mdCatalogModel);
    }   

    public Save(){
        
    }
}