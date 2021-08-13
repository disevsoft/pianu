import  db  from '../sequilize.metadata'
import  {Model} from "sequelize";
import * as Sequelize from 'sequelize'
const sequelize = db.sequelize;

interface mdTableInstance extends Model { 
    id: string;
    name: string;
  }

  export const md_tables = sequelize.define<mdTableInstance>('md_tables', {
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
        database_name:{
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue:''            
        },
        is_db_table:{ 
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue:false 
        },   
        table_number:{
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue:0            
        },
        
    }, {
        freezeTableName: true
});   
    
    
