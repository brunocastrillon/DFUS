import { create } from 'ipfs-http-client';

const ipfsClient = create(
    {
        host: 'localhost',
        port: 5001,
        protocol: 'http'
    }
);

export default ipfsClient;