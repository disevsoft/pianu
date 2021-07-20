import { Router } from 'express';
import metadataRouter from './metadata.router';
import loginRouter from './login.router';

const routes = Router();

routes.use('/api/md', metadataRouter);
routes.use('/api/login', loginRouter);

export default routes; 