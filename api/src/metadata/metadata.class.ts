import MdCatalog from './mdCatalog.class';
import DaseMeta from './basemeta.class'
import { any, ne } from 'sequelize/types/lib/operators';

import MdType from './mdType.class';
import BaseMeta from './basemeta.class';

export class Metadata{

    public static get Catalogs()
    {   
        return MdCatalog.getAllCatalogs();
    }

    public static async getMdObject(mdTypeId:string, mdObjectId:string){

         
        const objectType = await MdType.getMdType(mdTypeId);
        if(objectType?.className)
        {
            if(objectType?.className === 'MdCatalog'){
                return await MdCatalog.getInstance(mdObjectId);
            }
        }
        return null;
    } 

    public static async saveMdObject(fieldsArray: Array<any>){

        const typeId = await Metadata.getTypeIdFromFields(fieldsArray);
        if(!typeId){throw 'error'}; 
        const id = await Metadata.getIdFromFields(fieldsArray);
        const mdObject:any = await Metadata.getMdObject(typeId, id);
        for (let mdField of mdObject?.mdFields) {
            if(mdField.fieldMap){
                const field = fieldsArray.find(elem=>(elem.name===mdField.name));
                mdField.value = field?.value;
                mdObject[mdField.name] =  mdField.value;  
            }
          }
          return mdObject; 
    } 

    private static async getTypeIdFromFields(fieldsArray: Array<any>)
    {
        const typeId = fieldsArray.find(elem=>(elem.name ==='typeId'));                                    
        return typeId.value;  
    }

    private static async getIdFromFields(fieldsArray: Array<any>)
    {
        const id = fieldsArray.find(elem=>(elem.name ==='id'));                                    
        return id.value; 
    }
}