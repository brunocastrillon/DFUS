import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user';

class UserController {
    public async find(req: Request, res: Response, next: NextFunction) {
        const whereClause = req.query && req.query.publicAddress
            ? {
                where: { publicAddress: req.query.publicAddress },
            }
            : undefined;

        return UserService.list(whereClause).then((users) => res.json(users)).catch(next);
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        if ((req as any).user.payload.id !== +req.params.userId) {
            return res
                .status(401)
                .send({ error: 'You can can only access yourself' });
        }

        return UserService.get(req.params.userId).then((user) => res.json(user)).catch(next);
    }

    public async store(req: Request, res: Response, next: NextFunction) {
        UserService.create(req.body).then((user) => res.json(user)).catch(next);
    }
}

export default new UserController();