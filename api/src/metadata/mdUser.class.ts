import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'

export default class mdUser extends BaseMeta{
    domainAdmin = false;
    configAdmin = false;
    constructor(id:string){
        
        super(id);

        this.typeId= '1ba5d068-38a7-44e5-82b8-d51e680a6cb1';
        this.modelName= 'md_users';
        this.typeName = 'MdUser'
        this.domainAdmin = false;
        this.configAdmin = false;
        
        this.mdFields.push(new MdTypeField('listName', "String", "", "", false, "list_name"));
        this.mdFields.push(new MdTypeField('typeId', "String", this.typeId, "", true,''));
        this.mdFields.push(new MdTypeField('domainAdmin', "Boolean", false, false, false, "domain_admin"));
        this.mdFields.push(new MdTypeField('configAdmin', "Boolean", false, false, false, "config_admin"));
    }
}