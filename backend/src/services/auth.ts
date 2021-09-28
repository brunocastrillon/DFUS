import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';
import UserService from './user';
import { config } from '../config';

class AuthService {

    public async create(signature: any, publicAddress: any) {
        let userModel = new UserModel();

        return await UserService.getByAddress(publicAddress)
            .then((userModel) => {
                if (!(userModel)) {
                    throw new Error('User is not defined in "Verify digital signature".'); // Should not happen, we should have already sent the response
                }

                const msg = `I am signing my one-time nonce: ${userModel.nonce}`;

                // We now are in possession of msg, publicAddress and signature. We will use a helper from eth-sig-util to extract the address from the signature
                const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
                const address = recoverPersonalSignature({
                    data: msgBufferHex,
                    sig: signature,
                });

                // The signature verification is successful if the address found with sigUtil.recoverPersonalSignature matches the initial publicAddress
                if (address.toLowerCase() === publicAddress.toLowerCase()) {
                    return userModel;
                } else {
                    throw new Error('Signature verification failed".');
                    //return null;
                }
            })
            .then(async (userModel) => {
                if (!(userModel)) {
                    throw new Error('User is not defined in "Generate a new nonce for the user".');  // Should not happen, we should have already sent the response
                }

                userModel.nonce = Math.floor(Math.random() * 1000000);
                return await userModel.save();
            })
            .then((userModel) => { // https://github.com/auth0/node-jsonwebtoken
                return new Promise<string>((resolve, reject) =>
                    jwt.sign(
                        {
                            payload: {
                                id: userModel.id,
                                publicAddress,
                            },
                        },
                        config.secret,
                        {
                            algorithm: config.algorithms[0],
                        },
                        (err, token) => {
                            if (err) {
                                return reject(err);
                            }
                            if (!token) {
                                return new Error('Empty token');
                            }
                            console.log(token);
                            return resolve(token);
                        }
                    )
                );
            })
            .then((accessToken: string) => accessToken )
    }
}

export default new AuthService();