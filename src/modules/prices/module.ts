import dayjs from 'dayjs';
import logger from '../../config/logger';
export const getQuery = (category: string | undefined, date: string | undefined) => {
	const toReturn: any = {};
	if (category) {
		toReturn['category'] = category;
	}
	if (date) {
		toReturn['date'] = dayjs(date).format('DD-MMMM-YYYY');
	}
	console.log('priceQuery ', toReturn);
	return toReturn;
};
