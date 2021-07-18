import  db  from '../sequilize.metadata'
import  {Model} from "sequelize";
import * as Sequelize from 'sequelize'
const sequelize = db.sequelize;

interface mdCatalogInstance extends Model { 
    id: string;
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
    
