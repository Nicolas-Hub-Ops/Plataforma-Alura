export class Negociacao {
// TROCANDO ISSO:
//        private date: Date,
//        private quantidade: number,
//        private valor: number

// POR ISSO:
    constructor(
        private readonly _data: Date, 
        public readonly quantidade: number, 
        public readonly valor: number) {}

    get volume(): number {
        return this.quantidade * this.valor
    }

    get data() : Date {
        // IMPEDE A MODIFICAÇÃO DE DATA CRINDO UMA NOVA INSTANCIA DE DATA
        const data = new Date(this._data.getTime());
        return data;
    }
}
