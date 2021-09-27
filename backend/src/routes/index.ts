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
        this.routes.get('/', (req, res) => res.send('Decentralized-File-Upload-and-Sharing'));

        this.routes.use('/auth', AuthRoute);
        this.routes.use('/user', UserRoute);
    }
}

export default new Routes().routes;