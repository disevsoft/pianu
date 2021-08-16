import  db  from '../sequilize.metadata'
import  {Model} from "sequelize";
import * as Sequelize from 'sequelize'
const sequelize = db.sequelize;

interface mdDomainInstance extends Model { 
    id: string;
    name: string;
  }
  export const md_domains = sequelize.define<mdDomainInstance>('md_domains', {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        database_name:{
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, db.sequilizeOptions);   