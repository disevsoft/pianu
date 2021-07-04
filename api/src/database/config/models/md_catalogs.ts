import { cfgdb } from '../sequilize.metadata'
import  {Model} from "sequelize";
import * as Sequelize from 'sequelize'
const sequelize = cfgdb.sequelize;

interface mdCatalogInstance extends Model { 
    id: number;
    name: string;
  }

  export const md_catalogs = sequelize.define<mdCatalogInstance>('md_catalogs', {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        // list_name:{
        //     type: Sequelize.STRING,
        //     allowNull: true,
        //       defaultValue: ''
        // },
        // synonym:{
        //     type: Sequelize.STRING,
        //       defaultValue: ''
        //     allowNull: true,
        // },
        // list_synonym:{
        //     type: Sequelize.STRING,
        //       defaultValue: ''
        //     allowNull: true,
        // },
        is_hierarchical:{
            type: Sequelize.BOOLEAN ,
            allowNull: true,
            defaultValue: false
        },
        hierarchical_levels:{
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        owners:{
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: ''    
        }
        
    }, {
        freezeTableName: true 
});   
    
