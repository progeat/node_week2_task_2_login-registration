export const formatPhoneNumber = (value) => {
	if (!value) return value;

	console.log('до', value);

	const onlyDigits = value.replace(/\D/g, '');

	console.log('после', onlyDigits);

	// Применяем формат маски +7 (XXX) XXX-XX-XX
	let formattedValue = '';
	if (onlyDigits.length > 0) {
		formattedValue += '+7 ';
	}
	if (onlyDigits.length > 1) {
		formattedValue += '(' + onlyDigits.substring(0, 3) + ') ';
	}
	if (onlyDigits.length >= 3) {
		formattedValue += onlyDigits.substring(3, 6) + '-';
	}
	if (onlyDigits.length >= 6) {
		formattedValue += onlyDigits.substring(6, 8) + '-';
	}
	if (onlyDigits.length >= 8) {
		formattedValue += onlyDigits.substring(8, 10);
	}

	console.log('formated', formattedValue);
	return formattedValue;
};
