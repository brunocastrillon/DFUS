import UserModel from '../models/user';

class UserService {
    public async list() {
        await UserModel.find({}).then((users: any) => {
            return users;
        });
    }

    public async get(id: any) {
        await UserModel.findOne({ _id: id }).then((user: any) => {
            return user;
        });
    }

    public async create(data: any) {
        await UserModel.create(data).then(() => {
            return data;
        });
    }
}

export default new UserService();