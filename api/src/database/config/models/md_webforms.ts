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
        synonym:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        is_list_form:{
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        is_item_form:{
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        is_choose_form:{
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        
    }, db.sequilizeOptions);   

    
