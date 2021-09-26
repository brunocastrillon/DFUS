import UserModel from '../models/user';

class UserService {
    public async list(whereClause: any) {
        return UserModel.findAll(whereClause).then((users: UserModel[]) => users);
    }

    public async get(userId: any) {
        return UserModel.findByPk(userId).then((user: UserModel | null) => user);
    }

    public async create(model: any) {
        UserModel.create(model).then((user: UserModel) => user);
    }
}

export default new UserService();