import express from "express";
import {Metadata} from '../src/metadata/metadata.class'
import routes from './routes';
const app = express();

const port = 3080; // default port to listen

// define a route handler for the default home page
// app.get( "/api/m", async ( req, res ) => {
//     const t = await Metadata.Catalogs;
//     res.send(JSON.stringify([...t]));  
// } );
app.use(express.json());
app.use(routes);

// app.post( "/api/md", async ( req, res ) => {
//     let body = req.body;
//     const t = await Metadata.Catalogs;
//     res.send(JSON.stringify([...t]));  
//  } );
// start the Express server
app.listen( port, () => { 
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );