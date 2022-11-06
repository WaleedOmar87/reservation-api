import { NextFunction, Request, Response } from "express";
import { Reservation } from "@/models/index";
import { ResponseInterface, ErrorInterface } from "@/types/index";
import { log } from "@/utils/logger";

// Get all reservations
export const getAllReservations = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let reservations = await Reservation.findAll();
		if (!reservations || reservations.length < 1) {
			response = {
				message: "No Reservations Were Found",
				code: 400,
				success: true,
			};
		} else {
			response = {
				data: reservations,
				message: "Found Reservations",
				code: 200,
			};
		}
	} catch (error: ErrorInterface | any) {
		response = {
			message: `Error: ${error.message}`,
			code: 500,
			success: false,
		};
	}
	res.status(response.code).json(response);
	next();
};

// Get reservation
export const getReservationByID = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		const { id } = req.params;
		const reservation = await Reservation.findByPK(id);
		if (!reservation) {
			response = {
				message: "Reservation Not Found",
				success: false,
				code: 400,
			};
		} else {
			response = {
				data: reservation,
				message: "Reservation were found",
				code: 200,
				success: true,
			};
		}
	} catch (error: ErrorInterface | any) {
		log.error(error);
		response = {
			message: `Error: ${error.message}`,
			success: false,
			code: 500,
		};
	}
	res.status(response.code).json(response);
	next();
};

// Create reservation
export const createReservation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let { body } = req;
		let reservation = await Reservation.create({
			...body,
		});

		if (!reservation) {
			response = {
				message: "Error Creating Reservation",
				code: 500,
				success: false,
			};
		} else {
			response = {
				message: "Reservation Created Successfully",
				success: true,
				code: 200,
			};
		}
	} catch (error: ErrorInterface | any) {
		response = {
			message: `Error: ${error.message}`,
			success: true,
			code: 500,
		};
	}
	res.status(response.code).json(response);
	next();
};

// Update reservation
export const updateReservation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let { body } = req;
		let reservation = await Reservation.findByPk(body.id);
		if (!reservation) {
			response = {
				message: "Reservation Not Found",
				code: 400,
				success: false,
			};
		} else {
			await reservation.update({ ...body });
			await reservation.save();
			response = {
				message: "Reservation Updated Successfully",
				code: 200,
				success: true,
			};
		}
	} catch (error: ErrorInterface | any) {
		response = {
			message: `Failed To Update Reservation ${error.message}`,
			code: 500,
			success: false,
		};
	}
	res.status(response.code).json(response);
	next();
};

// Delete Reservation
export const deleteReservation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;

	try {
		let { body } = req;
		let reservation = await Reservation.findByPk(body.id);
		if (!reservation) {
			response = {
				message: "Reservation Not Found",
				success: false,
				code: 400,
			};
		} else {
			await reservation.destroy();
			response = {
				message: "Reservation Deleted Successfully",
				code: 200,
				success: true,
			};
		}
	} catch (error: ErrorInterface | any) {
		response = {
			message: `Error: ${error.message}`,
			code: 500,
			success: false,
		};
	}
	res.status(response.code).json(response);
	next();
};
