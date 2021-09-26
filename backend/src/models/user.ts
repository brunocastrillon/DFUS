import { Model } from 'sequelize';

export default class user extends Model {
    public id!: number;
    public nonce!: number;
    public publicAddress!: string;
    public username?: string;
}