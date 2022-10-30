import { UUIDVersion } from "express-validator/src/options";
import { IntegerDataType, StringDataType } from "sequelize";
export default interface StaffInterface {
	staff_uid: UUIDVersion;
	staff_name: StringDataType;
	role: StringDataType;
	phone_number: IntegerDataType;
	email: StringDataType;
	password: StringDataType;
	passwordResetKey: StringDataType;
	email_verified: boolean;
	phone_verified: boolean;
}
