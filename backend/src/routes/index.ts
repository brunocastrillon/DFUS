import { Router } from 'express';
import UserRoute from './user';

class Routes {
    public routes: Router;

    constructor() {
        this.routes = Router();
        this.rotas();
    }

    rotas() {
        this.routes.get('/', (req, res) => res.send('Decentralized-File-Upload-and-Sharing'));

        this.routes.use('/usuario', UserRoute);
    }
}

export default new Routes().routes;