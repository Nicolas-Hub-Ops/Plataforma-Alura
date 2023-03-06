
//  Idades de pessoa

const idade = 18;

const acompanhada = false;

//  Listas de Viagens

const listaDeDestinos = new Array(
    `Rio de Janeiro`,
    `Espirito Santo`,
    `Paraná`,
    `Rio Grande do Sul`,
    `Santa Catarina`,
    `Alagoas`,
    `Rio Grande do Norte`
);


//  Validação de Vendas para as Pessoas

if(idade >= 18) {

    if(acompanhada == true) {
        console.log("  ")
        console.log("Nossa lista de viagens tem acesso a diversos estado como:")
        console.log(listaDeDestinos);
        console.log("  ");
    }

    else{
        console.log("  ");
        console.log("Não podemos vender pacotes para menores de idade.");
        console.log("  ");
}}



































