import UserModel from '../models/user';

class UserService {
    public async getByAddress(address: any) : Promise<any> {
        return await UserModel.findOne({ publicAddress: address }, 'publicAddress nonce').then((user: any) => {
            return user;
        });
    }    

    public async create(data: any) : Promise<any> {
        data.nonce = Math.floor(Math.random() * 1000000);
        return await UserModel.create(data).then((user) => {
            return user;
        });
    }
}

export default new UserService();