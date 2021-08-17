import BaseMeta from './basemeta.class'
import SaveMdObjectArgs from '../helpers/saveMdObjectArgs'
import MdTypeField from './mdTypeField.class'
import {MdTypes} from './mdTypes'
export default class MdDocument extends BaseMeta{
    enumId = '';
    constructor(id:string){       
        super(id);

        this.typeId= '13274bca-5ab0-4c88-be70-9589763fc07f';
        this.modelName= 'md_enums_values';
        this.typeName = 'EnumerationItem';
    }

    public get mdFields(){
        let mdFields = super.mdFields;
        mdFields.push(new MdTypeField('enumId', MdTypes.Enumeration, 0, this.enumId, "", true, "enum_id"));
        return mdFields;
    }

    async beforeSave(saveMdObjectArgs:SaveMdObjectArgs){
        await super.beforeSave(saveMdObjectArgs);
        if(!this.parentId){
            saveMdObjectArgs.cancel = true;
            throw Error('dont set enum for emum item')
        }
        this.enumId = this.parentId;
    }
}