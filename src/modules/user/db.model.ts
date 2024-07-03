import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
	},
	password: String,
	role: String,
});

export const UserModel = mongoose.model('User', UserSchema);
