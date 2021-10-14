import {
    Fragment,
    useState
}
    from 'react';

import {
    Card,
    CardContent,
    Grid,
    TextField
} from '@material-ui/core';

import Dropzone from 'react-dropzone';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ipfsClient from '../../middlewares/ipfs/service';
import { getContractDeployed } from '../../middlewares/blockchain/service';

import {
    formatTimeStamp,
    generateHash
} from '../../utils/util';

declare const window: any;

interface IState {
    listFiles: [];
    handleList: any;
}

const Files = ({ listFiles, handleList }: IState) => {
    const [form, setForm] = useState({ descricao: "" });

    const clearInput = () => {
        setForm({ ...form, descricao: "" });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleFileBlockchain = async (fileIPFS: any, fileHash: string, fileName: any, fileDescription: any, fileType: any) => {
        const ethereum = window.ethereum;
        const enderecoEnthereum = ethereum._state.accounts > 0 ? ethereum._state.accounts[0] : "";
        const fileManage = await getContractDeployed();
        const fileDateTime = (new Date()).getTime();

        await fileManage.methods.add(fileIPFS, fileHash, fileName, fileDescription, fileType, fileDateTime).send({ from: enderecoEnthereum, gasPrice: 20e9 })
            .on('receipt', async (result: any) => {
                // console.log(result.events.fileAdded);
                handleList();
                clearInput();
            })
            .on('error', (error: any) => {
                console.log(error);
            });
    }

    const handleFileIPFS = async (fileReaderResult: any) => {
        const bytes = new Uint8Array(fileReaderResult as ArrayBuffer);
        const fileIPFS = await ipfsClient.add(bytes);

        return fileIPFS;
    };

    const onFileDrop = (acceptedFiles: Blob[]) => {
        acceptedFiles.forEach((file: any) => {
            const filereader = new FileReader();

            filereader.onabort = () => console.log('file reading was aborted');
            filereader.onerror = () => console.log('file reading has failed');
            filereader.readAsArrayBuffer(file);
            filereader.onload = async () => {
                const fileDescription = form.descricao;
                const fileHash = await generateHash(filereader.result);
                const fileIPFS = await handleFileIPFS(filereader.result);

                handleFileBlockchain(fileIPFS.path, fileHash, file.name, fileDescription, file.type);
            };
        });
    }

    const onFileCancel = async () => {

    }

    return (
        <Fragment>
            <div className="pt-0 pb-0">
                <Grid container spacing={4} className="mt-0">
                    <Grid item xs={12} sm={12}>
                        <Card className="card-box mb-0">
                            <div className="card-header">
                                <div className="card-header--title">
                                    <b className="font-size-lg d-flex align-items-center">
                                        Documento
                                    </b>
                                </div>
                            </div>

                            <CardContent className="p-3">
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>

                                        <TextField
                                            id="descricao"
                                            name="descricao"
                                            label="Descrição"
                                            value={form.descricao}
                                            size="small"
                                            variant="outlined"
                                            className="mt-1"
                                            rows="5"
                                            multiline
                                            fullWidth
                                            onChange={handleChange}
                                        />

                                    </Grid>

                                    <Grid item xs={12} sm={6}>

                                        <div className="dropzone">
                                            <Dropzone
                                                onDrop={onFileDrop.bind(this)}
                                                onFileDialogCancel={onFileCancel.bind(this)}
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <div {...getRootProps()}>
                                                        <input {...getInputProps()} />
                                                        <div className="dz-message bg-night-sky">
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
                            </CardContent>
                        </Card>
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
                                                    listFiles.map((file: { fileName: string; fileContent: string; dateTime: number; }, index) => (
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
                                                                                        {formatTimeStamp(file.dateTime)}
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

        </Fragment>
    )
}

export default Files;