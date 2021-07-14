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
        
    }, {
        freezeTableName: true
});   
    
    
