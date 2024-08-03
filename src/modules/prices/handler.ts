import { FromSchema } from 'json-schema-to-ts';
import { PriceQuery } from './price.types';
import { getQuery } from './module';
import PriceModel from './db.model';

export const priceQueryHandler = async (query: FromSchema<typeof PriceQuery>) => {
	const { category, date } = query;
	const searchQuery = getQuery(category, date);
	const fetchData = await PriceModel.aggregate([
		{
			$match: searchQuery,
		},
		{
			$group: {
				_id: '$category',
				data: { $push: '$$ROOT' },
			},
		},
	]);
	return {
		data: fetchData,
	};
};
