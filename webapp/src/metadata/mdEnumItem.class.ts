import {MdTypes} from './MdTypes'
import BaseMeta from './basemeta.class'
export default class MdDocument extends BaseMeta{
    constructor(id:string){
        
        super(id);

        this.typeId= MdTypes.EnumerationItem;  
        this.typeName = 'EnumerationItem';
    }
}