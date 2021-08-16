import  db  from '../sequilize.metadata'
import  {Model} from "sequelize";
import * as Sequelize from 'sequelize'
const sequelize = db.sequelize;

interface mdFieldInstance extends Model { 
    id: number;
    name: string;
  }
  export const md_fields = sequelize.define<mdFieldInstance>('md_fields', {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        synonym:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        type:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        length:{
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue:0
        },
        fraction:{
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue:0
        },
        mask:{ 
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue:'' 
        },  
        is_db_field:{ 
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue:false 
        },
        database_name:{
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue:''            
        },
        unique:{ 
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue:false 
        }           
    }, db.sequilizeOptions);   

    
