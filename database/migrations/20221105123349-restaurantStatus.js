"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.addColumn(
					"Restaurants",
					"status",
					{
						type: Sequelize.DataTypes.STRING,
						validate: {
							is: /private|public/g,
						},
					},
					{ transaction: t }
				),
			]);
		});
	},

	down(queryInterface, Sequelize) {},
};
