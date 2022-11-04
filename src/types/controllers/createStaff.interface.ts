export default interface CreateStaffInterface {
	id?: string;
	staff_name: string;
	role: string;
	phone_number: number;
	email: string;
	password: string;
	emailValidationKey: string;
}
