'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Instrumentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      caracteristica: {
        type: Sequelize.STRING
      },
      tombamento: {
        type: Sequelize.STRING
      },
      ano: {
        type: Sequelize.STRING
      },
      marca: {
        type: Sequelize.STRING
      },
      observacoes: {
        type: Sequelize.STRING
      },
      componentes: {
        type: Sequelize.STRING
      },
      empresa: {
        type: Sequelize.STRING
      },
      notaFiscal: {
        type: Sequelize.STRING
      },
      valor: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.DATE
      },
      origemDoacao: {
        type: Sequelize.STRING
      },
      observacoesDoacao: {
        type: Sequelize.STRING
      },
      arquivoNotaFiscal:{
        type: Sequelize.STRING
      },
      arquivoTermo:{
        type: Sequelize.STRING
      },
      arquivoExtra:{
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Instrumentos');
  }
};