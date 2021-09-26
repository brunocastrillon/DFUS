import os from 'os';
import path from 'path';
import { INTEGER, Sequelize, STRING } from 'sequelize';
import UserModel from './models/user';

const sequelize = new Sequelize('login-with-metamask-database', '', undefined, {
	dialect: 'sqlite',
	storage: path.join(os.tmpdir(), 'db.sqlite'),
	logging: false,
});

// Create new tables
sequelize.sync();

export { sequelize };