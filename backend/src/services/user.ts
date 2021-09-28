import UserModel from '../models/user';

class UserService {
    public async list() : Promise<any> {
        return await UserModel.find({}).then((users: any) => {
            return users;
        });
    }

    public async get(id: any) : Promise<any> {
        return await UserModel.findOne({ _id: id }).then((user: any) => {
            return user;
        });
    }

    public async getByAddress(address: any) : Promise<any> {
        return await UserModel.findOne({ publicAddress: address }).then((user: any) => {
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