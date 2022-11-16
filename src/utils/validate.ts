/*
	Validate a given json object ,
	To check if the required fields are included and valid
*/
export const validateJsonField = (
	objectElement: {},
	requiredFields: string[]
): Error | Boolean => {
	let isValid: Boolean = true;
	let invalidFields: string[] = [];
	for (let item in objectElement) {
		if (requiredFields.includes(item) && item !== "") {
			isValid = false;
			invalidFields.push(item);
		}
	}
	if (!isValid) {
		throw new Error(
			`Validation Failed: ${invalidFields.join(",")} are not valid`
		);
	}
	return isValid;
};
