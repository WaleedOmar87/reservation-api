/* Takes an object of time slots and convert it to tstzrange  */
export const formatTimeRange = (timeSlot: any[]): object[] => {
	let formattedTime: object[] = [];
	if (timeSlot.length) {
		formattedTime.push({ value: new Date(timeSlot[0]).toISOString() });
		formattedTime.push({ value: new Date(timeSlot[1]).toISOString() });
	}
	return formattedTime;
};

export const formatPriceRange = (priceRange: []): object => {
	return {};
};
