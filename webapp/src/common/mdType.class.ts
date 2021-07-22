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
    order = 0;
    private static _mdTypes:Map<String, MdType> = new Map();

    private constructor(id:string){
        this.id = id;
    }
    public static async getMdType(mdTypeId:string){

        if(!MdType._mdTypes.get(mdTypeId)){
            await MdType.loadType(mdTypeId);
        }
        return MdType._mdTypes.get(mdTypeId);
    } 

    private static async loadType(mdTypeId:string) 
    {
        
        //MdType._mdTypes.set(mdTypeId, mdType);
    }   
}