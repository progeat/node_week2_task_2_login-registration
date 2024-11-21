import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getFormatedMaskPhone, request } from '../../utils';
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
	const {
		register,
		reset,
		handleSubmit,
		setValue,
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
				{/* <Controller
					name="phone"
					render={({ field }) => {
						// sending integer instead of string.
						return (
							<input
								{...field}
								onChange={(e) => field.onChange(parseInt(e.target.value))}
							/>
						);
					}}
				/> */}
				<input
					name="phone"
					type="text"
					{...register('phone', {
						onChange: ({ target }) => {
							setValue('phone', getFormatedMaskPhone(target.value));
							setServerError(null);
						},
					})}
					placeholder="+7 (___) ___-__-__"
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
