import {MdTypes} from './MdTypes'
//import cache from '../global/globalCache.js' 
export default class BaseMeta{
    id = '';
    typeId:MdTypes = MdTypes.None;
    typeName = '';
    name = '';
    synonym = '';
    parentId = '';
    constructor(id:string){
        this.id = id;
    }
    public static mdObjects: Array<BaseMeta> =[]; 
    // public static get mdObjects(){
    //     return 
    // }
}