import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import { AuthFormError, Button, H2, Input } from '../../components';
// import { useResetForm } from '../../hooks';
// import { setUser } from '../../actions';
// import { selectUserRole } from '../../selectors';
// import { ROLE } from '../../constants';
// import styled from 'styled-components';
import { request } from '../../utils';
import styled from './authorization.module.css';

const authFormSchema = yup.object().shape({
	login: yup.string().email().required('Заполните Почту'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %',
		)
		.min(5, 'Неверно заполнен пароль. Минимум 5 символов')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
});

export const Authorization = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	// const dispatch = useDispatch();

	// const roleId = useSelector(selectUserRole);

	// useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			// dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
			reset();
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	// if (roleId !== ROLE.GUEST) {
	// 	return <Navigate to="/appointments" />;
	// }

	return (
		<div className={styled.authorization}>
			<form className={styled.form} onSubmit={handleSubmit(onSubmit)}>
				<h2>Авторизация</h2>
				<label>Электронная почта</label>
				<input
					type="email"
					placeholder="Почта...(staff)"
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<label>Пароль</label>
				<input
					type="password"
					placeholder="Пароль...(staff)"
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<button type="submit" disabled={!!formError}>
					Авторизоваться
				</button>
				{errorMessage && (
					<div className={styled['form-error']}>{errorMessage}</div>
				)}
			</form>
		</div>
	);
};
