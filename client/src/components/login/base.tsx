import React from 'react';

class BaseLogin extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default BaseLogin;