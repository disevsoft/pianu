import { Router } from 'express';
const loginRouter = Router();
import {processRequest} from '../controllers/login.controller'


loginRouter.get( "/", async ( req, res ) => {
   res.status(500).send('unprocessed request');
} );

loginRouter.post( "/", async ( req, res ) => {
   processRequest(req, res); 
});



export default loginRouter; 