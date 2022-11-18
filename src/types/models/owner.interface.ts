import { UUIDVersion } from "express-validator/src/options";
import { DataTypes , UUIDV4 } from "sequelize";
export interface OwnerInterface {
	owner_uid: typeof UUIDV4;
	owner_name: DataTypes.StringDataType;
	owner_address: DataTypes.StringDataType;
	phone_number: DataTypes.StringDataType;
	email: DataTypes.StringDataType;
	password: DataTypes.StringDataType;
	passwordResetKey: DataTypes.StringDataType;
	email_verified: boolean;
	phone_verified: boolean;
}
