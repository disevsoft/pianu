import  db  from '../sequilize.metadata'
import  {Model} from "sequelize";
import * as Sequelize from 'sequelize'
const sequelize = db.sequelize;

interface mdWebFormInstance extends Model { 
    id: string;
    name: string;
  }

  export const md_webforms = sequelize.define<mdWebFormInstance>('md_webforms', {
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

    
