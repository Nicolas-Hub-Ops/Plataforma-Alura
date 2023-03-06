const database = require('../models')

class Services {
    constructor(modelName) {
        this.modelName = modelName
    }

    async pegaTodosRegistros() {
        return database[this.modelName].findAll()
    }

    async pegaUmRegistro(id) {

    }

    async atualizaRegistro(a, id, transacao = {}) {
        return database[this.modelName]
            .update(a, { where: { id: id } }, transacao)
    }

    async atualizaRegistro(a, where, transacao = {}) {
        return database[this.modelName]
            .update(a, { where: { ...where } }, transacao)
    }
    
} 

module.exports = Services;