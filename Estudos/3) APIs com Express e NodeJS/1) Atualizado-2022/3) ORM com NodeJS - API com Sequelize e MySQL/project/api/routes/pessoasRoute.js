const { Router } = require('express')
const PessoasControl = require('../controllers/PessoasControl')

const router = Router()

router
    .get('/pessoas', PessoasControl.listAll)
    .get('/pessoas/:id', PessoasControl.listId)
    .post('/pessoas', PessoasControl.create)
    .put('/pessoas/:id', PessoasControl.update)
    .delete('/pessoas/:id', PessoasControl.deleta)

    .get('/pessoas/:estudanteId/matricula/:matriculaId', PessoasControl.listOneMatricula)
    .post('/pessoas/:estudanteId/matricula', PessoasControl.createMatricula)
    .put('/pessoas/:estudanteId/matricula/:matriculaId', PessoasControl.updateMatricula)
    .delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoasControl.deletaMatricula)

module.exports = router