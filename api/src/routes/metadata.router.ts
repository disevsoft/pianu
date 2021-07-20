import { Router } from 'express';
const metadataRouter = Router();
import {processRequest} from '../controllers/metadata.controller'
import {verifyToken} from '../services/authJwt'

metadataRouter.use(verifyToken);
metadataRouter.get( "/", async ( req, res ) => {
   res.status(500).send('unprocessed request');
} );

// metadataRouter.post( "/", async ( req, res ) => {
//    processRequest(req, res)
// });

metadataRouter.post( "/",verifyToken, function(req, res) { processRequest(req, res) });


export default metadataRouter;


