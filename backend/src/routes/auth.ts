import { Router } from 'express';
import AuthController from '../controllers/auth';

class AuthRote {
    public routes: Router;

    constructor() {
        this.routes = Router();
        this.rotas();
    }

    rotas() {
        this.routes.post('/', AuthController.store);
    }    
}

export default new AuthRote().routes;