import mongoose from 'mongoose';
const priceSchema = new mongoose.Schema({
	category: String,
	subCategory: String,
	yesterday: String,
	today: Date,
});
const PriceModel = mongoose.model('scrapPrices', priceSchema);
export default PriceModel;
