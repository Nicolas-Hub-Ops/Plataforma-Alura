const chalk = require('chalk');
const readFileFS = require('./index')
const validateURLs = require('./https')

const path = process.argv;

async function processText(pathfile) {
        const results = await readFileFS(pathfile[2]);
        if(path[3] === 'validate') {
            console.log(chalk.magenta.underline.italic('Lista de links validados: '),await validateURLs(results))
        } else {
            console.log(chalk.magenta.underline.italic('Lista de links: '), results)
        }
}

processText(path);