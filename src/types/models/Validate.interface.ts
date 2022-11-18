export interface OrderDetailsInterface {
	total_price: number;
	special_request: string;
}
export interface OrderItemsInterface {
	dish_id: string;
	dish_title: string;
	dish_description: string;
}
export interface PreviewImagesInterface {
	id: string;
	url: string;
	title: string;
}
export interface AvailableSeatsInterface {
	id: string;
	title: string;
	description: string;
	additional_price: number;
}
export interface DishInterface {
	id: string;
	title: string;
	description: string;
	price: number;
}
export interface SeatInterface {
	id: string;
	title: string;
	description: string;
	additional_fee: number;
}
export interface OtherInformationInterface {
	title: string;
	description?: string;
	icon?: string;
}
export interface TablesInterface extends OtherInformationInterface {
	id: string;
	seats: number;
}
export interface ReservationTimeSlotInterface {
	time_slot: object[] | string[];
}
