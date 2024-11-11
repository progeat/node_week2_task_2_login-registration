import styled from './main.module.css';

export const Main = () => {
	return (
		<div className={styled.main}>
			<h1>Запись к врачу</h1>
			<form className={styled.form}>
				<label>ФИО</label>
				<input type="text" />
				<label>Номер телефона</label>
				<input type="number" />
				<label>Опишите вашу проблему</label>
				<input type="text" />
				<button type="submit">Отправить</button>
			</form>
		</div>
	);
};
