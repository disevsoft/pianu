import {ApiCommandArgs, ApiMain} from '../services/app/api.service'
import { MdTypes } from './MdTypes';

export class MdType{
    
    id ='';
    name = '';
    listName = '';
    synonym = '';
    listSynonym = '';
    tableName = '';
    className = '';
    isMdType = false;
    hasLength = false;
    hasFraction = false;
    databasType = '';
    order = 0;
    fieldType = false;

    private static _mdTypes:Array<MdType> =[];

    private constructor(id:string){
        this.id = id;
    }
    

    private static async loadTypes() 
    {
        if(MdType._mdTypes.length===0){
            const apiCommandArgs = new ApiCommandArgs("getMdTypesList", {})
            const data = await ApiMain.execApiCommand(apiCommandArgs);
            for (const element of data) {
                const mdType = new MdType(element.id);
                for (const key in mdType) {
                    (mdType as any)[key] = element[key];
                }  
                MdType._mdTypes.push(mdType)  
            }
            MdType._mdTypes.sort((n1,n2) => n1.order - n2.order );
        }
    }   

    public static async getTypes() 
    {
        await MdType.loadTypes();
        return MdType._mdTypes;    
    }  
}