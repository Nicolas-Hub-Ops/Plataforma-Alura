export class Negociacao {
    // TROCANDO ISSO:
    //        private date: Date,
    //        private quantidade: number,
    //        private valor: number
    // POR ISSO:
    constructor(_data, quantidade, valor) {
        this._data = _data;
        this.quantidade = quantidade;
        this.valor = valor;
    }
    get volume() {
        return this.quantidade * this.valor;
    }
    get data() {
        // IMPEDE A MODIFICAÇÃO DE DATA CRINDO UMA NOVA INSTANCIA DE DATA
        const data = new Date(this._data.getTime());
        return data;
    }
}
