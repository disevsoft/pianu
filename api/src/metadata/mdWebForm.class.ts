import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'
import {MdTypes} from './mdTypes'
export default class MdWebForm extends BaseMeta{
    isListForm = false;
    isElementForm = false;
    isChooseForm = false;
    constructor(id:string){
        super(id);
        this.typeId= '370c9fb7-c2c8-4360-9863-6dc456460080';
        this.modelName= 'md_webforms';
        this.typeName = 'Form'
    }

    public get mdFields(){
        let mdFields = super.mdFields;
        mdFields.push(new MdTypeField('listName', MdTypes.String, 150, "", "", false, "list_name"));
        return mdFields;
    }
}