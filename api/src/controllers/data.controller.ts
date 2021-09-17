import {processCommand} from '../services/data.service'

export function processRequest(req:any, res:any){
  processCommand(req, res); 
}
