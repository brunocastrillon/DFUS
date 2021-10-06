import React from 'react';
import { connect } from 'react-redux';
import BaseDashboard from './base';
import * as actions from '../../data/actions/auth';

interface IProps {
    logged: boolean;
    history: any;
    getLoggedInUser: any;
}

interface IState {
}

const Dashboard = (Component: any) => {
    class DashboardComponent extends React.Component<IProps, IState> {
        componentDidMount() {
            const { logged, history, getLoggedInUser } = this.props;
            getLoggedInUser();
            if (!logged) return history.replace("/");
        }

        componentDidUpdate(nextProps: { logged: any; }) {
            const { logged, history } = this.props;
            if (!nextProps.logged || !logged) return history.replace("/");
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