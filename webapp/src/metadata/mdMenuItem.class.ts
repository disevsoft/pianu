import BaseMeta from './basemeta.class'
import { MdTypes } from './MdTypes';

export default class mdMenuItem extends BaseMeta{
    enumId = '';
    objectId = '';
    constructor(id:string){       
        super(id);
        this.typeName = 'MenuItem';
        this.typeId= MdTypes.MenuItem;
    }

}