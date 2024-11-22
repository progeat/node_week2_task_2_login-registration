import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, request } from '../../utils';
import styled from './appointments.module.css';
import { Loader } from '../../components';

export const Appointments = ({ user }) => {
	const [appointments, setAppointments] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			return navigate('/login');
		}

		setIsLoading(true);

		request('/appointments')
			.then((appointmentsData) => {
				setAppointments(appointmentsData.data);
			})
			.catch((error) => {
				console.error(error);
				setError(error.message);
			})
			.finally(() => setIsLoading(false));
	}, [user, navigate]);

	if (isLoading) return <Loader />;
	if (error) return <div>{error}</div>;

	return (
		<div className={styled.appointments}>
			<h2>Заявки с формы</h2>
			{appointments.length ? (
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
								<td>{formatDate(appointment.createdAt)}</td>
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
