const chalk = require('chalk');
const { Console } = require('console');
const fs = require('fs');

// BOAS VINDAS
console.log('---------------------------');
console.log('');

    console.log(chalk.yellow('Bem vindo ! ! !'));
    
console.log('');
console.log('---------------------------');
console.log('');

// READFILE COM FS

    // CÓDIGO ASSINCRONO    (async e await)

            function links(file){
                const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
                
                const results = [];
                let temp;
                while((temp = regex.exec(file)) !== null){
                    results.push({ [temp[1]] : temp[2] })
                }
                return results.length === 0 ? 'Não há links' : results;
            }


            var validate = true;
            async function readFileFS(filepath) {

                const encoding = 'utf-8';

                try {
                    const success = await fs.promises.readFile(filepath, encoding);
                    
                    return links(success);
                }
                catch(err) {
                    validate = false;
                    throw new Error(chalk.red(err.code, '\n----------------------\nEste caminho é um diretório ! ! !\n----------------------'))
                }
                finally {
                    if(validate == false){
                        console.log(chalk.red.underline.italic('\n\nNão foi possivel concluir a operação:\n\n'))
                    }else {
                        console.log(chalk.green.underline.italic('\n\nOperação concluida com sucesso ! ! !\n\n'))
                    }
                }
            }

            /* readFileFS('./arquivos/texto1.md'); */
             
            module.exports = readFileFS;


/* 
    // CÓDIGO ASSINCRONO    (.then e .catch)
         function readFileFS(filepath) {
            
            const encoding = 'utf-8';

            fs.promises.readFile(filepath, encoding)
                .then((results) => {
                    console.log(chalk.green(`----------------------\n${results}\n----------------------`))
                })
                .catch((err) => {
                    throw new Error(chalk.red(err.code, '\n----------------------\nEste caminho é um diretório ! ! !\n----------------------'))
                })
        } 





    // CÓDIGO SINCRONO
         function readFileFS(filepath) {

            const encoding = 'utf-8';
            
            fs.readFile(filepath, encoding, (err, sucess) => {
                console.log(chalk.cyan.underline.italic('RESULTS MESSAGE:\n'))
                
                if(err){
                    throw new Error(chalk.red(err.code, 'Este caminho é um diretório ! ! !\n'))
                }

                if(sucess){
                    console.log(chalk.green(`Success Accepted: ${sucess}`))
                    console.log('\n')        
                }
            })
        } 
 */

