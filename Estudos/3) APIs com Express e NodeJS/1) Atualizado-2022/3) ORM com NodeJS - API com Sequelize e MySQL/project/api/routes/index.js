const bodyParser = require('body-parser')
const pessoasRoute = require('./pessoasRoute')
const niveisRoute = require('./niveisRoute')
const turmasRoute = require('./turmasRoute')

module.exports = app => {
    
    app.use(bodyParser.json())
    app.use(pessoasRoute)
    app.use(niveisRoute)
    app.use(turmasRoute)

    app.get('/', (req, res) => {
        try {
            res.status(200).send('Rotas disponíveis: /pessoas - /turmas - /niveis')
        } catch(error) {
            res.status(500).json(error.message)
        }
    })
}