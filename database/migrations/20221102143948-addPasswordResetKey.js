"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.addColumn(
					"Owners",
					"passwordResetKey",
					{
						type: Sequelize.DataTypes.STRING,
					},
					{ transaction: t }
				),
				queryInterface.addColumn(
					"Customers",
					"passwordResetKey",
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
