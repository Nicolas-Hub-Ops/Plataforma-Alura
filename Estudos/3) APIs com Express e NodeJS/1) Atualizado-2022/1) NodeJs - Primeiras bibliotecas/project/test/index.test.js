const readFileFS = require('../index');

const arrayResult = [
  {
    FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
  }
]

describe('readFileFS::', () => {
  it('deve ser uma função', () => {
    expect(typeof readFileFS).toBe('function');
  })
  it('deve retornar array com resultados', async () => {
    const resultado = await readFileFS('D:\Nicolas-Silva\Cursos\Alura\Pasta-Cursos\Nodejs-APIs\Atualizado-2022\NodeJs - Primeiras bibliotecas\NodeJS Criando sua primeira biblioteca\project\test\arquivos\texto1.md') 
    expect(resultado).toEqual(arrayResult)
  })
  it('deve retornar mensagem "não há links"', async () => {
    const resultado = await readFileFS('D:\Nicolas-Silva\Cursos\Alura\Pasta-Cursos\Nodejs-APIs\Atualizado-2022\NodeJs - Primeiras bibliotecas\NodeJS Criando sua primeira biblioteca\project\test\arquivos\texto2..md')
    expect(resultado).toBe('não há links');
  })
  it('deve lançar um erro na falta de arquivo', () => {
    async function capturaErro() {
      await readFileFS('D:\Nicolas-Silva\Cursos\Alura\Pasta-Cursos\Nodejs-APIs\Atualizado-2022\NodeJs - Primeiras bibliotecas\NodeJS Criando sua primeira biblioteca\project\test\arquivos')
      expect(capturaErro).toThrowError(/não há arquivo no caminho/)
    }
  })
})
