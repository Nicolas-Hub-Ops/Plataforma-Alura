
const fs = require('fs')

fs.readFile('./assets/salsicha.jpg', (erro, buffer) => {
        console.log('A imagem fou buferizada')

        fs.writeFile('./assets/salsicha2.jpg', buffer, (erro) => {
            console.log('A imagem foi escrita')
        }) 
})