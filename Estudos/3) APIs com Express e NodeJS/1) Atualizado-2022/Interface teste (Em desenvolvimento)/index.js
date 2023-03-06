//const create = require("./scale");


function create(lista) {  
  
  const img = () => {
    //const ul = document.querySelector('#model-create')
    const img = document.createElement('img')

    const initialIMG = img;
    initialIMG.src = "https://www.planetcarsz.com/assets/uploads/2020/03/AUDI%20R8%20SPYDER%20V10%20PERFORMANCE%20BY%20WHEELSANDMORE%202020%2003.jpg"
    //const addLi = li.appendChild(initialIMG);
    //ul.appendChild(addLi);
    return initialIMG;
  }

  const fabricante = () => {
      const strong = document.createElement('strong')
      const p = document.createElement('p')
      const a = document.createElement('a')

      p.textContent = ""
      strong.textContent = "Fabricante: "
      a.textContent = lista.fabricante

      p.appendChild(strong);
      p.appendChild(a);

      return p;
  }

  const modelo = () => {
      const li = document.querySelector('#model-create')
      const strong = document.createElement('strong')
      const paragraph = document.createElement('p')
      const a = document.createElement('a')

      const modelo = strong;
      const linha = paragraph;
      const values = a;

      modelo.textContent = "Modelo: "
      values.textContent = lista.modelo
      
      linha.appendChild(modelo)
      linha.appendChild(values)
      //li.appendChild(linha)
      
      return linha;
  }

  const quilometers = () => {
      const li = document.querySelector('#model-create')
      const strong = document.createElement('strong')
      const paragraph = document.createElement('p')
      const a = document.createElement('a')

      const kms = strong;
      const linha = paragraph;
      const values = a;

      kms.textContent = "Km: "
      values.textContent = lista.info.quilometragem
      
      linha.appendChild(kms)
      linha.appendChild(values)
      //li.appendChild(linha)
      
      return linha;
  }

  const years = () => {
      const li = document.querySelector('#model-create')
      const strong = document.createElement('strong')
      const paragraph = document.createElement('p')
      const a = document.createElement('a')

      const year = strong;
      const linha = paragraph;
      const values = a;

      year.textContent = "Ano: "
      values.textContent = lista.info.ano
      
      linha.appendChild(year)
      linha.appendChild(values)
      //li.appendChild(linha)
      
      return linha;
  };

  const price = () => {
      const li = document.querySelector('#model-create')
      const strong = document.createElement('strong')
      const paragraph = document.createElement('p')
      const a = document.createElement('a')

      const preco = strong;
      const linha = paragraph;
      const values = a;

      preco.textContent = "Preço: "
      values.textContent = `R$ ${lista.info.preco}`
      
      linha.appendChild(preco)
      linha.appendChild(values)
      //li.appendChild(linha)
      
      return linha;
  };

  const addBtn = (a) => {
      const put = () => {
          const button = document.createElement('button')
          const btnPut = button;
          btnPut.className = 'put'
          btnPut.addEventListener('click', function(event) {
            event.preventDefault();
            alert('Requisição para alterar')          
          }) 
          return btnPut      
      }

      const del = () => {        
          const button = document.createElement('button')
          const btnDel = button;
          btnDel.className = 'delete'
          btnDel.addEventListener('click', function(event) {
            event.preventDefault();
            alert('Requisição para deletar')          
          }) 
          return btnDel
        }

        if(a === 'put') { return put() }
        if(a === 'del') { return del() }
  };

  const ul = document.getElementById('model-create');
  const li = document.createElement('li');

  
  li.appendChild(img());
  li.appendChild(fabricante());
  li.appendChild(modelo());
  li.appendChild(quilometers());
  li.appendChild(years());
  li.appendChild(price());
  li.appendChild(addBtn('put'));
  li.appendChild(addBtn('del'));
  ul.appendChild(li);

}
function connect() {
  try {
    return new Promise(( resolve, reject ) => {
      const xhr = new XMLHttpRequest();
  
      xhr.open(
        "GET",
        "https://randomuser.me/api/",
        true
      )
  
      xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
          if(xhr.status != 200){
            reject(xhr.responseText)
          }
          else {
            var resposta = this.responseText;
            var resultado = JSON.parse(resposta); 
            const lista = resultado;
            console.log(lista)

            const counter = lista.length
            for(var i = 0; i < counter; i++){
              new create(lista[i]) 
            }
          }
        }
      }
  
      xhr.send();
    })
  }
  catch(error){
    console.log(error)
  }
}

connect()



