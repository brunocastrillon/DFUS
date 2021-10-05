import { useState } from 'react';
import {
    Grid,
    Container,
    Card,
    Button
} from '@material-ui/core';

import { Auth } from '../../type';

import Web3 from 'web3';

import logoMetamask from '../assets/images/metamask-white.png';

import { connect } from 'react-redux';
import * as actions from '../../data/actions/auth';

interface Props {
    onLoggedIn: (auth: Auth) => void;
}

let web3: Web3 | undefined = undefined; // Will hold the web3 instance

const Login = ({ onLoggedIn }: Props): JSX.Element => {
    const [loading, setLoading] = useState(false); // Loading button state

    const handleAuthenticate = ({
        publicAddress,
        signature,
    }: {
        publicAddress: string;
        signature: string;
    }) =>
        fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
            body: JSON.stringify({ publicAddress, signature }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
        }).then((response) => response.json());

    const handleSignMessage = async ({
        publicAddress,
        nonce
    }: {
        publicAddress: string;
        nonce: string;
    }) => {
        try {
            const signature = await web3!.eth.personal.sign(`I am signing my one-time nonce: ${nonce}`, publicAddress, ''); // MetaMask will ignore the password argument here
            return { publicAddress, signature };
        } catch (err) {
            throw new Error('You need to sign the message to be able to log in.');
        }
    };

    const handleSignup = (publicAddress: string) =>
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
            body: JSON.stringify({ publicAddress }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
        }).then((response) => response.json());

    const handleClick = async () => {
        if (!(window as any).ethereum) {
            window.alert('Please install MetaMask first.');
            return;
        }

        if (!web3) {
            try {
                await (window as any).ethereum.enable();    // Request account access if needed
                web3 = new Web3((window as any).ethereum);  // We don't know window.web3 version, so we use our own instance of Web3 with the injected provider given by MetaMask
            } catch (error) {
                window.alert('You need to allow MetaMask.');
                return;
            }
        }

        const coinbase = await web3.eth.getCoinbase();
        if (!coinbase) {
            window.alert('Please activate MetaMask first.');
            return;
        }

        const publicAddress = coinbase.toLowerCase();
        setLoading(true);

        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${publicAddress}`)
            .then((response) => response.json())
            .then((data) => data.user !== null ? data.user : handleSignup(publicAddress))
            .then(handleSignMessage)
            .then(handleAuthenticate)
            .then(onLoggedIn)
            .catch((err) => {
                console.log(err);
                window.alert(err);
                setLoading(false);
            });
    };

    return (
        <div className="app-wrapper min-vh-100">
            <div className="app-main flex-column">
                <div className="app-content p-5">
                    <div className="app-content--inner d-flex align-items-center p-5">
                        <div className="flex-grow-1 w-100 d-flex align-items-center p-5">
                            <div className="bg-composed-wrapper--content py-5">
                                <Container maxWidth="lg">
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} lg={3} className="d-none d-xl-flex align-items-center"></Grid>

                                        <Grid item xs={12} lg={6} className="d-flex flex-column align-items-center">
                                            <Card className="card-box p-3 bg-night-sky text-white mb-1 w-100 rounded-sm">
                                                <div className="text-center">
                                                    <div className="avatar-icon-wrapper rounded-circle m-0">
                                                        <div className="rounded-circle overflow-hidden">
                                                            <img alt="..." className="w-90 mx-auto d-block img-fluid" src={logoMetamask} />
                                                        </div>
                                                    </div>
                                                    <h3 className="font-weight-bold mt-0 text-white-50">
                                                        Login with Metamask
                                                    </h3>
                                                    <p className="mb-3 text-white-50">
                                                        {' '}
                                                        Sua biblioteca de documentos descentralizados
                                                    </p>
                                                    <Button color="inherit" variant="outlined" className="m-3 btn-gradient bg-night-sky" onClick={handleClick}>
                                                        <span className="btn-wrapper--label">
                                                            {loading ? 'Login' : 'Login'}
                                                        </span>
                                                    </Button>
                                                </div>
                                            </Card>
                                        </Grid>

                                        <Grid item xs={12} lg={3} className="d-none d-xl-flex align-items-center"></Grid>
                                    </Grid>
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(null, actions)(Login);