import './app.css';

import React, { useEffect, useState } from 'react';

import { Login } from '../login/login';
import { Profile } from '../profile/profile';
import { Auth } from '../type';

const LS_KEY = 'login-with-metamask:auth';

interface State {
	auth?: Auth;
}

export const App = (): JSX.Element => {
	const [state, setState] = useState<State>({});

	useEffect(() => {
		// Access token is stored in localstorage
		const ls = window.localStorage.getItem(LS_KEY);
		const auth = ls && JSON.parse(ls);
		setState({ auth });
	}, []);

	const handleLoggedIn = (auth: Auth) => {
		localStorage.setItem(LS_KEY, JSON.stringify(auth));
		setState({ auth });
	};

	const handleLoggedOut = () => {
		localStorage.removeItem(LS_KEY);
		setState({ auth: undefined });
	};

	const { auth } = state;

	return (
		<div className="App">
			<header className="App-header">
				<h1 className="App-title">
					Welcome to Login with MetaMask Demo
				</h1>
			</header>
			<div className="App-intro">
				{auth ? (
					<Profile auth={auth} onLoggedOut={handleLoggedOut} />
				) : (
					<Login onLoggedIn={handleLoggedIn} />
				)}
			</div>
		</div>
	);
};