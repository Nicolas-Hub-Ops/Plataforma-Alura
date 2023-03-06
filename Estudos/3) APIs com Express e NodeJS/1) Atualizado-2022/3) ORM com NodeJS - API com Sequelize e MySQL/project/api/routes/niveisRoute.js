const { Router } = require('express')
const NivelController = require('../controllers/NiveisControl')

const router = Router()
router
    .get('/niveis', NivelController.listAll)
    .get('/niveis/:id', NivelController.listId)
    .post('/niveis', NivelController.create)
    .put('/niveis/:id', NivelController.update)
    .delete('/niveis/:id', NivelController.deleta)

module.exports = router