import { Link } from 'react-router-dom';
import styled from './header.module.css';

export const Header = ({ user, onLogout }) => {
	return (
		<div className={styled.header}>
			<div>
				<Link to="/" className={styled.link}>
					Создать заявку
				</Link>
				{user ? (
					<>
						<Link to="/appointments" className={styled.link}>
							Список заявок
						</Link>
						<Link to="/" className={styled.link} onClick={onLogout}>
							Выход
						</Link>
					</>
				) : (
					<Link to="/login" className={styled.link}>
						Вход
					</Link>
				)}
			</div>
		</div>
	);
};
