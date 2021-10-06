import {
    NextFunction,
    Request,
    Response
} from 'express';
import AuthService from '../services/auth';

class AuthController {
    public async store(req: Request, res: Response, next: NextFunction) {
        const { signature, publicAddress } = req.body;

        if (!signature || !publicAddress)
            return res
                .status(400)
                .send({ error: 'Request should have signature and publicAddress' });

        AuthService.create(signature, publicAddress).then((accessToken) => res.json({ accessToken: accessToken })).catch(next);
    }
}

export default new AuthController();