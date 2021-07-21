import MdCatalog from './mdCatalog.class';
import DaseMeta from './basemeta.class'
import { any, ne } from 'sequelize/types/lib/operators';
import ResponseArgs from '../helpers/responseArgs'
import * as mdHelper from '../helpers/mdObjectHelper'
import MdType from './mdType.class';
import BaseMeta from './basemeta.class';

export class Metadata{

    public static async getMdObject(mdTypeId:string, mdObjectId:string, mdParentId:string, resArgs:ResponseArgs){

         
        const objectType = await MdType.getMdType(mdTypeId);
        if(objectType?.className)
        {
                const data = await mdHelper.getInstance(objectType?.className, mdObjectId);
                if(data){await data.setParentId(mdParentId)};
                return data; 
        }
        resArgs.messageId = 1;
        resArgs.cancel = true;
    } 

    public static async deleteMdObject(mdTypeId:string, mdObjectId:string,  resArgs:ResponseArgs)
    {
        const mdObject = await Metadata.getMdObject(mdTypeId, mdObjectId, '', resArgs);
        if(mdObject){
            try{
                mdObject.delete();
                resArgs.messageId = 5;
            }
            catch(e){
                resArgs.messageId = 4;
                resArgs.cancel=true;
                resArgs.errorDescription = String(e);
                resArgs.status = 500;
            }
        }
       
    }

    public static async getMdObjectFields(mdTypeId:string, mdObjectId:string, mdParentId:string, resArgs:ResponseArgs)
    {
        const mdObject = await Metadata.getMdObject(mdTypeId, mdObjectId, mdParentId, resArgs);
        resArgs.resData = mdObject?.mdFields;
    }

    public static async fillMdObject(fieldsArray: Array<any>, resArgs:ResponseArgs){

        const typeId = await Metadata.getTypeIdFromFields(fieldsArray);
        if(!typeId){throw 'error'}; 
        const id = await Metadata.getIdFromFields(fieldsArray);
        const parentId = await Metadata.getParentIdFromFields(fieldsArray);
        const mdObject:any = await Metadata.getMdObject(typeId, id, parentId, resArgs);
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

    private static async getParentIdFromFields(fieldsArray: Array<any>)
    {
        const id = fieldsArray.find(elem=>(elem.name ==='parentId'));                                    
        return id.value; 
    }
}