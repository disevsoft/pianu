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
        
    }, {
        freezeTableName: true
});   

    
