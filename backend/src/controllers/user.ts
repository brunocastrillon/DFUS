import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user';

class UserController {
    public async find(req: Request, res: Response, next: NextFunction) {
        return UserService.list().then((users) => res.json({ users: users })).catch(next);
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        return await UserService.getByAddress(req.params.publicAddress).then((user) => res.json({ user: user })).catch(next);
    }

    public async store(req: Request, res: Response, next: NextFunction) {
        return await UserService.create(req.body).then((user) => res.json({ user: user })).catch(next);
    }
}

export default new UserController();