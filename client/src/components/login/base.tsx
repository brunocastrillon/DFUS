import React from 'react';

class BaseDashboard extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default BaseDashboard;