import { Link } from 'react-router-dom';
import styled from './header.module.css';

export const Header = () => {
	return (
		<div className={styled.header}>
			<div>
				<Link to="/" className={styled.link}>
					Создать заявку
				</Link>
				<Link to="/appointments" className={styled.link}>
					Список заявок
				</Link>
				<Link to="/login" className={styled.link}>
					Вход
				</Link>
			</div>
		</div>
	);
};
