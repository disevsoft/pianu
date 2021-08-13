import {initModel} from '../helpers/mdObjectHelper'
import {createConfigDataBase} from '../database/dataBaseUtils'


async function initWorkspace() {
    await createConfigDataBase();
    console.log('config database created');
    await new Promise(resolve => setTimeout(resolve, 3000));
    await initModel(false);
}

initWorkspace()
