

function create(lista) {  
    
    const fabricante = () => {
        const li = document.querySelector('#model-create')
        const img = document.createElement('img')
        const strong = document.createElement('strong')
        const paragraph = document.createElement('p')
        const a = document.createElement('a')
  
        const initialIMG = img;
        initialIMG.src = "https://www.planetcarsz.com/assets/uploads/2020/03/AUDI%20R8%20SPYDER%20V10%20PERFORMANCE%20BY%20WHEELSANDMORE%202020%2003.jpg"
        li.appendChild(initialIMG);
  
        const fab = strong;
        const linha = paragraph;
        const values = a;
  
        fab.textContent = "Fabricante: "
        values.textContent = lista.fabricante
        
        linha.appendChild(fab)
        linha.appendChild(values)
        li.appendChild(linha)
        
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
        li.appendChild(linha)
        
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
        li.appendChild(linha)
        
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
        li.appendChild(linha)
        
    }
  
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
        li.appendChild(linha)
        
    }
  
    const addBtn = () => {
        const put = () => {
            const li = document.querySelector('#model-create')
            const button = document.createElement('button')
  
            const btnPut = button;
            btnPut.className = 'put' 
            li.appendChild(btnPut)
        }
  
        const del = () => {
            const li = document.querySelector('#model-create')
            const button = document.createElement('button')
  
            const btnDel = button;
            btnDel.className = 'delete'
            li.appendChild(btnDel)
        
        }
        put()
        del()
    }
  
    fabricante()
    modelo()
    quilometers()
    years()
    price()
    addBtn()
  }

module.exports = { create };












function teste(lista) {

    const valoresExternos = () => {
      const p = document.createElement('p')
      const a = document.createElement('a')
      const strong = document.createElement('strong')
  
      p.textContent = "Valores são dados delo link a seguir: "
      a.textContent = lista.fabricante;
      a.href = "https://www.standvirtual.com/anuncio/chevrolet-camaro-zl1-1le-6-2-v8-extreme-track-performance-package-ID8PequF.html"
  
      strong.textContent  = "String forte"
      
      p.appendChild(strong)
      p.appendChild(a)
      
  
      return p;
    }
  
    const ul = document.getElementById('model-create');
    const li = document.createElement('li');
  
    const p = document.createElement('p');
  
    p.textContent = 'Testando 1 2 3 !!!';
  
    li.appendChild(p);
    ul.appendChild(li);
    ul.appendChild(valoresExternos());
  }