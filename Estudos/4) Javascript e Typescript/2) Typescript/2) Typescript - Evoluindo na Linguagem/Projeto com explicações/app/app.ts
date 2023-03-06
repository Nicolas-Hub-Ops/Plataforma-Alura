import { NegociacaoController } from './controllers/negociacao-controller.js';

const controller = new NegociacaoController();
const form = document.querySelector('.form');
// ESSE AQUI É UM EXEMPLO DE TRATAMENTO DE NULL, CASO EXISTE E CASO SEJA NULO
if(form) {
    // CASO O FORM EXISTA
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.adiciona();
    });
} else {
    // CASO O FORM SEJA NULL
    throw Error('Não foi possível iniciar a aplicação. Verifique se o form existe.')
}