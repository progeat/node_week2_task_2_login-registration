const baseUrl = '/api';

export function request(url, method, data) {
	url = baseUrl + url;

	return fetch(url, {
		headers: {
			'content-type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	}).then((res) => {
		if (!res.ok) {
			throw Error('Ошибка запроса сервера');
		}

		return res.json();
	});
}
