import { Router } from 'express';
import UserRoute from './user';
import AuthRoute from './auth';

class Routes {
    public routes: Router;

    constructor() {
        this.routes = Router();
        this.rotas();
    }

    rotas() {
        this.routes.use('/auth', AuthRoute);
        this.routes.use('/users', UserRoute);

        this.routes.get('/', (req, res) => res.send('Decentralized-File-Upload-and-Sharing'));
    }
}

export default new Routes().routes;