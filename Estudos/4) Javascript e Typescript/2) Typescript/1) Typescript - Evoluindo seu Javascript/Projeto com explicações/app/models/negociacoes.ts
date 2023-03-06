import { Negociacao } from "./negociacao.js";

export class Negociacoes {
    //   PODE USAR: Array<Negociacao> OU Negociacao[]
    private negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao);
    }

    // PODE USAR: ReadonlyArray<Negociacao> OU readonly Negociacao[]
    // PERMITE APENAS LEITURA SEM MODIFICAÇÃO (READONLY)
    lista(): ReadonlyArray<Negociacao> {
        return this.negociacoes;
    }
}