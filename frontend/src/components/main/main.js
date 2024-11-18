import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { request } from '../../utils';
import styled from './main.module.css';

const appointmentFormSchema = yup.object().shape({
	name: yup
		.string()
		.required('Заполните ФИО')
		.min(3, 'Неверно заполнен ФИО. Минимум 3 символа'),
	phone: yup.string().required('Заполните телефон'),
	message: yup
		.string()
		.required('Заполните поле "Опишите вашу проблему"')
		.min(3, 'Неверно заполнено поле "Опишите вашу проблему. Минимум 3 символа"'),
});

export const Main = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			phone: '',
			message: '',
		},
		resolver: yupResolver(appointmentFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const onSubmit = ({ name, phone, message }) => {
		request('/appointments', 'POST', { name, phone, message }).then(
			({ error, data }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}

				reset();
			},
		);
	};

	const formError =
		errors?.name?.message || errors?.phone?.message || errors?.message?.message;
	const errorMessage = formError || serverError;

	return (
		<div className={styled.main}>
			<h1>Запись к врачу</h1>
			<form className={styled.form} onSubmit={handleSubmit(onSubmit)}>
				<label>ФИО</label>
				<input
					name="name"
					type="text"
					{...register('name', {
						onChange: () => setServerError(null),
					})}
				/>
				<label>Номер телефона</label>
				<input
					name="phone"
					type="number"
					{...register('phone', {
						onChange: () => setServerError(null),
					})}
				/>
				<label>Опишите вашу проблему</label>
				<textarea
					name="message"
					type="text"
					{...register('message', {
						onChange: () => setServerError(null),
					})}
				/>
				<button type="submit" disabled={!!errorMessage}>
					Отправить
				</button>
				{errorMessage && (
					<div className={styled['form-error']}>{errorMessage}</div>
				)}
			</form>
		</div>
	);
};
