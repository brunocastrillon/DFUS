import { Router } from 'express';
import UserController from '../controllers/user';

class UserRote {
    public routes: Router;

    constructor() {
        this.routes = Router();
        this.rotas();
    }

    rotas() {
        this.routes.post('/', UserController.toAuth);
    }
}

export default new UserRote().routes;