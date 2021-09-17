import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'
import {MdTypes} from './mdTypes'
export default class MdMenuItem extends BaseMeta{
    objectId = '';
    orderIndex = 0;
    description = '';
    isFolder = false;
    constructor(id:string){       
        super(id);

        this.typeId= '6929b322-5a6a-4cc7-b002-d80460776ec2';
        this.modelName= 'md_menu_items';
        this.typeName = 'MenuItem';
    }

    public get mdFields(){
        let mdFields = super.mdFields;
        mdFields.push(new MdTypeField('objectId', MdTypes.None, 0, this.objectId, "", false, "object_id"));
        mdFields.push(new MdTypeField('orderIndex', MdTypes.Number, 3, this.orderIndex, 0, false, "order_index"));
        mdFields.push(new MdTypeField('description', MdTypes.String, 1000, this.description, "", false, "description"));
        mdFields.push(new MdTypeField('isFolder', MdTypes.Boolean, 0, this.isFolder, false, false, "is_folder"));
        return mdFields; 
    }
}