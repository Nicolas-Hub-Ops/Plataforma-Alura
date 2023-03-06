import { Cliente } from "./Cliente.js";


export class ContaCorrente {

    static numeroContas = 0; 
    agencia;    

    // #saldo = 0; #cliente; https://github.com/tc39/proposal-class-fields#private-fields
    _saldo = 0;
    _cliente;

    set cliente(novoValor){
        if(novoValor instanceof Cliente){
            this._cliente = novoValor;
    
        }
    }

    get saldo(){
        return this._saldo;
    }

    constructor(cliente, agencia){
        this.agencia = agencia;
        this.cliente = cliente;
        ContaCorrente.numeroContas += 1 ;
    }


    sacar(valor) {
        if(this._saldo >= valor) {  
            this._saldo -= valor;
            return valor;
        }
        else{
            console.log("Saldo insuficiente")
        }
    }

    depositar(valor) {
        if(valor <= 0){
            return;
        }

        this._saldo += valor;
    }

    transferir(valor, conta) {
        const valorSacado = this.sacar(valor);
        conta.depositar(valorSacado);
    }
};