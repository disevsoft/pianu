import { Router } from 'express';
import metadataRouter from './metadata.router';
import loginRouter from './login.router';
import dataRouter from './data.router';

const routes = Router();

routes.use('/api/md', metadataRouter);
routes.use('/api/login', loginRouter);
routes.use('/api/data', dataRouter);
export default routes; 