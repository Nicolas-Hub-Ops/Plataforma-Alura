const nascimento = 2014;
const ano = 2021;


function calculaIdade() {
    
    var felipe = ano - nascimento;
    console.log("A idade do felipe e " + felipe + " anos ");
    
    if(felipe > 5) {
        console.log("Felipe e pequeno");
    }
    else{
console.log("Felipe e feio");
    }
}

calculaIdade();