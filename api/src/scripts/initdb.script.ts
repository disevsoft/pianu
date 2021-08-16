import {initModel} from '../helpers/mdObjectHelper'
import {createProjectDataBase} from '../database/dataBaseUtils'


async function initWorkspace() {
    await createProjectDataBase();
    console.log('config database created');
    await new Promise(resolve => setTimeout(resolve, 3000));
    await initModel(false);
}

initWorkspace()
