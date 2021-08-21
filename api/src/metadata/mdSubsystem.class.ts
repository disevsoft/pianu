import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'
import {MdTypes} from './mdTypes'
export default class MdSubsystem extends BaseMeta{
    constructor(id:string){
        
        super(id);

        this.typeId= '273c017b-b7d9-49a2-ac51-e0f2d6f0f75c';
        this.modelName= 'md_subsystems';
        this.typeName = 'Subsystem'
    }

    public get mdFields(){
        let mdFields = super.mdFields;
        return mdFields;
    }
}