import { Router } from 'express';
const dataRouter = Router();
import {processRequest} from '../controllers/data.controller'
import { authDomains } from '../services/authDomains';
import { verifyToken } from '../services/authJwt';


dataRouter.use(verifyToken);
dataRouter.use(authDomains);
dataRouter.get( "/", async ( req, res ) => {
   res.status(500).send('unprocessed request');
} );

// metadataRouter.post( "/", async ( req, res ) => {
//    processRequest(req, res)
// });

dataRouter.post("/",verifyToken, authDomains, function(req, res) { processRequest(req, res) });



export default dataRouter; 