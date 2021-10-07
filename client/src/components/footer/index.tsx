import { Fragment } from 'react';
import { Container } from '@material-ui/core';

const Footer = () => {
    return (
        <Fragment>
            <div className="bg-night-sky py-3">
                <Container className="pt-sm-0 pt-5">
                    <div className="mt-3 mb-3">
                        <div className="text-center d-block text-white-50">
                            Copyright &copy; 2021 - Castrillon
                        </div>
                    </div>
                </Container>
            </div>
        </Fragment>
    )
}

export default Footer;