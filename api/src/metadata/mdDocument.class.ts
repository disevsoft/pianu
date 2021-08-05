import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'
import {MdTypes} from './mdTypes'
export default class MdDocument extends BaseMeta{
    constructor(id:string){
        
        super(id);

        this.typeId= 'cc94220b-20f8-4a63-9f29-d02fe64ba918';
        this.modelName= 'md_documents';
        this.typeName = 'Document'
    }

    public get mdFields(){
        let mdFields = super.mdFields;
        mdFields.push(new MdTypeField('listName', MdTypes.String, 150, "", "", false, "list_name"));
        return mdFields;
    }
}