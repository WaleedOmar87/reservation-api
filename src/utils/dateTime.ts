import { OpenTimeInterface } from "@/types/index";
export const createOpenTime = (timeSlot: OpenTimeInterface) => {
	let date = new Date();
	const range = [
		new Date(
			Date.UTC(
				date.getFullYear(),
				date.getUTCMonth(),
				date.getDate(),
				timeSlot.openTime.getHours(),
				timeSlot.openTime.getMinutes()
			)
		),
		new Date(
			Date.UTC(
				date.getFullYear(),
				date.getUTCMonth(),
				date.getDate(),
				timeSlot.closeTime.getHours(),
				timeSlot.closeTime.getMinutes()
			)
		),
	];
	return range;
};
