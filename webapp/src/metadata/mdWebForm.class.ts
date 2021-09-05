import BaseMeta from './basemeta.class'
import { MdTypes } from './MdTypes';
export default class MdWebForm extends BaseMeta{
    constructor(id:string){
        super(id);
        this.typeId= MdTypes.WebForm;
        this.typeName = 'Form'
    }

}