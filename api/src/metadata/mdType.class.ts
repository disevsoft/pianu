import {md_types} from '../database/config/models/md_types';

export default class MdType{
    id: string;
    name:string = '';
    listName:string = '';
    synonym:string = '';
    listSynonym:string = '';
    tableName:string = '';
    className:string = '';
    isDataBaseType:boolean = false;
    databasType:string = '';
    private static _mdTypes:Map<String, MdType> = new Map();

    private constructor(id:string){
        this.id = id;
    }
    private static fieldMap = new Map([
        ['id','id'],
        ['name', 'name'],
        ['list_name', 'listName'],
        ['synonym', 'synonym'],
        ['list_synonym', 'listSynonym'],
        ['table_name', 'tableName'],
        ['class_name', 'className'],
        ['is_database_type', 'isDataBaseType'],
        ['database_type','dataBaseType']
    ]);
    public static getMdType(mdTypeId:string){
        if(!MdType._mdTypes.get(mdTypeId)){
            MdType.loadType(mdTypeId);
        }
        return MdType._mdTypes.get(mdTypeId);
    } 

    private static async loadType(mdTypeId:string) 
    {
        if(!md_types){
            console.log('empty');
            
        }
        const mdTypeModel = await md_types.findOne({ where: { id: mdTypeId } });
        if(!mdTypeModel){return;}

        let mdType = new MdType(mdTypeId);
        MdType.fieldMap.forEach((value, key, map) =>{
            (<any>mdType)[value] = (<any>mdTypeModel)[key];        
        });
        MdType._mdTypes.set(mdTypeId, mdType);
    }   
}