import React, { Fragment } from 'react';

const Header = () => {

    return (
        <Fragment>
            <div className="header-nav-wrapper header-nav-wrapper-lg bg-night-sky bg-composed-wrapper">
                <div className="bg-composed-img-5 bg-composed-wrapper--image" />
                <div className="bg-composed-wrapper--content text-light">
                    <div className="header-nav-menu d-none d-lg-block">
                        <div className="d-flex justify-content-center">
                            <span className="w-100 d-flex justify-content-center pb-0">
                                <h1 className="display-3 text-center mb-3 mt-3 font-weight-bold text-white">
                                    Alexandria
                                </h1>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default Header;