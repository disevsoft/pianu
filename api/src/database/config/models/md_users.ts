import  db  from '../sequilize.metadata'
import  {Model} from "sequelize";
import * as Sequelize from 'sequelize'
const sequelize = db.sequelize;

interface mdUsersInstance extends Model { 
    id: string;
    name: string;
    password:string
  }
  export const md_users = sequelize.define<mdUsersInstance>('md_users', {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
        },
        name:{
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue:''            
        },
        password:{
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue:''  
        },
        config_admin:{
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue:false            
        },
    }, db.sequilizeOptions);   