import React, {
    useState,
    useEffect,
    Fragment,
    useCallback
} from 'react';

import jwtDecode from 'jwt-decode';

import Blockies from 'react-blockies';

import { Auth } from '../type';

import ipfsClient from '../middlewares/ipfs/service';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditarNomeIcon from '@material-ui/icons/EditTwoTone';

import {
    Grid,
    Card,
    CardContent,
    Button,
    Tooltip,
    IconButton
} from '@material-ui/core';

import Dropzone from 'react-dropzone';

import MuiAlert from '@material-ui/lab/Alert';

import svgImage20 from '../assets/images/illustrations/presentation-blocks.svg';
import svgImage21 from '../assets/images/illustrations/process.svg';

import { getContractDeployed } from '../middlewares/blockchain/service';

import TimestampFormatter from '../utils/TimeStampFormatter';

declare const window: any;

interface Props {
    auth: Auth;
    onLoggedOut: () => void;
}

interface State {
    loading: boolean;
    user?: {
        id: number;
        username: string;
    };
    username: string;
    files: [];
}

interface JwtDecoded {
    payload: {
        id: string;
        publicAddress: string;
    };
}

export const Profile = ({ auth, onLoggedOut }: Props): JSX.Element => {

    const [state, setState] = useState<State>({
        loading: false,
        user: undefined,
        username: '',
        files: []
    });

    useEffect(() => {
        const { accessToken } = auth;
        const {
            payload: { id },
        } = jwtDecode<JwtDecoded>(accessToken);

        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => response.json())
            .then((user) => setState({ ...state, user }))
            .catch(window.alert);

        async function fetchData() {
            await handleListBlockChain();
        }
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = ({
        target: { value },
    }: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, username: value });
    };

    const handleSubmit = () => {
        const { accessToken } = auth;
        const { user, username } = state;

        setState({ ...state, loading: true });

        if (!user) {
            window.alert(
                'The user id has not been fetched yet. Please try again in 5 seconds.'
            );
            return;
        }

        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user.id}`, {
            body: JSON.stringify({ username }),
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
        })
            .then((response) => response.json())
            .then((user) => setState({ ...state, loading: false, user }))
            .catch((err) => {
                window.alert(err);
                setState({ ...state, loading: false });
            });
    };

    const { accessToken } = auth;

    const {
        payload: { publicAddress },
    } = jwtDecode<JwtDecoded>(accessToken);

    const { loading, user, files } = state;

    const username = user && user.username;

    const handleListBlockChain = async () => {
        const ethereum = window.ethereum;
        const enderecoEnthereum = ethereum._state.accounts > 0 ? ethereum._state.accounts[0] : "";
        const fileManage = await getContractDeployed();

        let totalFiles = await fileManage.methods.total().call({ from: enderecoEnthereum });
        let listFiles = [];

        for (let index = 0; index < totalFiles; index++) {
            let file = await fileManage.methods.read(index).call({ from: enderecoEnthereum });
            if (file.fileContent !== "") listFiles.push(file);
        }

        const files: any = listFiles;
        setState({ ...state, files });
        return files;
    }

    const handleFileIPFS = async (fileReaderResult: any) => {
        const bytes = new Uint8Array(fileReaderResult as ArrayBuffer);
        const fileIPFS = await ipfsClient.add(bytes);

        return fileIPFS;
    };

    const handleFileBlockchain = async (fileIPFS: any, fileName: any, fileType: any) => {
        const ethereum = window.ethereum;
        const enderecoEnthereum = ethereum._state.accounts > 0 ? ethereum._state.accounts[0] : "";
        const fileManage = await getContractDeployed();

        const fileDateTime = (new Date()).getTime();

        await fileManage.methods.add(fileIPFS, fileName, fileType, fileDateTime).send({ from: enderecoEnthereum, gasPrice: 20e9 })
            .on('receipt', async (result: any) => {
                // console.log(result.events.fileAdded);
                // console.log(`https://gateway.ipfs.io/ipfs/${fileIPFS}`);
                await handleListBlockChain();
            })
            .on('error', (error: any) => {
                console.log(error);
            });
    }

    const onFileDrop = useCallback((acceptedFiles: Blob[]) => {
        acceptedFiles.forEach((file: any) => {
            const filereader = new FileReader();

            filereader.onabort = () => console.log('file reading was aborted');
            filereader.onerror = () => console.log('file reading has failed');
            filereader.readAsArrayBuffer(file);
            filereader.onload = async () => {
                const fileIPFS = await handleFileIPFS(filereader.result);
                handleFileBlockchain(fileIPFS.path, file.name, file.type);
            };
        })
    }, []);

    const onFileCancel = async () => {

    }

    return (
        <Fragment>

            <Grid container spacing={3} className="p-3">
                <Grid item xs={12} lg={3}>
                    <div className="bg-night-sky p-3 rounded text-white h-100">
                        <div className="d-flex align-items-start justify-content-between">
                            <div className="avatar-icon-wrapper d-100">
                                <span className="badge-circle badge badge-success">Online</span>
                                <Blockies seed={publicAddress} className="avatar-icon d-100" />
                            </div>

                            <div className="ml-auto">
                                <Tooltip arrow title="Sair">
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        className="text-white d-20"
                                        onClick={onLoggedOut}
                                    >
                                        <span className="btn-wrapper--icon">
                                            <FontAwesomeIcon
                                                icon={['fas', 'sign-out-alt']}
                                                className="font-size-sm"
                                            />
                                        </span>
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="font-weight-bold font-size-lg d-flex align-items-center mt-2 mb-0">
                            <span>
                                {username ? <pre>{username}</pre> : 'nome não cadastrado'}{' '}
                                <IconButton aria-label="delete" className="text-white" size="small" disabled={false} title="editar">
                                    <EditarNomeIcon fontSize="small" />
                                </IconButton>
                            </span>
                        </div>
                        <p className="mb-4 font-size-md text-white-50">
                            {publicAddress}
                        </p>

                        <div className="divider opacity-2 my-4" />

                        <p className="text-white-50 mb-0 py-3">
                            Short profile bio description here. Pleasure of the moment, so
                            blinded by desire, that they cannot foresee...{' '}
                            <a
                                href="#/"
                                onClick={e => e.preventDefault()}
                                className="text-white">
                                Read more
                            </a>
                        </p>
                        <div className="pt-3 pb-4">
                            <Grid container spacing={4} className=" text-center">
                                <Grid xs={4} item>
                                    <b className="d-block font-weight-bold font-size-lg">300</b>
                                    <small className="text-uppercase text-white-50">
                                        contatos
                                    </small>
                                </Grid>
                                <Grid xs={4} item>
                                    <b className="d-block font-weight-bold font-size-lg">1.2k</b>
                                    <small className="text-uppercase text-white-50">
                                        uploads
                                    </small>
                                </Grid>
                                <Grid xs={4} item>
                                    <b className="d-block font-weight-bold font-size-lg">60</b>
                                    <small className="text-uppercase text-white-50">
                                        permissões
                                    </small>
                                </Grid>
                            </Grid>
                        </div>

                        <div className="divider opacity-2 my-4" />

                        <div className="font-weight-bold font-size-lg d-flex align-items-center mb-3">
                            <span>Interações Recentes</span>
                        </div>
                        <div className="py-2">
                            <div className="align-box-row">
                                <a
                                    href="#/"
                                    onClick={e => e.preventDefault()}
                                    className="avatar-icon-wrapper avatar-icon-md text-white">
                                    <span className="badge-circle badge badge-success">
                                        Online
                                    </span>
                                    <div className="avatar-icon rounded-circle">
                                        {/* <img alt="..." src={avatar1} /> */}
                                    </div>
                                </a>
                                <div className="pl-2">
                                    <span className="d-block">
                                        <a
                                            href="#/"
                                            onClick={e => e.preventDefault()}
                                            className="text-white">
                                            0x5ed97ed5b61cf820420f853eaa3bdb24aea0e5cb
                                        </a>
                                        <small className="d-block text-white-50">
                                            (Adella Galen)
                                        </small>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="py-2">
                            <div className="align-box-row">
                                <a
                                    href="#/"
                                    onClick={e => e.preventDefault()}
                                    className="avatar-icon-wrapper avatar-icon-md text-white">
                                    <div className="badge badge-primary badge-circle">
                                        Offline
                                    </div>
                                    <div className="avatar-icon rounded-circle">
                                        {/* <img alt="..." src={avatar2} /> */}
                                    </div>
                                </a>
                                <div className="pl-2">
                                    <span className="d-block">
                                        <a
                                            href="#/"
                                            onClick={e => e.preventDefault()}
                                            className="text-white">
                                            0x5ed97ed5b61cf820420f853eaa3bdb24aea0e5cb
                                        </a>
                                        <small className="d-block text-white-50">
                                            (Mandy Erle)
                                        </small>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="py-2">
                            <div className="align-box-row">
                                <a
                                    href="#/"
                                    onClick={e => e.preventDefault()}
                                    className="avatar-icon-wrapper avatar-icon-md text-white">
                                    <span className="badge-circle badge badge-success">
                                        Online
                                    </span>
                                    <div className="avatar-icon rounded-circle">
                                        {/* <img alt="..." src={avatar3} /> */}
                                    </div>
                                </a>
                                <div className="pl-2">
                                    <span className="d-block">
                                        <a
                                            href="#/"
                                            onClick={e => e.preventDefault()}
                                            className="text-white">
                                            0x5ed97ed5b61cf820420f853eaa3bdb24aea0e5cb
                                        </a>
                                        <small className="d-block text-white-50">
                                            (John Doe)
                                        </small>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="divider opacity-2 my-4" />

                        <div className="font-weight-bold font-size-lg d-flex align-items-center mb-3">
                            <span>Categorias</span>
                        </div>
                        <div className="py-2">
                            <div className="d-flex justify-content-between">
                                <span className="d-block">
                                    <a
                                        href="#/"
                                        onClick={e => e.preventDefault()}
                                        className="text-white">
                                        Arte
                                    </a>
                                </span>
                                <span className="badge badge-dark">22</span>
                            </div>
                        </div>
                        <div className="py-2">
                            <div className="d-flex justify-content-between">
                                <span className="d-block">
                                    <a
                                        href="#/"
                                        onClick={e => e.preventDefault()}
                                        className="text-white">
                                        Arquitetura
                                    </a>
                                </span>
                                <span className="badge badge-dark">23</span>
                            </div>
                        </div>
                        <div className="py-2">
                            <div className="d-flex justify-content-between">
                                <span className="d-block">
                                    <a
                                        href="#/"
                                        onClick={e => e.preventDefault()}
                                        className="text-white">
                                        Engenharia
                                    </a>
                                </span>
                                <span className="badge badge-dark">22</span>
                            </div>
                        </div>
                        <div className="py-2">
                            <div className="d-flex justify-content-between">
                                <span className="d-block">
                                    <a
                                        href="#/"
                                        onClick={e => e.preventDefault()}
                                        className="text-white">
                                        Inteligência Artificial
                                    </a>
                                </span>
                                <span className="badge badge-dark">15</span>
                            </div>
                        </div>
                        <div className="py-2">
                            <div className="d-flex justify-content-between">
                                <span className="d-block">
                                    <a
                                        href="#/"
                                        onClick={e => e.preventDefault()}
                                        className="text-white">
                                        Blockchain
                                    </a>
                                </span>
                                <span className="badge badge-dark">5</span>
                            </div>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} lg={9}>
                    <div className="bg-night-sky p-3 rounded text-white h-90">
                        <Card className="card-box p-4 mb-4">
                            <div className="d-flex justify-content-between">
                                {/* <Grid>
                                    <Grid>

                                    </Grid>
                                    <Grid>

                                    </Grid>
                                </Grid> */}
                                <div className="pr-3">
                                    <h4 className="font-size-xl font-weight-bold mb-2 mt-1">
                                        Bem vindo(a) a sua bibliteca descentralizada de arquivos.
                                    </h4>
                                    <p className="opacity-6 font-size-md mb-3">
                                        Olá, essa é a biblioteca Alexandria, seu repositório descentralizado de arquivos,
                                        aqui você pode fazer o upload de seus arquivos de forma descentralizada,
                                        utilizando a rede IPFS para armazenar os arquivos e a rede Ethereum para assiná-los e resguarda-los...
                                        {/* dessa forma seu arquivo não fica salvo somente em um servidor centralizado, e sim ao redor do mundo em milhares de pontos conectados a rede IPFS e Ethereum... */}
                                    </p>
                                    <Button color="primary" className="text-first">
                                        <span className="btn-wrapper--label">
                                            <small className="font-weight-bold">Saiba mais</small>
                                        </span>
                                        <span className="btn-wrapper--icon">
                                            <small>
                                                <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                                            </small>
                                        </span>
                                    </Button>
                                </div>
                                <div className="w-25 d-flex align-items-center">
                                    <img alt="..." className="d-block img-fluid" src={svgImage20} />
                                </div>
                                <div className="w-25 d-flex align-items-center">
                                    <img alt="..." className="d-block img-fluid" src={svgImage21} />
                                </div>
                            </div>
                        </Card>

                        <div className="divider opacity-2 my-3" />

                        <div className="pt-0 pb-0">
                            <Grid container spacing={4} className="mt-0 mb-3">
                                <Grid item xs={12} sm={12}>

                                    <div className="dropzone">
                                        <Dropzone
                                            onDrop={onFileDrop.bind(this)}
                                            onFileDialogCancel={onFileCancel.bind(this)}
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <div className="dz-message">
                                                        <div className="dx-text">
                                                            Solte algum arquivo aqui, ou clique e selecione um arquivo para salvar.
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Dropzone>
                                    </div>

                                </Grid>
                            </Grid>
                        </div>

                        <div className="divider opacity-2 my-3" />

                        <div className="pt-0 pb-0">
                            <Grid container spacing={4} className="mt-0">
                                <Grid item xs={12} sm={12}>
                                    <Card className="card-box mb-0">
                                        <div className="card-header">
                                            <div className="card-header--title">
                                                <b className="font-size-lg d-flex align-items-center">
                                                    Meus Documentos
                                                </b>
                                            </div>
                                        </div>

                                        <CardContent className="p-3">
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={12}>
                                                    <div className="text-center d-flex align-items-left mb-0">
                                                        <Grid container spacing={3}>

                                                            {
                                                                files.map((file: { fileName: string; fileContent: string; dateTime: number;}, index) => (
                                                                    <Grid item xs={4} sm={2} md={4} lg={2} key={index}>
                                                                        <a href={`https://gateway.ipfs.io/ipfs/${file.fileContent}`} target={'_blank'} rel="noreferrer">
                                                                            <Card className="card-box card-box-hover-rise-alt mb-0">
                                                                                <CardContent className="p-3">
                                                                                    <div className="card-img-wrapper">
                                                                                        <div className="rounded py-3 mb-0 bg-secondary d-flex align-items-center align-content-center">
                                                                                            <FontAwesomeIcon icon={['far', 'file-pdf']} className="display-3 text-primary mx-auto" />
                                                                                        </div>
                                                                                        <b className="small">
                                                                                            {file.fileName}
                                                                                        </b>
                                                                                        <div>
                                                                                            <small className="opacity-6">
                                                                                                Criado:{' '}
                                                                                                <span className="text-black-50">
                                                                                                    { TimestampFormatter(file.dateTime) }
                                                                                                    </span>
                                                                                            </small>
                                                                                        </div>
                                                                                    </div>
                                                                                </CardContent>
                                                                            </Card>
                                                                        </a>
                                                                    </Grid>
                                                                ))
                                                            }

                                                        </Grid>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>

                    </div>
                </Grid>
            </Grid>

            {/* <div className="Profile">
                <div>
                    <label htmlFor="username">Change username: </label>
                    <input name="username" onChange={handleChange} />
                    <button disabled={loading} onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div> */}
        </Fragment>
    );
};