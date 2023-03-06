# Testes Unitários e de Integração
### Porque fazer o uso de testes em projetos:
> Um dos principais motivos para incentivar o uso de testes dentro do projeto são tanto para previnir possíveis erros nos projeto ao rodarem em produção, quanto observar as entradas e saídas do programa, podendo assim fazer ajustes para uma melhora no desempenho do projeto, além de poderem aumentar a confiabilidade e usabilidade daquele sistema.

<br>

### Piramide de testes: ![Piramide de testes](https://cdn1.gnarususercontent.com.br/1/1159682/17c52031-38e7-4cfa-b20f-bda4c1cb4a03.png)

> #### Testes Unitários:
> São testes que ocorrem individualmente dentro do projeto, testes por unidade.
> - Testam frações de códigos
> - Não dependem aplicação completa
> - Verifica se a especificação de uma função, método está sendo seguida
> - Não garante uma integração de módulos

> #### Testes de Integração:
> São testes de integração do projeto e  até de dependências do programa que está sendo construído.
> - Verifica a comunicação dos módulos da aplicação
> - Realiza testes de rotas e requisições
> - Não analisa todo o fluxo da aplicação

> #### Testes tipo E2E (End to End):
> São chamados também de testes de ponta á ponta que fazem teste em um projeto inteiro.
> - Analiza fluxo completo da aplicação
> - Realiza testes longos e completos
> - Analise de todos os módulos e stacks
> - Complexa estrutura de testes

<br>

### Cultura de testes:
> Seria criar um ambiente de desenvolvimento onde a equipe de desenvolvimento tenha a capacidade de criar e gerir os testes e observar como esses testes afetam a qualidade do código e resolver os devidos problemas indicados pelos testes.

> ### Fatores fundamentais:
> - Qualidade
> - Confiança
> - Tempo

> ### Fases do Teste:
> > #### Análise de Requisitos:
> > - Analise de funcionalidades presentes no projeto
> > - Selecionar quais tipos de testes serão implementados
>
> > #### Plano de Teste:
> > - Ferramentas que serão utilizadas
> > - Divisão de responsabilidade da criação de testes
> > - Tempo, complexibilidade, gastos de recursos para o teste
> 
> > #### Caso de Teste: 
> > - Detalhamento dos testes em si
> > - Comportamento esperado, dados de entrada, dados de saida etc...
> 
> > #### Ambiente de Teste:
> > - Onde e como os testes serão implementados
> > - Fluxo de produção dos testes
> > - Ferramentas que são utilizadas no teste
> 
> > #### Implementação:
> > - Realização da documentação dos resultados
> > - Correção de roblemas que ocorreram nos processos
> > - Melhora dos códigos tanto de testes como do projeto em si

<br>

### Testes Estáticos:
> Esse projeto terá como principal funcionalidade a relação de salário com horas extras.
>
> Agora começaremos a escrever testes em um projeto inicial, para isso, em uma pasta vazia criamos um arquivo `index.js` para começar a implementação.
>
> Dentro do arquivo `index.js` 
> - Criamos uma função para calcular a soma de horas extras com o salário e retornamos o resultado dessa soma
> - Assim colocamos o resultado para ser imprimido no console
		
	const  somaHorasExtras = ( salario, valorHorasExtras ) => {
		return salario + valorHorasExtras
	}
	  
	console.log(somaHorasExtras(2000, 500))
	
> Iniciamos agora um projeto Node. Com o terminal  aberto dentro da pasta do projeto, usamos  `npm init -y` para iniciar um projeto Node.
>
> Podemos agora instalar as dependência necessárias para esse projeto

<br>

#### Eslint: 
> A primeira dependencia que vamos intalar é o Eslint:
>  - O Eslint é uma dependência que auxilia na padronização e reportagem de erros ao escrever o código, deixando assim a sintaxe do projeto padronizado, forçando o grupo de desenvolvimento a utilizar apenas aquele modelo configurado no Eslint.
>  
> - Ainda com o terminal aberto, instalaremos o Eslint com uma configuração para desenvolvimento, para isso basta escrever:
>  `npm install --save-dev eslint@8.26.0 --save-exact` no terminal.
>
> Após a instalação, iremos usar `npx eslint --init` para iniciar a configuração do eslint no nosso projeto, segue abaixo o resultado de cada configuração do eslint:
> - `To check syntax, find problems, and enforce code style`
> - `Javascript modules (import/export)`
> - `None of these`
> - `No`
> - `Node`
> - `Use popular style guide`
> -  `Airbnb`
> - `JSON`
>
> Após realizar a configuração, irá surgir um arquivo `.eslintrc.json` com o seguinte conteúdo:

	{
		"env": {
			"browser": true,
			"es2021": true
		},
		"extends": "airbnb-base",
		"overrides": [
		],
		"parserOptions": {
			"ecmaVersion": "latest",
			"sourceType": "module"
		},
		"rules": {
		}
	}

