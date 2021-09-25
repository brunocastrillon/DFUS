import application from './application';
require('dotenv/config');

const port = process.env.SERVERPORT;

(async () => {

    try {
        application.listen(port, () => console.info(`DFUS-API disponível na porta ${port}`));
    } catch (error) {
        console.log(error);
    }

})();