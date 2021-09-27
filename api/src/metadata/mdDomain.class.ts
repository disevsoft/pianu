import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'
import {MdTypes} from './mdTypes'
import {initDomain} from '../database/dataBaseUtils'
import db from '../database/config/sequilize.metadata'
import { md_domain_users } from '../database/config/models/md_domain_users';
export default class MdDomain extends BaseMeta{
    databaseName = '';
    constructor(id:string){
        
        super(id);

        this.typeId= '1ba5d068-38a7-44e5-82b8-d51e680a6cb1';
        this.modelName= 'md_domains';
        this.typeName = 'Domain'
    }

    public get mdFields(){
        let mdFields = super.mdFields;
        mdFields.push(new MdTypeField('databaseName', MdTypes.String, 150, this.databaseName, "", false,'database_name'));
        
        return mdFields;
    }

    public async init() {
        if(!this.databaseName){
            throw Error('Domain database name is empty');
        }
        await initDomain(this);  
    }

    public async saveUsers(domainUsers:any){
        await db.sequelize.transaction(async(t)=>{
            await md_domain_users.destroy({where:{md_domain_id:this.id}});    
            for await (const domainUser of domainUsers) {
                await  md_domain_users.create({md_domain_id:this.id, md_user_id:domainUser.md_user_id, domain_admin:domainUser.domain_admin})             
            }      
        });
    }
}