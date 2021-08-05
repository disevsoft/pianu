import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'
import SaveMdObjectArgs from '../helpers/saveMdObjectArgs'
import {getPasswordHash} from '../services/user.service'
export default class mdUser extends BaseMeta{
    domainAdmin = false;
    configAdmin = false;
    password = '';
    constructor(id:string){
        
        super(id);
        this.typeId= '60a34539-5b85-4d96-b619-cefc7b6b894b';
        this.modelName= 'md_users';
        this.typeName = 'MdUser'
        this.domainAdmin = false;
        this.configAdmin = false;
        this.password = '';
       
    }

    public get mdFields(){
        let mdFields = super.mdFields;
        mdFields.push(new MdTypeField('listName', "String", "", "", false, "list_name"));
        mdFields.push(new MdTypeField('typeId', "String", this.typeId, "", true,''));
        mdFields.push(new MdTypeField('domainAdmin', "Boolean", false, false, false, "domain_admin"));
        mdFields.push(new MdTypeField('configAdmin', "Boolean", false, false, false, "config_admin"));
        mdFields.push(new MdTypeField('password', "String", "", "false", false, "password"));
        
        return mdFields;
    }
    async beforeSave(saveMdObjectArgs:SaveMdObjectArgs){
        await super.beforeSave(saveMdObjectArgs);
        if(!this.id){
            this.password = await getPasswordHash(this.password)
        }
    }
}