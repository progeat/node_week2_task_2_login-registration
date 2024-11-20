import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { request } from '../../utils';

export const Appointments = ({ user }) => {
	const [appointments, setAppointments] = useState([]);

	// TODO в useEffect добавить условие существования пользователя, иначе редиректы
	useEffect(() => {
		request('/appointments').then((appointmentsData) => {
			setAppointments(appointmentsData);
		});
	}, []);

	if (!user) {
		return <Navigate to={'/login'} />;
	}

	console.log('Заявки', appointments);

	return <div>Список заявок</div>;
};
