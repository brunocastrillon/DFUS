import React from 'react';
import { connect } from 'react-redux';
import BaseDashboard from './base';
import * as actions from '../../data/actions/auth';

interface IDashboardProps {
    logged: any;
    history: any;
    getLoggedInUser: any;
}

interface IDashboardState {

}

const Dashboard = (Component: any) => {
    class DashboardComponent extends React.Component<IDashboardProps, IDashboardState> {
        componentDidMount() {
            const { logged, history, getLoggedInUser } = this.props;
            getLoggedInUser();
            if (!logged) return history.replace("/");
        }        

        render() {
            return (
                <BaseDashboard>
                    <Component {...this.props} />
                </BaseDashboard>
            )
        }
    }

    const mapStateToProps = (state: { auth: { logged: any; loggedInUser: any; }; }) => ({
        logged: state.auth.logged,
        loggedInUser: state.auth.loggedInUser
    });

    return connect(mapStateToProps, actions)(DashboardComponent);
}

export default Dashboard;