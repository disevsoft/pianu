import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'
import SaveMdObjectArgs from '../helpers/saveMdObjectArgs'
import {getPasswordHash} from '../services/user.service'
import {MdTypes} from './mdTypes'
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
        mdFields.push(new MdTypeField('domainAdmin', MdTypes.Boolean, 0, this.domainAdmin, false, false, "domain_admin"));
        mdFields.push(new MdTypeField('configAdmin', MdTypes.Boolean, 0, this.configAdmin, false, false, "config_admin"));
        const pwdField = new MdTypeField('password',  MdTypes.String, 150, "", "false", false, "password");
        //mdFields.push(pwdField);
        
        return mdFields;
    }
    async beforeSave(saveMdObjectArgs:SaveMdObjectArgs){
        await super.beforeSave(saveMdObjectArgs);
        if(!this.id){
            this.password = await getPasswordHash(this.password)
        }
    }
}