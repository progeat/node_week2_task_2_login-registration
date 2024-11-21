import { useEffect, useRef, useState } from 'react';
import { formatPhoneNumber } from './utils';

export const usePhoneMask = () => {
	const [value, setValue] = useState('');
	const previousValue = useRef('');

	// useEffect(() => {
	// 	if (previousValue.current !== value) {
	// 		const nextValue = formatPhoneNumber(value);
	// 		previousValue.current = nextValue;
	// 		setValue(nextValue);
	// 	}
	// }, [value]);

	const getFormatedPhoneMask = (inValue) => {
		previousValue.current = inValue;
		setValue(inValue);
		console.log('inValue', inValue);

		const nextValue = formatPhoneNumber(previousValue.current);
		previousValue.current = nextValue;
		setValue(nextValue);

		// console.log('val', value);
		return previousValue.current;
	};

	return { getFormatedPhoneMask };
};
