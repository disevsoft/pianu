import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'

export default class MdReport extends BaseMeta{
    constructor(id:string){
        
        super(id);

        this.typeId= 'b2aa362b-5872-411a-9cd8-fc65428e54eb';
        this.modelName= 'md_reports';
        this.typeName = 'Report'
    }

    public get mdFields(){
        let mdFields = super.mdFields;
        mdFields.push(new MdTypeField('listName', "String", "", "", false, "list_name"));
        mdFields.push(new MdTypeField('typeId', "String", this.typeId, "", true,''));
        
        return mdFields;
    }
}