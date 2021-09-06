import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'
import {MdTypes} from './mdTypes'
export default class MdWebForm extends BaseMeta{
    isListForm = false;
    isItemForm = false;
    isChooseForm = false;
    constructor(id:string){
        super(id);
        this.typeId= '370c9fb7-c2c8-4360-9863-6dc456460080';
        this.modelName= 'md_webforms';
        this.typeName = 'Form'
    }

    public get mdFields(){
        let mdFields = super.mdFields;
        mdFields.push(new MdTypeField('isListForm', MdTypes.Boolean, 0, this.isListForm, false, false, "is_list_form"));
        mdFields.push(new MdTypeField('isItemForm', MdTypes.Boolean, 0, this.isItemForm, false, false, "is_item_form"));
        mdFields.push(new MdTypeField('isChooseForm', MdTypes.Boolean, 0, this.isChooseForm, false, false, "is_choose_form"));
        return mdFields;
    }
}