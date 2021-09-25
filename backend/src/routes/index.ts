import { Router } from 'express';

class Routes {
    public routes: Router;

    constructor() {
        this.routes = Router();
        this.rotas();
    }

    rotas() {
        this.routes.get('/', (req, res) => res.send('Decentralized-File-Upload-and-Sharing'));
    }
}

export default new Routes().routes;