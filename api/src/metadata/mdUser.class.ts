import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'
import SaveMdObjectArgs from '../helpers/saveMdObjectArgs'
import bcrypt from 'bcryptjs';

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
        this.mdFields.push(new MdTypeField('listName', "String", "", "", false, "list_name"));
        this.mdFields.push(new MdTypeField('typeId', "String", this.typeId, "", true,''));
        this.mdFields.push(new MdTypeField('domainAdmin', "Boolean", false, false, false, "domain_admin"));
        this.mdFields.push(new MdTypeField('configAdmin', "Boolean", false, false, false, "config_admin"));
        this.mdFields.push(new MdTypeField('password', "String", "", "false", false, "password"));
    }

    async beforeSave(saveMdObjectArgs:SaveMdObjectArgs){
        await super.beforeSave(saveMdObjectArgs);
        if(!this.id){
            this.password = bcrypt.hashSync(this.password, 8)
        }
    }
}