import styled from './header.module.css';

export const Header = () => {
	return (
		<div className={styled.header}>
			<div>
				<button className={styled.btn}>Создать заявку</button>
				<button className={styled.btn}>Список заявок</button>
				<button className={styled.btn}>Вход</button>
			</div>
		</div>
	);
};
