import { Routes, Route } from 'react-router-dom';
import { Appointments, Authorization, Main } from './pages';
import { Header } from './components';

export const App = () => {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/login" element={<Authorization />} />
				<Route path="/appointments" element={<Appointments />} />
				{/* <Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} /> */}
			</Routes>
		</div>
	);
};
