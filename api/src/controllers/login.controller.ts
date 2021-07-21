import {processCommand} from '../services/user.service'

export function processRequest(req:any, res:any){
  processCommand(req, res);
}
