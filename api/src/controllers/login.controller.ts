import {processCommand} from '../services/login.service'

export function processRequest(req:any, res:any){
  processCommand(req, res);
}
