import { Main } from './components';

export const App = () => {
	return (
		<div className="App">
			<header className="App-header">
				<div>
					<button>Создать заявку</button>
					<button>Список заявок</button>
					<button>Вход</button>
				</div>
			</header>
			<Main />
		</div>
	);
};
