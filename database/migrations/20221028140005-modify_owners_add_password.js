"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Owners", "password", {
			type: Sequelize.STRING
		});
	},

	async down(queryInterface, Sequelize) {},
};
