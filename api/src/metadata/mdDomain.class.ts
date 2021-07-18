import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'

export default class MdDomain extends BaseMeta{
    constructor(id:string){
        
        super(id);

        this.typeId= '1ba5d068-38a7-44e5-82b8-d51e680a6cb1';
        this.modelName= 'md_domains';
        this.typeName = 'Domain'
        
        this.mdFields.push(new MdTypeField('listName', "char(150)", "", "", false, "list_name"));
        this.mdFields.push(new MdTypeField('typeId', "char(150)", this.typeId, "", true,''));
    }
}