> Agora basta usar no terminal `npx eslint \.index.js` para realizar a verificação da sintaxe.

<br>

### Erros com Eslint: 
> Provavelmente se você está seguindo todos os passo a passo aplicados no projeto, o resultado do seu erro retornou algo semelhante a varios erros relacionados a esse: 

	x:y   error    Expected linebreaks to be 'LF' but found 'CRLF'
	
> Para corrigir esse erro, trata se de uma configuração no editor de texto, para isso basta olha a interface inferior do VS code e encontrará a sigla `CRLF`, basta clicar e alterar para `LF` e depois salvar.
>
> Rodando novamente com `npx eslint \.index.js` resultará nos seguintes erros:
>
> ### `error: There should be no space after this paren`
> - Trata-se de um erro relacionado ao uso de espaço entre a declaração de argumento em parenteses, para corrigir basta remover o espaço entre os parenteses e o argumento:

	const somaHorasExtras = (salario, valorHorasExtras) => {
		return  salario + valorHorasExtras
	}
	  
	console.log(somaHorasExtras(2000, 500));
	
> ### `error: Unexpected block statement surrounding arrow body; move the returned value immediately after the '=>'`
> É um erro que se caracteriza pela presença de apenas uma linha de código dentro da arrow function criada, podendo assim ser retirado as chaves `{}` e `return` já que só tem a presença de uma única linha de código, para a correção basta remover os `{}` e `return` da arrow function:

	const somaHorasExtras = (salario, valorHorasExtras) => salario + valorHorasExtras
	  
	  
	console.log(somaHorasExtras(2000, 500));

> ### ` error: More than 1 blank line not allowed`
> Tem relação com a quantidade de breaklines entre uma linha de código e outra linha de código, que no modelo `airtbnb` é somente permitido 1 linha livre entre linhas de código, então para corrigi-lo, basta retirarmos uma linha em branco resultando em:

	const somaHorasExtras = (salario, valorHorasExtras) => salario + valorHorasExtras
	  
	console.log(somaHorasExtras(2000, 500));

> ### `error: Missing semicolon`
> Um erro relacionado a falta de `;` no final das linhas de código, no caso podemos observar que ao finalizar a linha de código da arrow function, não aplicamos o `;` no final, resultando assim nesse erro:

	const somaHorasExtras = (salario, valorHorasExtras) => salario + valorHorasExtras;
	  
	console.log(somaHorasExtras(2000, 500));

> ### Dica para usuários do Visual Studio Code:
> Dentro do editor de texto VS Code, na aba de extensões, temos a extensão do Eslint que permite ajudar a observar os erros mais comuns dentro do nosso código, para que não seja necessário sempre usarmos o terminal com o método de verificação do Eslint: `npx eslint \.index.js`, mas vale lembrar que são somente erros comuns, alguns erros não são mostrados pela extensão, então é importante usarmos, também o terminal.

> ### Modificação para GitHub:
> Uma implementação importante para enviar o projeto ao GitHub é a presença de um arquivo `.gitignore` para evitar o envio de pastas indesejada como a pasta de módulos do node `node_modules`.

<br>

### Testes Unitários:
> Para realizar testes unitários, alteramos o arquivo `./index.js` para:

	const  somaHorasExtras = (salario, valorHorasExtras) =>  salario + valorHorasExtras;
	  
	const  calculaDescontos = (salario, descontos) =>  salario - descontos;
	  
	const  teste = (titulo, esperado, retornado) => {
	  if (esperado === retornado) {
		console.log(`${titulo} passou`);
	  } else {
		console.error(`${titulo} não passou`);
	  }
	};
  
	teste('somaHorasExtras', 2500, somaHorasExtras(2000, 500));
	  
	teste('calculaDesconto', 2200, calculaDescontos(2500, 300));

> Realizamos-se agora o teste de erros para verificar a sintaxe com `npx eslint \.index.js` e faz as devidas alterações para que não ocorra erros.

<br>

### Asserções:
> Asserções são tipos específicos de validação, checagem ou verificação, e podem ser tanto verdadeira quanto falsa.
> ### Exemplo:

		// Numerais
		if(2 == 2) // retorna true
		if(2 != 2) // retorna false
		
		//Strings
		if('a' == 'b') // retorna false
		if('a' != 'b') // retorna true

		// Arrays
		['banana', 'maçã', 'uva'].includes('banana') // retorna true
		['BMW', 'Ferrari', 'Lamborghini'].includes('Mercedes') // retorna false
		


