const express = require('express')
const routes = require('./routes')

const app = express()
const port = 4000

routes(app)

app.listen(port, () => {
    console.log(`servidor está rodando na porta ${port}`)
    console.log(`http://localhost:${port}`)
})


module.exports = app