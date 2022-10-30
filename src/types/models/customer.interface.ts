import { UUIDVersion } from "express-validator/src/options";
import { DataTypes } from "sequelize";
export default interface CustomerInterface {
	customer_uid?: UUIDVersion;
	customer_name?: DataTypes.StringDataType;
	customer_company?: DataTypes.StringDataType;
	zip_code?: DataTypes.IntegerDataType;
	customer_address?: DataTypes.StringDataType;
	country?: DataTypes.StringDataType;
	provenance?: DataTypes.StringDataType;
	city?: DataTypes.StringDataType;
	phone_number?: DataTypes.IntegerDataType;
	age?: DataTypes.IntegerDataType;
	email?: DataTypes.StringDataType;
	password?: DataTypes.StringDataType;
	passwordResetKey?: DataTypes.StringDataType;
	email_verified?: Boolean;
	phone_verified?: Boolean;
}
