"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Staff", {
			staff_uid: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				unique: true,
			},
			staff_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			phone_number: {
				type: Sequelize.INTEGER,
				allowNull: false,
				unique: true,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			passwordResetKey: {
				type: Sequelize.string,
				allowNull: true,
			},
			email_verified: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
			},
			phone_verified: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
			},
		});
	},

	async down(queryInterface, Sequelize) {},
};
