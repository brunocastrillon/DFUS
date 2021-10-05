import React from 'react';
import { connect } from 'react-redux';
import BaseLogin from './base.js';
import * as actions from '../../data/actions/auth';

interface ILoginProps {
    logged: any;
    history: any;
    getLoggedInUser: any;
}

interface ILoginState {
}

const Login = (Component: any) => {
    class LoginComponent extends React.Component<ILoginProps, ILoginState> {
        componentDidMount() {
            const { logged, history, getLoggedInUser } = this.props;
            getLoggedInUser();
            if (logged) return history.replace("/dashboard");
        }

        render() {
            return (
                <BaseLogin>
                    <Component {...this.props} />
                </BaseLogin>
            )
        }
    }

    const mapStateToProps = (state: { auth: { logged: any; loggedInUser: any; }; }) => ({
        logged: state.auth.logged,
        loggedInUser: state.auth.loggedInUser
    });

    return connect(mapStateToProps, actions)(LoginComponent);
}

export default Login;