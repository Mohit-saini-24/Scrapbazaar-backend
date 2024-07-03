import { StatusCodes, getReasonPhrase } from 'http-status-codes';

interface Error {
	statusCode: number;
	message: string;
}

export class ServiceError extends Error {
	error: Error = {
		message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
		statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
	};
	constructor(statusCode: number, message: string) {
		super(message);
		this.error.statusCode = statusCode;
		this.error.message = message;
	}
}
