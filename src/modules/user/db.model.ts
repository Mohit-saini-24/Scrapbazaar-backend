import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
	},
	password: String,
	role: String,
	mobileNumber: String,
	email: String,
	scrapCategory: Array,
	isIndustry: Boolean,
	industryDetails: {
		companyName: String,
		gstin: String,
		companyAddress: String,
	},
	address: String,
	pincode: String,
	mobileNumberVerified: Boolean,
});

export const UserModel = mongoose.model('User', UserSchema);
