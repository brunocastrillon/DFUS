import cors from 'cors';
import express from 'express';
import routes from './routes';
import MongoMiddleware from './middlewares/mongo';

class Application {
    public application: express.Application;

    constructor() {
        this.application = express();
        this.dados();
        this.middleware();
        this.route();        
    }

    dados() {
        new MongoMiddleware().connect;
    }    

    middleware() {
        this.application.use(express.json());
        this.application.use(express.urlencoded({ extended: true }));
        this.application.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
            res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
            this.application.use(cors());
            next();
        });        
    }
    
    route() {
        this.application.use(routes);
    }    
}

export default new Application().application;