import { Router } from 'express';
import jwt from 'express-jwt';
import { config } from '../config';
import UserController from '../controllers/user';

class UserRote {
    public routes: Router;

    constructor() {
        this.routes = Router();
        this.rotas();
    }

    rotas() {
        this.routes.get('/', UserController.find);
        this.routes.get('/:userId', jwt(config), UserController.show);
        this.routes.post('/', UserController.store);
    }
}

export default new UserRote().routes;