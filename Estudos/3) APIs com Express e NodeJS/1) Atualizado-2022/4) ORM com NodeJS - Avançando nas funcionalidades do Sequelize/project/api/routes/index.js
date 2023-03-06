const bodyParser = require('body-parser')
 
const pessoas = require('./pessoasRoute')
const niveis = require('./niveisRoute')
const turmas = require('./turmasRoute')

module.exports = app => {
  app.use(
    bodyParser.json(),
    pessoas,
    niveis,
    turmas
  )

  app.get('/', (req, res) => {
    try {
        res.status(200).send('Rotas disponíveis: /pessoas - /pessoas/id - /pessoas/id/matriculas/id - /turmas - /niveis')
    } catch(error) {
        res.status(500).json(error.message)
    }
})
}
