export class Negociacoes {
    constructor() {
        //   PODE USAR: Array<Negociacao> OU Negociacao[]
        this.negociacoes = [];
    }
    adiciona(negociacao) {
        this.negociacoes.push(negociacao);
    }
    // PODE USAR: ReadonlyArray<Negociacao> OU readonly Negociacao[]
    // PERMITE APENAS LEITURA SEM MODIFICAÇÃO (READONLY)
    lista() {
        return this.negociacoes;
    }
}
