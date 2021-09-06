import {md_types} from '../database/config/models/md_types';

export default class MdType{
    id: string;
    name:string = '';
    listName:string = '';
    synonym:string = '';
    listSynonym:string = '';
    tableName:string = '';
    className:string = '';
    isMdType:boolean = false;
    hasLength = false;
    hasFraction = false;
    databasType:string = '';
    order:number = 0;
    fieldType:boolean = false;
    private static _mdTypes:Map<String, MdType> = new Map();

    private constructor(id:string){
        this.id = id;
    }
    private static fieldMap = new Map([
        ['id','id'],
        ['name', 'name'],
        ['listName', 'list_name'],
        ['synonym', 'synonym'],
        ['listSynonym', 'list_synonym'],
        ['tableName', 'table_name'],
        ['className', 'class_name'],
        ['isMdType', 'is_md_type'],
        ['dataBaseType', 'database_type'],
        ['hasLength','has_length'],
        ['hasFraction','has_fraction'],
        ['order','order'],
        ['fieldType','field_type']
    ]);
    public static async getMdType(mdTypeId:string){

        if(!MdType._mdTypes.get(mdTypeId)){
            await MdType.loadType(mdTypeId);
        }
        return MdType._mdTypes.get(mdTypeId);
    } 

    private static async loadType(mdTypeId:string) 
    {
        if(!md_types){
            console.log('empty'); 
            
        }
        let mdTypeModel:any = undefined;
        try{
            mdTypeModel = await md_types.findOne({ where: { id: mdTypeId } });
        }catch(e){
            console.log(e);
        }
        if(!mdTypeModel){return;}

        let mdType = new MdType(mdTypeId);
        MdType.fieldMap.forEach((value, key, map) =>{
            (<any>mdType)[key] = (<any>mdTypeModel)[value];        
        });
        MdType._mdTypes.set(mdTypeId, mdType);
    }   

    private static async fetchTypes(){
        const mdTypeModel = await md_types.findAll();
        if(!mdTypeModel){return;}
        for (let element of mdTypeModel){
            await MdType.getMdType(element.id)    
        } 
    }

    public static async getAllTypes() 
    {
        await MdType.fetchTypes();
        return Array.from(MdType._mdTypes.values());
    }   
}