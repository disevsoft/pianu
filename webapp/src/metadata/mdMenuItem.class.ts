import BaseMeta from './basemeta.class'
import { MdTypes } from './MdTypes';

export default class mdMenuItem extends BaseMeta{
    objectId = '';
    isFolder = false;
    orderIndex = 0;
    description = '';
    children:mdMenuItem[] = [];
    constructor(id:string){       
        super(id);
        this.typeName = 'MenuItem';
        this.typeId= MdTypes.MenuItem;
    }

}