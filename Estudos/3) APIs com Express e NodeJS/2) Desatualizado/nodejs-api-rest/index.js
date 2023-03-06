const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')

conexao.connect(erro => {
    if(erro) {
        console.log(erro)
    } else {
        console.log('------> 🗸 Conected sucessfully 🗸 ')
        
        Tabelas.init(conexao)
        
        const app = customExpress()

        app.listen(3000, () =>  console.log('------> 🗸 Server actived in port 3000 🗸 '))
    }
})
