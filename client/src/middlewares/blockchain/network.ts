import Web3 from 'web3';

let web3: any;

async function getWeb3() {
    if (!web3) {
        web3 = new Web3(Web3.givenProvider);
    }
    return web3;
}

export function hasProvider() {
    return !!Web3.givenProvider;
}

export async function getNetworkId() {
    getWeb3();
    const networkId = await web3.eth.net.getId();
    return networkId;
}

export async function getContract(abi: any, network: any, address: any) {
    getWeb3();
    const contract = new web3.eth.Contract(abi, network && address);
    return contract;
}