> Agora que entendemos o que são asserções, alteramos o nosso código de `./index.js`, antes da arrow function `teste` adicionamos:

		const verificaSe = (valor) => {
			const assercoes = {
				ehExatamenteIgualA(esperado) {
					if(valor != esperado) {
						throw {};	
					}
				}
			};
			return assercoes;
		};

> Modificamos também a arrow function `teste` para que trabalhemos com asserções:

	const  somaHorasExtras = (salario, valorHorasExtras) =>  salario + valorHorasExtras;
	  
	const  calculaDescontos = (salario, descontos) =>  salario - descontos;
	  
	const  verifiqueSe = (valor) => {
		const  assercoes = {
			ehIgualA(esperado) {
				if (valor !== esperado) {
					// eslint-disable-next-line no-throw-literal
					throw {};
				}
			},
		};
		return  assercoes;
	};
	  
	const  teste = (titulo, funcaoTeste) => {
		try {
			funcaoTeste();
			console.log(`${titulo} passou!`);
		} catch {
			console.error(`${titulo} não passou!`);
		}
	};
	  
	teste('somaHorasExtras', () => {
		const  esperado = 2500;
		const  retornado = somaHorasExtras(2000, 500);
	  
		verifiqueSe(retornado).ehIgualA(esperado);
	});
	  
	teste('calculaDesconto', () => {
		const  esperado = 2300;
		const  retornado = calculaDescontos(2500, 200);
	  
		verifiqueSe(retornado).ehIgualA(esperado);
	});

> Basta agora organizar os erros de Eslint e rodar no terminal, `node ./index.js` e será verificado que todos os códigos passaram pelo teste.
>
> Porém há um problema. seria muito demorado implementar diversas asserções dentro de um projeto muito grande, por conta dessa dificuldade iremos aprender a usar o Jest, que já possui diversas asserções prontas.

<br>

### Usando o Jest:
> Jest é um framework utilizado para teste, tanto para Node quando para navegador, esse framework nos ajudará a realizar diversos testes dentro da nossa aplicação
>
> Para instalar o Jest, basta ir no terminal, dentro da pasta do projeto e usar:
`npm install --save-exact jest@28.1.0 --save-dev`
>
> Configuramos agora um teste em `package.json` na parte de `scripts` que terá um script chamado `test`, alteramos o valor desse argumento para `"jest"` e ainda, antes das ultimas chaves acrescentamos `"type": "module"`

	{
		"name": "Projeto",
		"version": "1.0.0",
		"description": "",
		"main": "index.js",
		"scripts": {
			"test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
		},
		"keywords": [],
		"author": "",
		"license": "ISC",
		"devDependencies": {
			"eslint": "^8.26.0",
			"eslint-config-airbnb-base": "^15.0.0",
			"eslint-plugin-import": "^2.26.0",
			"jest": "28.1.0"
		},
		"type": "module"
	}

<br>

### Criando testes com Jest:
> Para criarmos testes com Jest, o padrão usado pelo framework para identificar arquivos de testes são o padrão de arquivos `.test.js`, e como boa prática, colocamos esses arquivos dentro de uma pasta `test` para a organização da aplicação. Criamos uma pasta `test` e dentro dela criamos um arquivo `folhaPagamento.test.js`.
>
> Agora alteramos o arquivo `index.js` para que possamos usar as função de calculos nos arquivos de test, para isso excluímos todas as funções relacionadas a testes e exportamos as funções `somaHorasExtras` e `calculaDescontos`:

	const  somaHorasExtras = (salario, valorHorasExtras) =>  salario + valorHorasExtras;
	  
	const  calculaDescontos = (salario, descontos) =>  salario - descontos;
	  
	export {
		somaHorasExtras,
		calculaDescontos,
	};

<br>

> Voltamos agora para o arquivo de test, `./test/folhaPagamento.test.js`
> 
> Nele importamos as funções exportadas em `index.js`:

	import { somaHorasExtras, calculaDescontos } from  '../index.js';

<br>

> Em seguida criamos um teste para somar as horas extras com o valor `experado` e `retornado` e depois verificando com `expect` e `.toBe`:
	
	import { somaHorasExtras, calculaDescontos } from  '../index.js';
	
	test('Deve retornar a soma das horas extras', () => {
		const  esperado = 2500;
		const  retornado = somaHorasExtras(2000, 500);

		expect(retornado).toBe(esperado);
	});

<br>

> Agora criamos um teste para calcular os descontos, seguindo o mesmo princípio de soma de horas extras: 

	import { somaHorasExtras, calculaDescontos } from  '../index.js';

	test('Deve retornar a soma das horas extras', () => {
		const  esperado = 2500;
		const  retornado = somaHorasExtras(2000, 500);
		  
		expect(retornado).toBe(esperado);
	});
	  
	test('Deve descontar o valor do salário', () => {
		const  esperado = 2300;
		const  retornado = calculaDescontos(2500, 200);
		  
		expect(retornado).toBe(esperado);
	});
	
