console.log(`\nTrabalhando com Loops`);

// Lista de Passagens

const listaDeDestinos = new Array(
    `Brasília`,             //[0]
    `Santa Catarina`,       //[1]
    `Rio Grande do Sul`,    //[2]
    `Espírito Santo`,       //[3]
    `São Paulo`,            //[4]
    `Bahia`,                //[5]
    `Ceará`,                //[6]
    `Alagoas`               //[7]
);





// Dados da Pessoa

const idadeComprador = 18;
const estaAcompanhado = false;
const destino = "Brasília";
let temPassagemComprada = false;





//Apresentação dos Dados
console.log("\n Destinos Possíveis:")
console.log(listaDeDestinos);





// Validação da Pessoa

const podeComprar = idadeComprador >= 18 || estaAcompanhado == true;   

if (podeComprar) {
    temPassagemComprada = true;
}
else {
    console.log("Não podemos vender passagem para menor de idade.");    
    temPassagemComprada = false;
}



  

// Validação da Passagem

let contador = 0;
let destinoExiste = false;

for(let cont = 0 ; cont < 3 ; cont++) {
    if(listaDeDestinos[contador] == destino) {
        console.log("Temos esse destino disponível");
        destinoExiste = true; 
        break;
    }    

}

console.log("Destino  existe: ", destinoExiste);

if(podeComprar && destinoExiste) {
    console.log("boa viagem!!!");
}
else{
    console.log("Desculpe, tivemos um erro!!!");
}



/*          O FOR PODE SUBSTITUIDO PELO WHILE


while(contador < 3) {
    if(listaDeDestinos[contador] == destino) {
        console.log("Temos esse destino disponível");
        destinoExiste = true; 
        break;
    }    
    contador += 1;
}
*/





