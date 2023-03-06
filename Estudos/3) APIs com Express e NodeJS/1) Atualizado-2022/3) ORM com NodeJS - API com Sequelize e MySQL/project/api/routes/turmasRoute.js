const { Router } = require('express')
const TurmaController = require('../controllers/TurmaControl')

const router = Router()
router
    .get('/turmas', TurmaController.listAll)
    .get('/turmas/:id', TurmaController.listId)
    .post('/turmas', TurmaController.create)
    .put('/turmas/:id', TurmaController.update)
    .delete('/turmas/:id', TurmaController.deleta)

module.exports = router