<br>
	
> Não esqueça de sempre arrumar o arquivo de acordo com os requisitos do Eslint.

<br>

> Agora no terminal rodamos `npm run test` para rodar os testes, como resultado será:

		Test Suites: 1 passed, 1 total
		Tests:       2 passed, 2 total
		Snapshots:   0 total
		Time:        1.276 s

### Relatórios: 
> Primeiro vamos refatorar nosso código de teste para adicionar as tags `describe` e `it` para uma melhora do entendimento do teste: 

	import { somaHorasExtras, calculaDescontos } from  '../index.js';
	  
	describe('Testes dos cálculos de folha', () => {
		it('Deve retornar a soma das horas extras', () => {
			const  esperado = 2500;
			const  retornado = somaHorasExtras(2000, 500);
			  
			expect(retornado).toBe(esperado);
		});
		  
		it('Deve descontar o valor do salário', () => {
			const  esperado = 2300;
			const  retornado = calculaDescontos(2500, 200);
			  
			expect(retornado).toBe(esperado);
		});
	});

<br>
> Em `package.json` adicionamos varios tipos de testes, com diferentes tipos de relatórios de respostas do nosso teste:

	{
		"name": "Projeto",
		"version": "1.0.0",
		"description": "",
		"main": "index.js",
		"scripts": {
			"test:code": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
			"test:watch": "node --experimental-vm-modules node_modules/jest/bin/jest.js --watch",
			"test:coverage": "node --experimental-vm-modules node_modules/jest/bin/jest.js --watch --coverage"
		},
		"keywords": [],
		"author": "",
		"license": "ISC",
		"devDependencies": {
			"eslint": "^8.26.0",
			"eslint-config-airbnb-base": "^15.0.0",
			"eslint-plugin-import": "^2.26.0",
			"jest": "28.1.0"
		},
		"type": "module"
	}

<br>

> Basta agora realizar os testes no terminal usando: 
> `npm run test:code`
> `npm run test:watch`
> `npm run test:coverage`

### Testes em projetos maiores: 
> Primeiramente, iremos baixar um novo projeto que corresponde a adicionar produtos em um carrinho, essa aplicação pode ser adiquirida clicando no [link](https://github.com/alura-cursos/2495_node_testes/tree/aula-3-pre).
>
> Após a intalação da aplicação no seu computador,  fazemos o download de todas as dependencias do projeto:
		
	npm install

> ### Leia os arquivos de `carrinho` para entender o que será!!!

> Vamos implementar um teste para validar se todos os componentes de `item.js` estão se comportando da maneira esperada, assim dentro da pasta `carrinho` criamos outra pasta chamada `test`, e dentro dessa pasta criaremos um arquivo chamado `item.test.js`.
>
> Agora importamos `Item.js` para o arquivo de teste e implementamos o primeiro teste com `describe` e `it` para verificar se todos os campos de `item` estão sendo corretamente especificados:

	import  Item  from  "../item";
	  
	describe('Teste dos itens', () => {
		it('Deve ter 3 campos: nome, valor, quantidade', () => {
			const  item = new  Item('Beterraba', 2.5, 10);
			  
			expect(item.nome).toBe('Beterraba');
			expect(item.valor).toBe(2.5);
			expect(item.quantidade).toBe(10);
		});
	});

<br>

> Rodando no terminal `npm run test` resultará em uma resposta positiva, no qual o parametro passou.

	Test Suites: 1 passed, 1 total
	Tests:       1 passed, 1 total
	Snapshots:   0 total
	Time:        2.46 s

<br>

> Agora verificamos se o calculo total de valor por quantidade está sendo feita da maneira correta, para isso usamos outro `it` para fazer essa validação: 

	import  Item  from  "../item";
	  
	describe('Teste dos itens', () => {
		it('Deve ter 3 campos: nome, valor, quantidade', () => {
			const  item = new  Item('Beterraba', 2.5, 10);
			  
			expect(item.nome).toBe('Beterraba');
			expect(item.valor).toBe(2.5);
			expect(item.quantidade).toBe(10);
		});
		  
		it('Deve ter o preço calculado de acordo com a quantidade', () => {
			const  item = new  Item('Batata', 0.1, 3);
			  
			expect(item.pegaValorTotalItem()).toBeCloseTo(0.3);
		});
	});

<br>

> Rodando novamente os testes irá resultar em `PASS` com verificação positiva.

	Test Suites: 1 passed, 1 total
	Tests:       2 passed, 2 total
	Snapshots:   0 total
	Time:        2.822 s

