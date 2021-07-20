import {processCommand} from '../services/metadata.service'

export function processRequest(req:any, res:any){
  processCommand(req, res); 
}
