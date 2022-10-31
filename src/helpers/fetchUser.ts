import { Staff, Customer, Owner } from "@/models/index";
import { FetchUserInterface } from "@/types/index";

/* Helper function to check and validate user email */
export default async (data: FetchUserInterface) => {
	let isStaff = data.type.includes("/staff/");
	let isOwner = data.type.includes("/owner/");
	let isCustomer = data.type.includes("/customer/");
	let response: { success: boolean; message: string } = {
		success: false,
		message: "",
	};
	let user;

	if (isStaff) {
		user = await Staff.findByPk(data.id);
	}

	if (isOwner) {
		user = await Owner.findByPk(data.id);
	}

	if (isCustomer) {
		user = await Customer.findByPk(data.id);
	}

	if (user == null) {
		response.success = false;
		response.message = "Invalid Or Non Existing User";
	}

	if (user && user.emailValidationKey === data.validationKey) {
		response.success = true;
		response.message = "Verified";
	} else {
		response.success = false;
		response.message = "Invalid Or Expired Verification Code";
	}

	return [user, response];
};
