const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router
  .get('/pessoas', PessoaController.pegaTodasAsPessoas)
  .get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
  .get('/pessoas/:id', PessoaController.pegaUmaPessoa)
  .get('/pessoas/:estudanteId/matricula', PessoaController.pegaMatriculaEstudante)
  .get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.pegaMatriculaTurmas)
  .get('/pessoas/matricula/lotacao', PessoaController.pegaTurmasLotadas)
  .get('/pessoas/:estudanteId/matricula/:matriculaId',  PessoaController.pegaUmaMatricula)
  .get('/pessoas/matriculas/:estudanteId', PessoaController.pegaMatriculaEstudante)
  
  .post('/pessoas', PessoaController.criaPessoa)
  .post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
  .post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)
  .post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', PessoaController.restauraMatricula)
  .post('/pessoas/:estudanteId/cancelamento', PessoaController.cancelaPessoa)


  .put('/pessoas/:id', PessoaController.atualizaPessoa)
  .put('/pessoas/:estudanteId/matricula/:matriculaId',  PessoaController.atualizaMatricula)


  .delete('/pessoas/:id', PessoaController.apagaPessoa)
  .delete('/pessoas/:estudanteId/matricula/:matriculaId',  PessoaController.apagaMatricula)

module.exports = router