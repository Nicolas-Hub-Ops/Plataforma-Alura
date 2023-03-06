

import {Cliente} from "./Cliente.js";
import {ContaCorrente} from "./ContaCorrente.js";



// clientes
const cliente1 = new Cliente("Ricardo", 11122233309);
const cliente2 = new Cliente("Alice", 88822233309);

// contas
const conta1 = new ContaCorrente(cliente1, 1001);
const conta2 = new ContaCorrente(cliente2, 1002);

// operações
conta1.depositar(500);
conta1.transferir(200, conta2);

// resultado
console.log("");
    console.log(conta1);
    console.log("");
    console.log("");
    console.log(conta2);
console.log("");
console.log(ContaCorrente.numeroContas);
