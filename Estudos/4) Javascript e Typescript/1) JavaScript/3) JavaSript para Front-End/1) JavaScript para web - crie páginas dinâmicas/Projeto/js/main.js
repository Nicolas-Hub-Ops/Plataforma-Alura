
const listTeclas = document.querySelectorAll('.tecla');
const listSounds = document.querySelectorAll('.sounds');

console.log(listTeclas);
console.log(listSounds);

var counter = listTeclas.length;

for(var i = 0; i < counter; i++) {
    listTeclas[i].addEventListener('click', function(event) {
        listSounds[i].play();

    })
}