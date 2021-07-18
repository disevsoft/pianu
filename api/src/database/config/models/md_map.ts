import  db  from '../sequilize.metadata'
import  {Model} from "sequelize";
import * as Sequelize from 'sequelize'
const sequelize = db.sequelize;

interface mdMapInstance extends Model { 
    md_owner_id: string;
    md_object_id: string;
  }

  export const md_map = sequelize.define<mdMapInstance>('md_map', {
        md_owner_id:{
            type: Sequelize.UUID,
            primaryKey: false,
            allowNull: false,
            unique: false
        },
        md_object_id:{
            type: Sequelize.UUID,
            primaryKey: false,
            allowNull: false,
            unique: false
        },
        
       
    }, {
        freezeTableName: true
}); 
      
