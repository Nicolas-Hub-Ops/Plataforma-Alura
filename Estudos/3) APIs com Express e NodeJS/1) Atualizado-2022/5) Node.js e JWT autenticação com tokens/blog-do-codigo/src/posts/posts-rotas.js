const postsControlador = require('./posts-controlador');
const passport = require('passport');
const { middleAutenticacao, middlewaresAutenticacao } = require('../usuarios');

module.exports = app => {
  app
    .route('/post')
    .get(postsControlador.lista)
    .post(
      middlewaresAutenticacao.bearer,
      postsControlador.adiciona);
};
