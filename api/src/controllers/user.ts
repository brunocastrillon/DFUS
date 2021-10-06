import {
    NextFunction,
    Request,
    Response
} from 'express';
import UserService from '../services/user';

class UserController {
    public async toAuth(req: Request, res: Response, next: NextFunction) {
        const { publicAddress } = req.body;
        let user = await UserService.getByAddress(publicAddress);
        
        if (!user) {
            user = await UserService.create(req.body);
        }

        return res.json({
            publicAddress: user.publicAddress,
            nonce: user.nonce
        });
    }
}

export default new UserController();