const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services {
    constructor() {
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }
    
    async pegaRegistrosAtivos( where = {} ) {
        return database[this.modelName].findAll( { where: { ...where } } )
    }

    async pegaTodosRegistros( where = {} ) {
        return database[this.modelName].scope('todos').findAll( { where: { ...where } } )
    }

    async cancelaPessoas(estudanteId) {
        return database.sequelize.transaction( async transacao => {
            await super.atualizaRegistro( { ativo: false }, estudanteId, { transaction: transacao } )
            await this.matriculas.atualizaRegistro( { status: 'cancelado' }, { estudante_id: estudanteId }, { transaction : transacao } )
        } )
    }
}

module.exports = PessoasServices;