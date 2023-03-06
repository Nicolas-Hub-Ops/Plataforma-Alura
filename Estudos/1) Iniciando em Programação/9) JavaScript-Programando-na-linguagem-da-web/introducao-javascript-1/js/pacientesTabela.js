





// P A C I E N T E S

var pacientes = document.querySelectorAll(".paciente");



// C A L C U L O  P A C I E N T E S  T A B E L A

for (var i = 0; i < pacientes.length; i++) {

    var paciente = pacientes[i];

    var tdPeso = paciente.querySelector(".info-peso");
    var peso = tdPeso.textContent;

    var tdAltura = paciente.querySelector(".info-altura");
    var altura = tdAltura.textContent;

    var tdImc = paciente.querySelector(".info-imc");

    var pesoEhValido = true;
    var alturaEhValida = true;




// V A L I D A Ç Ã O 

  if (peso <= 0 || peso >= 1000) {
        console.log("Peso inválido!");
        pesoEhValido = false;
        tdImc.textContent = "Peso inválido";
   		paciente.classList.add("pacienteInválido");}

  if (altura <= 0 || altura >= 3.00) {
        console.log("Altura inválida!");
        alturaEhValida = false;
        tdImc.textContent = "Altura inválida";
    	paciente.classList.add("pacienteInválido");}

  if (alturaEhValida && pesoEhValido) {
        var imc = calculaImc(peso, altura);
        tdImc.textContent = imc;
        tdImc.textContent = imc;}};



function calculaImc(peso, altura){
		var imc = 0;

		imc = peso / (altura * altura);

		return imc.toFixed(2); 
};


