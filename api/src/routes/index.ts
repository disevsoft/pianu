import { Router } from 'express';
import metadataRouter from './metadata.router';

const routes = Router();

routes.use('/api/md', metadataRouter);

export default routes;