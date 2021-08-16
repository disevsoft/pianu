import  db  from '../sequilize.metadata'
import  {Model} from "sequelize";
import * as Sequelize from 'sequelize'
const sequelize = db.sequelize;

interface mdDomainUsersInstance extends Model { 
    md_user_id: string;
    md_domain_id: string;
  }

  export const md_domain_users = sequelize.define<mdDomainUsersInstance>('md_domain_users', {
        md_user_id:{
            type: Sequelize.UUID,
            primaryKey: false,
            allowNull: false,
            unique: false
        },
        md_domain_id:{
            type: Sequelize.UUID,
            primaryKey: false,
            allowNull: false,
            unique: false
        },
        domain_admin:{
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue:false            
        },
       
    }, db.sequilizeOptions); 
      
