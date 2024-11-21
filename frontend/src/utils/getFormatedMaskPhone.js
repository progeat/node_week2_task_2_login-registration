export const getFormatedMaskPhone = (value) => {
	if (!value) return value;

	const numbersOnly = value.replace(/\D/g, '');

	let maskedNumber = '';
	if (numbersOnly.length > 0) {
		maskedNumber += '+7 ';
	}
	if (numbersOnly.length > 1) {
		maskedNumber += '(' + numbersOnly.substring(1, 4) + ') ';
	}
	if (numbersOnly.length >= 4) {
		maskedNumber += numbersOnly.substring(4, 7) + '-';
	}
	if (numbersOnly.length >= 7) {
		maskedNumber += numbersOnly.substring(7, 9) + '-';
	}
	if (numbersOnly.length === 11) {
		maskedNumber += numbersOnly.substring(9, 11);
	}

	return maskedNumber;
};
