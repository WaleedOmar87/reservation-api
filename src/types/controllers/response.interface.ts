export interface ResponseInterface {
	message?: string;
	data?: string[] | object[];
	success?: boolean;
	code: number;
}
