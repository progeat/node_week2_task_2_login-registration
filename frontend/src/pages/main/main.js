import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHookFormMask } from 'use-mask-input';
import { Loader } from '../../components';
import { request } from '../../utils';
import styled from './main.module.css';

const appointmentFormSchema = yup.object().shape({
	name: yup
		.string()
		.required('Заполните ФИО')
		.min(3, 'Неверно заполнен ФИО. Минимум 3 символа'),
	phone: yup.string().required('Заполните телефон'),
	message: yup.string(),
});

export const Main = () => {
	const [resMessage, setResMessage] = useState('');
	const [isRequest, setIsRequest] = useState(false);
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

	const registerWithMask = useHookFormMask(register);

	const [serverError, setServerError] = useState(null);

	const onSubmit = ({ name, phone, message }) => {
		setIsRequest(true);

		request('/appointments', 'POST', { name, phone, message }).then(
			({ error, data }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}

				setIsRequest(false);
				setResMessage('Заявка отправлена');

				reset();
			},
		);
	};

	const formError =
		errors?.name?.message || errors?.phone?.message || errors?.message?.message;
	const errorMessage = formError || serverError;

	return (
		<div className={styled.main}>
			<h2>Запись к врачу</h2>
			<form className={styled.form} onSubmit={handleSubmit(onSubmit)}>
				<label>ФИО</label>
				<input
					name="name"
					type="text"
					{...register('name', {
						onChange: () => {
							setServerError(null);
							setResMessage('');
						},
					})}
				/>
				<label>Номер телефона</label>
				<input
					name="phone"
					type="text"
					{...registerWithMask('phone', ['+7 (999) 999-99-99'], {
						required: true,
						onChange: () => {
							setServerError(null);
							setResMessage('');
						},
					})}
				/>
				<label>Опишите вашу проблему</label>
				<textarea
					name="message"
					type="text"
					{...register('message', {
						onChange: () => {
							setServerError(null);
							setResMessage('');
						},
					})}
				/>
				<button type="submit" disabled={!!isRequest}>
					{isRequest ? <Loader type={'mini'} /> : 'Отправить'}
				</button>
				{resMessage && <div className={styled['res-message']}>{resMessage}</div>}
				{errorMessage && (
					<div className={styled['form-error']}>{errorMessage}</div>
				)}
			</form>
		</div>
	);
};
