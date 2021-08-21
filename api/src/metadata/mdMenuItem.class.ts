import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'
import {MdTypes} from './mdTypes'
export default class MdDocument extends BaseMeta{
    enumId = '';
    objectId = '';
    constructor(id:string){       
        super(id);

        this.typeId= '6929b322-5a6a-4cc7-b002-d80460776ec2';
        this.modelName= 'md_menu_items';
        this.typeName = 'MenuItem';
    }

    public get mdFields(){
        let mdFields = super.mdFields;
        mdFields.push(new MdTypeField('objectId', MdTypes.None, 0, this.objectId, "", false, "type"));
        return mdFields;
    }
}