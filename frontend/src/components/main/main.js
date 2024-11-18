import { useState } from 'react';
import styled from './main.module.css';

export const Main = () => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [comment, setComment] = useState('');

	const handlerSubmit = (e) => {
		e.preventDefault();

		fetch('http//localhost:3005', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, phone, comment }),
		});
	};

	return (
		<div className={styled.main}>
			<h1>Запись к врачу</h1>
			<form onSubmit={handlerSubmit} className={styled.form}>
				<label>ФИО</label>
				<input
					value={name}
					type="text"
					onChange={({ target }) => setName(target.value)}
				/>
				<label>Номер телефона</label>
				<input
					value={phone}
					type="tel"
					onChange={({ target }) => setPhone(target.value)}
				/>
				<label>Опишите вашу проблему</label>
				<textarea
					value={comment}
					onChange={({ target }) => setComment(target.value)}
				/>
				<button type="submit">Отправить</button>
			</form>
		</div>
	);
};
