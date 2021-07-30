import BaseMeta from './basemeta.class'
import { MdTypes } from './MdTypes';

export default class MdField extends BaseMeta{
    type = '';
    length = 0;
    fraction = 0;
    mask='';

    constructor(id:string){ 
        super(id);

        this.typeId= MdTypes.Field;
        this.typeName = 'Field'
    }
}