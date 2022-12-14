"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.addColumn(
					"Staffs",
					"emailValidationKey",
					{
						type: Sequelize.DataTypes.STRING,
					},
					{ transaction: t }
				),
				queryInterface.addColumn(
					"Owners",
					"emailValidationKey",
					{
						type: Sequelize.DataTypes.STRING,
					},
					{ transaction: t }
				),
				queryInterface.addColumn(
					"Customers",
					"emailValidationKey",
					{
						type: Sequelize.DataTypes.STRING,
					},
					{ transaction: t }
				),
			]);
		});
	},

	down(queryInterface, Sequelize) {},
};
