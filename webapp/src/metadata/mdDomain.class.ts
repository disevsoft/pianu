import BaseMeta from './basemeta.class'
import { MdTypes } from './MdTypes';

export default class MdDomain extends BaseMeta{
    databaseName = '';
    constructor(id:string){
        
        super(id);

        this.typeId= MdTypes.Domains;
        this.typeName = 'Domain'
    }
}