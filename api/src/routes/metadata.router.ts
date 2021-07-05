import { Router } from 'express';
const metadataRouter = Router();
import {Metadata} from '../metadata/metadata.class'
import {getMdObjectsList} from '../controllers/metadata.controller'
// metadataRouter.get('/', ( request, response )=>{
//    return response.json("OK");    
// })

metadataRouter.get( "/", async ( req, res ) => {
   const t = await Metadata.Catalogs;
   res.send('OK');  
} );

metadataRouter.post( "/", async ( req, res ) => {
   let body = req.body;
   const t = await Metadata.Catalogs;
   res.send(JSON.stringify([...t]));  
} );

function requesProcessor(req:any, res:any) {
   getMdObjectsList(req, res);  
}


export default metadataRouter;


