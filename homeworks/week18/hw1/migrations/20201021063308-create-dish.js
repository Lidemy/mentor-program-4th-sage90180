/* eslint-disable no-unused-vars */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Dishes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      sell: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      delete: {
        type: Sequelize.STRING,
      },
      TypeId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Dishes');
  },
};
