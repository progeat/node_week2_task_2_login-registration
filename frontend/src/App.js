import { useLayoutEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Appointments, Authorization, Main } from './pages';
import { Header } from './components';
import { request } from './utils';

export const App = () => {
	const [user, setUser] = useState(null);

	const navigate = useNavigate();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		setUser(currentUserData);
	}, []);

	const onLogout = () => {
		request('/logout', 'POST');

		setUser(null);

		sessionStorage.removeItem('userData');

		navigate('/');
	};

	return (
		<div className="App">
			<Header user={user} onLogout={onLogout} />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route
					path="/login"
					element={<Authorization user={user} setUser={setUser} />}
				/>
				<Route path="/appointments" element={<Appointments user={user} />} />
				{/* <Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} /> */}
			</Routes>
		</div>
	);
};
