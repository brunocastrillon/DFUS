import React, { useState } from 'react';

import {
    Grid,
    Container,
    // Input,
    // InputLabel,
    // InputAdornment,
    Card,
    CardContent,
    IconButton,
    Button, Tooltip, Box
    // FormControl,
    // CircularProgress
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Auth } from '../type';

import Web3 from 'web3';

import logoSistema from '../assets/images/biblioteca-01.jpg'; //'../assets/images/illustrations/login.svg' //'../../assets/images/illustrations/login.svg';
import logoMetamask from '../assets/images/metamask-white.png';

interface Props {
    onLoggedIn: (auth: Auth) => void;
}

let web3: Web3 | undefined = undefined; // Will hold the web3 instance

export const Login = ({ onLoggedIn }: Props): JSX.Element => {
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
            headers: {
                'Content-Type': 'application/json',
            },
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
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        }).then((response) => response.json());

    const handleClick = async () => {
        if (!(window as any).ethereum) {
            window.alert('Please install MetaMask first.');
            return;
        }

        if (!web3) {
            try {
                // Request account access if needed
                await (window as any).ethereum.enable();

                // We don't know window.web3 version, so we use our own instance of Web3
                // with the injected provider given by MetaMask
                web3 = new Web3((window as any).ethereum);
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
                                        <Grid item xs={12} lg={3} className="d-none d-xl-flex align-items-center">
                                        </Grid>

                                        <Grid item xs={12} lg={6} className="d-flex flex-column align-items-center">

                                            {/* <span className="w-100 text-left text-md-center pb-4">
                                                <h1 className="display-3 text-xl-left text-center mb-3 font-weight-bold d-flex justify-content-center">
                                                    Faça login na sua conta
                                                </h1>
                                                <p className="font-size-lg text-xl-left text-center mb-0 text-black-50 d-flex justify-content-center">
                                                    Faça o login abaixo para continuar.
                                                </p>
                                            </span>

                                            <Card className="m-0 w-100 p-0 border-0">
                                                <CardContent className="p-3 d-flex justify-content-center">
                                                    <Button color="inherit" className="m-2 text-black btn-gradient btn-gradient-inverse bg-sunny-morning" onClick={handleClick}>
                                                        <span className="btn-wrapper--label">
                                                            {loading ? 'Login with MetaMask' : 'Login with MetaMask'}
                                                        </span>
                                                        <img alt="..." className="w-50 mx-auto d-block img-fluid" src={logoMetamask} />
                                                    </Button>
                                                </CardContent>
                                            </Card> */}

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

                                        <Grid item xs={12} lg={3} className="d-none d-xl-flex align-items-center">
                                        </Grid>
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