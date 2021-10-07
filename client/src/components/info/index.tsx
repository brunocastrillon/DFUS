import { Fragment } from 'react';

import {
    Card,
    Button
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import svgImage20 from '../../assets/images/illustrations/presentation-blocks.svg';
import svgImage21 from '../../assets/images/illustrations/process.svg';

const Info = () => {

    return (
        <Fragment>

            <Card className="card-box p-4 mb-4">
                <div className="d-flex justify-content-between">
                    <div className="pr-3">
                        <h4 className="font-size-xl font-weight-bold mb-2 mt-1">
                            Bem vindo(a) a sua bibliteca descentralizada de arquivos.
                        </h4>
                        <p className="opacity-6 font-size-md mb-3">
                            Olá, essa é a biblioteca Alexandria, seu repositório descentralizado de arquivos,
                            aqui você pode fazer o upload de seus arquivos de forma descentralizada,
                            utilizando a rede IPFS para armazenar os arquivos e a rede Ethereum para assiná-los e resguarda-los...
                            dessa forma seu arquivo não fica salvo somente em um servidor centralizado, e sim ao redor do mundo em milhares de pontos conectados a rede IPFS e Ethereum...
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

        </Fragment>
    )

}

export default Info;