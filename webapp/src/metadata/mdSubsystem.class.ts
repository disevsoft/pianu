import BaseMeta from './basemeta.class'
import { MdTypes } from './MdTypes';

export default class MdSubsystem extends BaseMeta{
    constructor(id:string){
        
        super(id);

        this.typeId= MdTypes.Subsystem;
        this.typeName = 'Subsystem'
    }
}