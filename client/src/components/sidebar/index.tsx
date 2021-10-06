import { Fragment } from 'react';

import {
    Grid,
    Button,
    Tooltip,
    IconButton
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import EditarNomeIcon from '@material-ui/icons/EditTwoTone';

const Sidebar = () => {

    const handleLogOut = async () => {

    }

    return (
        <Fragment>
            <div className="bg-night-sky p-3 rounded text-white h-100">
                <div className="d-flex align-items-start justify-content-between">
                    <div className="avatar-icon-wrapper d-100">
                        <span className="badge-circle badge badge-success">Online</span>
                        {/* <Blockies seed={publicAddress} className="avatar-icon d-100" /> */}
                    </div>

                    <div className="ml-auto">
                        <Tooltip arrow title="Sair">
                            <Button
                                variant="outlined"
                                color="inherit"
                                className="text-white d-20"
                                onClick={handleLogOut}
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
                        {/* {username ? <pre>{username}</pre> : 'nome não cadastrado'}{' '} */}
                        <p>nome do usuario</p>
                        <IconButton aria-label="delete" className="text-white" size="small" disabled={false} title="editar">
                            <EditarNomeIcon fontSize="small" />
                        </IconButton>
                    </span>
                </div>
                <p className="mb-4 font-size-md text-white-50">
                    {/* {publicAddress} */}
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
        </Fragment>
    )

}

export default Sidebar;