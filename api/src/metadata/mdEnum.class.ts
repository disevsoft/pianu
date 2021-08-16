import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'
import {MdTypes} from './mdTypes'
export default class MdDocument extends BaseMeta{
    constructor(id:string){
        
        super(id);

        this.typeId= '414d13cc-913b-424d-81b5-e57f46e9d4f1';
        this.modelName= 'md_enums';
        this.typeName = 'Enumeration';
    }

    public get mdFields(){
        let mdFields = super.mdFields;
        return mdFields;
    }
}