/* Takes an object of time slots and convert it to tstzrange  */
export default (timeSlot: object[]) => {
	const updatedTime = [
		{
			value: timeSlot[0],
		},
		{
			value: timeSlot[1],
		},
	];
	return updatedTime;
};
