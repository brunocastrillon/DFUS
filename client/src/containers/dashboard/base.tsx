import React from 'react';

import {
    Header,
    Footer
} from "../../components";

class BaseLogin extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default BaseLogin;