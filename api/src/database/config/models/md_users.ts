import  db  from '../sequilize.metadata'
import  {Model} from "sequelize";
import * as Sequelize from 'sequelize'
const sequelize = db.sequelize;

interface mdUsersInstance extends Model { 
    id: string;
    name: string;
  }
  export const md_users = sequelize.define<mdUsersInstance>('md_users', {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
        },
         database_name:{
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue:''            
        },
        config_admin:{
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue:false            
        },
        domain_admin:{
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue:false            
        },
        // list_name:{
        //     type: Sequelize.STRING,
        //     allowNull: true,
        // },
        // synonym:{
        //     type: Sequelize.STRING,
        //     allowNull: true,
        // },
        // list_synonym:{
        //     type: Sequelize.STRING,
        //     allowNull: true,
        // },
    }, {
        freezeTableName: true
});   