import BaseMeta from './basemeta.class'
import { MdTypes } from './MdTypes';

export default class MdDocument extends BaseMeta{
    constructor(id:string){
        
        super(id);
        this.typeId= MdTypes.Document;
        this.typeName = 'Document'
    }
}