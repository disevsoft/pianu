import  db  from '../sequilize.metadata'
import  {Model} from "sequelize";
import * as Sequelize from 'sequelize'
const sequelize = db.sequelize;

interface mdSubsystemInstance extends Model { 
    id: string;
    name: string;
  }
  export const md_subsystems = sequelize.define<mdSubsystemInstance>('md_subsystems', {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, db.sequilizeOptions);   