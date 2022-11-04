import { Staff, Customer, Owner } from "@/models/index";
import { FetchUserInterface } from "@/types/index";

/* Helper function to check and validate user email */
export default async (data: FetchUserInterface) => {
	let isStaff = data.type.includes("/staff/");
	let isOwner = data.type.includes("/owner/");
	let isCustomer = data.type.includes("/customer/");
	let user;

	if (isStaff) {
		user = data.email
			? await Staff.findByPk(data.id)
			: await Staff.findOne({ email: data.email });
	}

	if (isOwner) {
		user = data.email
			? await Owner.findByPk(data.id)
			: await Owner.findOne({ email: data.email });
	}

	if (isCustomer) {
		user = data.email
			? await Customer.findByPk(data.id)
			: await Customer.findOne({ email: data.email });
	}

	return user;
};
