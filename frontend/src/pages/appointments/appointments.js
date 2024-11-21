import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { request } from '../../utils';

export const Appointments = ({ user }) => {
	const [appointments, setAppointments] = useState([]);

	useEffect(() => {
		request('/appointments').then((appointmentsData) => {
			setAppointments(appointmentsData);
			console.log(appointmentsData);
		});
	}, []);

	if (!user) {
		return <Navigate to={'/login'} />;
	}

	console.log('Заявки', appointments);

	return (
		<div>
			<h2>Заявки с формы</h2>
			{appointments[0] ? (
				<table>
					<thead>
						<tr>
							<th>Дата отправки</th>
							<th>ФИО</th>
							<th>Телефон</th>
							<th>Проблема</th>
						</tr>
					</thead>
					<tbody>
						{appointments.map((appointment) => (
							<tr key={appointment.id}>
								<td>{appointment.createdAt}</td>
								<td>{appointment.name}</td>
								<td>{appointment.phone}</td>
								<td>{appointment.message}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div>Заявок нет</div>
			)}
		</div>
	);
};
