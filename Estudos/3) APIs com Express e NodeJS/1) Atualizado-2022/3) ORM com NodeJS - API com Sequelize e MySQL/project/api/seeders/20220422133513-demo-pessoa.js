
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pessoas', [
      {
        nome: "Andreza Sousa",
        ativo: true,
        email: "andrezaportugues@gmail.com",
        role: "professora",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Maria Eduarda",
        ativo: true,
        email: "mahdudu1705@gmail.com",
        role: "estudante",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Rafaela Silva",
        ativo: true,
        email: "rafa2022silva@gmail.com",
        role: "estudante",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Enzo Rodrigues",
        ativo: true,
        email: "enzorodrigues123@gmail.com",
        role: "estudante",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Matheus Carvalho",
        ativo: true,
        email: "teuteucarvalho@gmail.com",
        role: "estudante",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Myllena Rafaelli",
        ativo: true,
        email: "myrafaelli@gmail.com",
        role: "estudante",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Kleuber Ferraz",
        ativo: true,
        email: "kleubeisaac@gmail.com",
        role: "professor",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Luiz Felipe",
        ativo: true,
        email: "luizinpippino@gmail.com",
        role: "estudante",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Guilherme Santos",
        ativo: true,
        email: "guiguisantos@gmail.com",
        role: "professor",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Willian Sousa",
        ativo: true,
        email: "willsousa@gmail.com",
        role: "estudante",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pessoas', null, {})
  }
}