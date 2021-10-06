import React from 'react';

import Header from "../../components/header";

class BaseDashboard extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                {this.props.children}
            </div>
        );
    }
}

export default BaseDashboard;