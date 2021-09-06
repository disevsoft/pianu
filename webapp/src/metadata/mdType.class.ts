import {ApiCommandArgs, ApiMain} from '../services/app/api.service'
import { MdTypes } from './MdTypes';

export default class MdType{
    
    id =MdTypes.None;
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
    cached = false;
    private static _mdTypes:Array<MdType> =[];

    public constructor(id:string){
        this.id = (id as MdTypes);
    }
    
    public static async getType(mdTypeId:MdTypes){
        await MdType.loadTypes();
        const mdType = MdType._mdTypes.find((elem)=> elem.id === mdTypeId);
        return mdType;
    }
    public get typeId(){
        return this.id;       
    }
    private static async loadTypes() 
    {
        if(MdType._mdTypes.length===0){
            const apiCommandArgs = new ApiCommandArgs("getMdTypesList", {})
            const data:any = await ApiMain.execApiCommand(apiCommandArgs);
            if(!data) {return;}
            for (const element of (data as any)) {
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

    public static async resetCache(){
        MdType._mdTypes = [];       
    }
}