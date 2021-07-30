import BaseMeta from './basemeta.class'
import { MdTypes } from './MdTypes';

export default class MdTable extends BaseMeta{
    constructor(id:string){
        
        super(id);

        this.typeId= MdTypes.Table;
        this.typeName = 'Table'
    }
}