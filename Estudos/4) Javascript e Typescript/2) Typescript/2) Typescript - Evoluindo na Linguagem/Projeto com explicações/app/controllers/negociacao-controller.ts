import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');


    constructor() {
        // as HTMLInputElement => Garantia de que será retornado esse tipo
        // as HTMLInputElement depois do método === <HTMLInputElement> antes do método
        // this.inputData = <HTMLInputElement>document.querySelector('#data');
        // ESSE MODELO É USADO PRA QUANDO O PROGRAMADOR ASSUME O RISCO, MAIS COMUM EM ELEMENTOS DO DOM, PORÉM HÁ UMA NECESSIDADE DE TRATAMENTO DE NULL SE O DADO VIER DE UMA API
        // VOCE PODE VER UM EXEMPLO DE TRATAMENTO DE NULL EM APP.TS

        this.inputData = document.querySelector('#data') as HTMLInputElement; 
        this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }

    public adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        )

        // APLICANDO CADASTRO SOMENTE EM DIA ÚTIL
        // GETDAY() => 0-6 ONDE 0-DOMINGO E 6-SABADO
        
        if (this.diaUtil(negociacao.data) === true) {
            this.negociacoes.adiciona(negociacao);
            this.atualizaView();
        } else {
            this.mensagemView.update('Apenas negociações em dias úteis são aceitas');
        }
        this.limparFormulario();
    }

    private diaUtil(data: Date): boolean {
        return data.getDay() > DiasDaSemana.DOMINGO 
            && data.getDay() < DiasDaSemana.SABADO;
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }
}
