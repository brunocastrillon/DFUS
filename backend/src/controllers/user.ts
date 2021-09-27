import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user';

class UserController {
    public async find(req: Request, res: Response, next: NextFunction) {
        return UserService.list().then((users) => res.json(users)).catch(next);
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        const user = await UserService.getByAddress(req.params.publicAddress);
        return res.status(201).json({ user });
    }

    public async store(req: Request, res: Response, next: NextFunction) {
        const user = await UserService.create(req.body);
        return res.status(201).json({ user });
    }
}

export default new UserController();