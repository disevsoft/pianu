import { Router } from 'express';
const metadataRouter = Router();
import {processRequest} from '../controllers/metadata.controller'


metadataRouter.get( "/", async ( req, res ) => {
   res.status(500).send('unprocessed request');
} );

metadataRouter.post( "/", async ( req, res ) => {
   processRequest(req, res); 
});



export default metadataRouter;


