import bcrypt from 'bcrypt';
const saltRounds = 10;
export const passwordHash = async (password: string) => {
	const salt = await bcrypt.genSalt(saltRounds);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};
export const verifyPassword = async (password: string, hash: string) => {
	return bcrypt.compare(password, hash);
};
