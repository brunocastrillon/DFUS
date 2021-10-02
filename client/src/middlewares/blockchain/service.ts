import {
    abi,
    networks
} from './contracts/FileManage.json';

import { getContract } from './network';

export async function getContractDeployed() {
    let id = Object.keys(networks)[0] as keyof typeof networks;
    let networkInstance = networks[id];

    const networkAddress = networkInstance.address;
    const contractInstance = getContract(abi, networkInstance, networkAddress);

    return contractInstance;
}