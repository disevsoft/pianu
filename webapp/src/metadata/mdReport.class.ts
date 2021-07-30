import BaseMeta from './basemeta.class'
import { MdTypes } from './MdTypes';

export default class MdReport extends BaseMeta{
    constructor(id:string){
        
        super(id);

        this.typeId= MdTypes.Report;
        this.typeName = 'Report'
    }
}