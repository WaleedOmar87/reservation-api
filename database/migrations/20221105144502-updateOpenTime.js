"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.changeColumn(
					"Restaurants",
					"open_time",
					{
						type: Sequelize.DataTypes.RANGE(Sequelize.DataTypes.DATEONLY),
						allowNull: false
					},
					{ transaction: t }
				),
			]);
		});
	},

	down(queryInterface, Sequelize) {},
};
