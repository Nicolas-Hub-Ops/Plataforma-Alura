import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes;
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
    }
    adiciona() {
        // REALIZA AS FUNÇÕES E ADICIONA NO ARRAY DO type: readonly
        const negociacao = this.criaNegociação();
        negociacao.data.setDate(12); // TESTE DE MODIFICAÇÃO DE DATA
        this.negociacoes.adiciona(negociacao);
        this.negociacoes.lista();
        console.log(this.negociacoes.lista());
        this.limparFormulario();
    }
    criaNegociação() {
        // TRANSFORMA type: string de HTMLInputElement PARA OS types especificados: Date, number, number
        const exp = /-/g;
        const date = new Date(this.inputData.value.replace(exp, ','));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);
        return new Negociacao(date, quantidade, valor);
    }
    limparFormulario() {
        // LIMPA FORMULÁRIO E DÁ FOCO AO PRIMEIRO IMPUT
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
}
