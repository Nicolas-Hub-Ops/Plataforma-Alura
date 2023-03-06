# Evoluindo a API criada

  

Neste tópico iremos evoluir a API que criamos no curso passado, algumas regras que serão aplicadas para evoluirmos nossa API serão os seguintes requisitos:

<ol>

<li>OK - O cliente não gostaria que registros importantes do sistema, como as Pessoas, sejam apagados definitivamente do banco de dados.</li>&nbsp;

<li>OK - Para deixar a interface mais limpa, o cliente gostaria que na lista de Pessoas, por padrão, fossem exibidos somente os usuários ativos.</li>&nbsp;

<li>OK - Foram percebidas algumas falhas de validação dos formulários por parte do front-end, o que resultou em dados de email inválidos no banco. É desejável que essa validação não seja responsabilidade exclusiva do front.</li>&nbsp;

<li>OK - É importante poder consultar todas as matrículas confirmadas referentes a estudante X de forma rápida.</li>&nbsp;

<li>OK - O cliente gostaria de poder consultar as turmas abertas por intervalo de data, para não receber informações desnecessárias (como turmas antigas).</li>&nbsp;

<li>OK -  O cliente quer poder consultar as matrículas por turma e saber quais delas estão lotadas, para organizar melhor as matrículas.</li>&nbsp;

<li>OK - O cliente gostaria que, uma vez que o cadastro de um estudante fosse desativado, todas as matrículas relativas a este estudante automaticamente passassem a constar como “canceladas”.</li>

</ol>

  

&nbsp;  &nbsp;

  

### Fazendo update da versão do projeto:

		Rota: /api/models/index.js
---
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)

&nbsp;  &nbsp;
# Exclusão suave sem deletar
### Usando Paranoid true: 
> Para iniciarmos com a exclusão suave teremos que adicionar o método do sequelize chamado `paranoid: true` que informará que neste projeto terá um modelo de exclusão sem deletar definitivamente, aplicaremos este método antes de `Pessoas.associate` em cada modelo.

		Rota: api/models/Pessoas.js
---

		const  Pessoas = sequelize.define('Pessoas', {
		...
		}, {
			paranoid:  true
		})
		Pessoas.associate = function(models) {...}
---
---
		Rota: api/models/Turmas.js
---

		const Turmas = sequelize.define('Turmas', {
		...
		}, {
			paranoid: true
		})
		Turmas.associate = function(models) {...}
---
---
		Rota: api/models/Niveis.js
---

		const Niveis = sequelize.define('Niveis', {
		...
		}, {
			paranoid: true
		})
		Niveis.associate = function(models) {...}
---
---
		Rota: api/models/Matriculas.js
---

		const  Matriculas = sequelize.define('Matriculas', {
		...
		}, {
			paranoid: true
		})
		Matriculas.associate = function(models) {...}
---

		
&nbsp;
### Criando tabela deletedAt:
> Essa tabela será usada para registros que forem excluídos, isso significa que todas as pessoas que forem excluídas irão para esta tabela, impedindo assim que ocorra a exclusão definitiva. 
> Padrão usado na criação do arquivo foi: `AAAAMMDDHHMMSS-addcolumn-tabela.js`

  

		Rota: /api/migrations/20220520185197-addcolumn-pessoas.js
---
		'use strict'

		module.exports = {

			up: (queryInterface, Sequelize) => {
				return queryInterface.addColumn('Pessoas', 'deletedAt', {
					allowNull: true,
					type: Sequelize.DATE
				})
			},
			down: (queryInterface) => {
				return queryInterface.removeColumn('Pessoas', 'deletedAt')
			}
		}

----
---
		Rota: /api/migrations/...-addcolumn-niveis.js
---
		  
		'use strict'

		module.exports = {
			up: (queryInterface, Sequelize) => {
				return queryInterface.addColumn('Niveis', 'deletedAt', {
					allowNull: true,
					type: Sequelize.DATE
				})
			}, down: (queryInterface) => {
				return queryInterface.removeColumn('Pessoas', 'deletedAt')
			}
		}

  
---
---

		Rota: /api/migrations/...-addcolumn-turmas.js

---
		'use strict'

		module.exports = {
			up: (queryInterface, Sequelize) => {
				return queryInterface.addColumn('Turmas', 'deletedAt', {
				allowNull: true,
				type: Sequelize.DATE
			})
			}, down: (queryInterface) => {
				return queryInterface.removeColumn('Turmas', 'deletedAt')
			}
		}

---
---
  

		Rota: /api/migrations/...-addcolumn-matriculas.js
---
		  
		'use strict'

		module.exports = {
			up: (queryInterface, Sequelize) => {
				return queryInterface.addColumn('Matriculas', 'deletedAt', {
				allowNull: true,
				type: Sequelize.DATE
			})
			}, down: (queryInterface) => {
				return queryInterface.removeColumn('Matriculas', 'deletedAt')
			}
		}

>Agora para criar as novas tabelas basta rodas as migrações usando `npx sequelize-cli db:migrate`
  
&nbsp;
### Restaurando registros ocultados:
> Para restaurar registros usaremos o mesmo formação de função, porém usaremos desta ver o `.restore` para restauras os registros que foram ocultados.

  

		Rota: /api/controllers/PessoaControl.js
---
		...

		static async restauraPessoa(req, res) {
			const { id } = req.params
			try {
				await database.Pessoas.restore( { where: { id: Number(id) } } )
				return res.status(200).json({ mensagem: `id: ${id} restaurado` })
			}
			catch(error) {
				return res.status(500).json(error.message)
			}
		}

		...

---
---
  

		Rota: /api/controllers/PessoaControl.js
---
		...
		static async restauraMatricula(req, res) {
			const { estudanteId, matriculaId } = req.params
			try {
				await database.Matriculas.restore( { where: { id: Number(matriculaId), estudante_id: Number(estudanteId) } } )
				return res.status(200).json({mensagem: `Matrícula com ID: ${matriculaId} foi restaurado com sucesso`})
			}
			catch(error) {
				return res.status(500).json(error.message)
			}
		}

		...

---
---
 

		Rota: /api/controllers/NivelControl.js
---
		...

		static async restauraNivel(req, res) {
			const { id } = req.params
			try {
				await database.Niveis.restore( {where: { id: Number(id) } } )
				return res.status(200).json( {memsagem: `Nivel de Id: ${id} foi restaurado com sucesso`} )
			}
			catch(error) {
				return res.status(500).json(error.message)
			}
		}

		...
---
---
---

  

		Rota: /api/controllers/TurmaControl.js
---
		...

		static async restauraTurma(req, res) {
			const { id } = req.params
			try {
				await database.Turmas.restore( { where: { id: Number(id) } } )
				return res.status(200).json( { mensagem: `Turma de id: ${id} foi restaurado com sucesso` } )
			}
			catch(error) {
				return res.status(500).json(error.message)
			}
		}

		...

  
&nbsp;
### Usando rotas de restaurar:
> Apenas usaremos as novas rotas criadas no tópico passado.

  

		Rota: /api/routes/pessoaRoute.js
---
		...
		.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
		...

---
---
  

		Rota: /api/routes/pessoaRoute.js
---
		...
		.post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', PessoaController.restauraMatricula)
		...

---
---
		Rota: /api/routes/niveisRoute.js
---		
		...
		.post('/niveis/:id/restaura', NivelController.restauraNivel)
		...

---
---

		Rota: /api/routes/turmasRoute.js
---
		...
		.post('/turmas/:id/restaura', TurmaController.restauraTurma)
		...

  

> Primeiro requisito finalizado, agora podemos apagar os dados sem excluir definitivamente do banco de dados, e podemos ainda restaurar os dados que foram excluídos, e tudo que fizemos pode ser testado no Postman.

  
&nbsp;
&nbsp;
# Listando apenas usuários ativos

### Usando o Defalut Scope:
> Para o próximo requisito teremos que permitir a visibilidade de apenas as pessoas que estão ativas dentro do banco de dados por meio de uso de escopo padrão `default scope`, assim especificaremos ele no modelo de Pessoas, colocaremos também uma segunda alternativa caso o cliente queira listar todos da tabela sem exceções.

		Rota: /api/models/Pessoas.js
---
		const  Pessoas = sequelize.define('Pessoas', {
			...
		}, {
			paranoid:  true,
			defaultScope: {
				where: { ativo:  true }
			},
			scopes: {
				todos: { where: {} }
			}
		})
&nbsp;
### Aplicando a função de listagem:
> Agora, por padrão a API listará apenas usuários que possuem o valor `ativo: true`, porém ativaremos neste tópico para a listagem geral de todos os elementos do banco sem exceção.

		Rota: api/controller/PessoaControler.js
---
		class  PessoaController {
			  
			static  async  pegaPessoasAtivas(req, res){
				try {
					const  pessoasAtivas = await  database.Pessoas.findAll()
					return  res.status(200).json(pessoasAtivas)
				} catch (error) {
					return  res.status(500).json(error.message)
				}
			}
			  
			static  async  pegaTodasAsPessoas(req, res){
				try {
					const  todasAsPessoas = await  database.Pessoas.scope('todos').findAll()
					return  res.status(200).json(todasAsPessoas)
				} catch (error) {
					return  res.status(500).json(error.message)
				}
			}
		...}
&nbsp;
### Atualizando rotas:

		Rota: api/routes/pessoasRoute.js
---
		router
			.get('/pessoas', PessoaController.pegaPessoasAtivas)
			.get('/pessoas/todas', PessoaController.pegaTodasAsPessoas)
&nbsp;
&nbsp;
# Validações
### Validando com Sequelize:
> As validações podem ser realizadas a partir do uso de JavaScript ou por meio de atributos pré-determinadas, como é o nosso caso, aqui usaremos validação por meio de atributos pré-determinadas do sequelize. Podemos encontrar elas na [documentação](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#per-attribute-validations).

		Rota: api/models/Pessoas.js
---
		const  Pessoas = sequelize.define('Pessoas', {
			nome: type:  DataTypes.STRING,
			ativo:  DataTypes.BOOLEAN,
			email: {
				type:  DataTypes.STRING,
				validate: {
					isEmail: {
						args:  true,
						msg:  'Dado do tipo E-mail está inválida'
					}
				}
			},
			role:  DataTypes.STRING
	},
	...
	
	
&nbsp;
### Validação customizada:
> Usaremos para validar o dado do tipo nome por meio de JavaScript

		Rota: api/models/Pessoas.js
---
		nome: {
				type:  DataTypes.STRING,
				validate: {
					validaName:  function(data) {
						if(data.length <= 3) throw  new  Error('O campo nome deve apresentar mais de 3 letras.')
					}
				}
			},
		ativo:  DataTypes.BOOLEAN,
		email: {
			type:  DataTypes.STRING,
			validate: {
				isEmail: {
					args:  true,
					msg:  'Dado do tipo E-mail está inválida'
				}
			}
		},
		role:  DataTypes.STRING
	},
	...
&nbsp;
&nbsp;
			
# Listando matriculas de um estudante
### Funçao pega matriculas sem escopo de associação:
> Para isso, iremos criar uma funçao que pegue o Id do estudante, e como resposta traga todas as matriculas referentes a esse estudante.

		Rota: api/controllers/PessoaController.js
---
		class  PessoaController {
		...
			static async pegaMatriculaEstudante(req, res) {
				const { estudanteId } = req.params
				try {
					const  matricula = await  database.Matriculas.findAll({ where: { estudante_id:  Number(estudanteId) }})
					return  res.status(200).json(matricula)
				} catch (error) {
					return  res.status(500).json(error.message)
				}
			}
		}
&nbsp;
### Inserindo um escopo de associação:
> A partir de agora usaremos um escopo de associação para auxiiliar neste requisito, os [escopos de associação](https://sequelize.org/docs/v6/advanced-association-concepts/association-scopes/) possuem o mesmo princípio dos escopos de modelo, porém são aplicados nas associação do projeto

		Rota: api/models/pessoas.js
---
		...
		Pessoas.associate = function(models) {
			...
			Pessoas.hasMany(models.Matriculas, {
				foreignKey:  'estudante_id',
				scope: { status:  'confirmado' },
				as:  'aulasMatriculas'
			})
  
		}
&nbsp;
### Modificando a função pega matricula:
> Aqui alteraremos parte a `const` para podermos usar o escopo que adicionamos nas associações do tópico anterior.

		Rota: api/controllers/PessoaController.js
---
		class  PessoaController {
		...
			static async pegaMatriculaEstudante(req, res) {
				const { estudanteId } = req.params
				try {
					const pessoa = await database.Pessoas.findOne( { where: { id: Number( estudanteId ) } } ) 
					const matricula = await pessoa.getAulasMatriculadas()
					return  res.status(200).json(matricula)
				} catch (error) {
					return  res.status(500).json(error.message)
				}
			}
		}
&nbsp;
### Criando nova rota:
		Rota: api/routes/pessoasRoute.js
---
		router
			.get('/pessoas/:estudanteId/matricula', PessoaController.pegaMatriculaEstudante)

&nbsp;
&nbsp;

# Turmas abertas por intervalo de datas
### Operadores:
> Operadores são recursos que ajudam na validação de dado, os principais usados são `<  <=`, `>  >=`, `=`, neste caso usaremos este recurso para ajudar a validar os dados caso o cliente queira ou não especificar a data. Na documentação do sequelize temos alguns exemplos de [operadores](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators).

		Rota: api/controller/TurmaController.js
---
		const  Sequelize = require('sequelize')
		const  Op = Sequelize.Op


&nbsp;
### Usando operadores:
> Aqui atualizamos a função `pegaTodasAsTurmas` para estar apto a buscar com e sem filtro a partir de uma query especificada.

		Rota: api/controller/TurmaController.js
---
		class  TurmaController {
			static  async  pegaTodasAsTurmas(req, res){
				const { data_inicial, data_final } = req.query
				const  where = {}
				
				data_inicial || data_final ? where.data_inicio = {} : null		
				data_inicial ? where.data_inicio[Op.gte] = data_inicial : null 	// if(data_inicial){data_inicio >= data_inicial}
				data_final ? where.data_inicio[Op.lte] = data_final : null		// if(data_inicial){data_inicio <= data_final}
				
				try {
					const  todasAsTurmas = await  database.Turmas.findAll({ where })
					return  res.status(200).json(todasAsTurmas)
				} catch (error) {
					return  res.status(500).json(error.message)
				}
			}
			...
		}

&nbsp;
### Testando operadores:
> Para testar basta fazer um `GET` com uma query especificando a `data_inicial` e `data_final`, realizando assim a filtragem das turmas. Outro teste importante é realizar apenas um `GET` sem query, para observar se ambos estão funcionando.

		http://localhost:4000/turmas?data_inicial=AAAA-MM-DD&data_final=AAAA-MM-DD


&nbsp;
# Consulta de matriculas por turmas

### Função agregadora:
> Criamos uma função que será responsavel por listar todas as matriculas de uma turma dentro do controlador

		Rota: api/controller/PessoaController.js
---
		static  async  pegaMatriculaTurmas(req, res) {
			const { turmaId } = req.params
			try {
			const todasMatriculas = await database.Matriculas.findAndCountAll({
				where: {
					turma_id:  Number(turmaId),
					status:  'confirmado'
				},
				limit: 20,
				order: [['estudante_id', 'ASC']]
			})
				return  res.status(200).json(todasMatriculas)
			} catch (error) {
				return  res.status(500).json(error.message)
			}
		}
&nbsp;

### Adicionando nova rota: 
		 Rota: api/router/pessoaRoute.js
---
		router
			.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.pegaMatriculaTurmas)
			
			
&nbsp;	
&nbsp;
# Verifica lotação de turmas
### Criando a função com agregadores:

		Rota: api/controllers/PessoaController.js
---
		static async pegaTurmasLotadas(req, res) {
			const  lotacao = 2
			try {
				const  verificaLotacao = await  database.Matriculas.findAndCountAll({
					where: {
						status:  'confirmado'
					},
					attributes: ['turma_id'],
					group: ['turma_id']
				})
				return  res.status(200).json(verificaLotacao)
			} catch (error) {
				return  res.status(500).json(error.message)
			}
		}		
&nbsp;
### Adicionando função do Sequelize: 
> Adicionaremos uma função para validar a lotação das turmas do banco de dados, mas para isso usaremos Sequelize puro usando o `Sequelize.literal`, para isso importamos o sequelize e adicionamos a função dentro de `pegaTurmasLotadas`

		Rota: api/controllers/PessoaController.js
---
		const Sequelize = require('sequelize')
--- 
		
		static async pegaTurmasLotadas(req, res) {
			const  lotacao = 2
			try {
				const  verificaLotacao = await  database.Matriculas.findAndCountAll({
				where: {
					status:  'confirmado'
				},
				attributes: ['turma_id'],
				group: ['turma_id'],
				having:  Sequelize.literal(`count(turma_id) >= ${lotacao}`)
			})
				return  res.status(200).json(verificaLotacao)
			} catch (error) {
				return  res.status(500).json(error.message)
			}
		}
---
---
		Rota: api/routes/pessoaRoute.js
---
		router
			.get('/pessoas/matricula/lotacao', PessoaController.pegaTurmasLotadas)
	
&nbsp;
&nbsp; 	
# Cancela matrículas de estudantes
### Operação em dois modelos:
> Finalizando agora os requisitos do cliente, iremos criar um método responsável por quando a coluna de Pessoas `ativo` for passada de `true` para `false`, na tabela Matrículas, as matriculas referentes a este estudante seja passadas para o valor `cancelado`.

		Rota: api/controller/PessoaController.js
---

		static  async  cancelaPessoa(req, res) {
			const { estudanteId } = req.params
			try {
				await  database.Pessoas.update( { ativo:  false }, { where: { id:  Number(estudanteId) } } )
				await  database.Matriculas.update( { status:  'cancelado' }, { where: { estudande_id:  Number(estudanteId) } } )
				return  res.status(200).json( {message:  `Matriculas ref. estudante ${estudanteId} canceladas.`} )
			} catch (error) {
				return  res.status(500).json(error.message)
			}
		}
---
---
		Rota: api/routes/pessoaRoute.js
---
		router
			.post('/pessoas/:estudanteId/cancelamento', PessoaController.cancelaPessoa)
&nbsp; 	
&nbsp; 	

# Aprendendo transações
### Adicionando uma transação em uma função: 
> [Transações](https://sequelize.org/docs/v6/other-topics/transactions/) servem para garantir integridade em operações que acessa mais de uma tabela, tal como as que acabamos de criar. Vamos adicionar uma transação na função `cancelaPessoa`, que é uma das funções que faz relação entre duas tabelas

		Rota: api/controller/PessoasController.js
---

		static  async  cancelaPessoa(req, res) {
			const { estudanteId } = req.params
			try {
				database.sequelize.transaction(async  transacao  => {
					await  database.Pessoas.update( { ativo:  false }, { where: { id:  Number(estudanteId) } }, { transaction:  transacao })
					await  database.Matriculas.update( { status:  'cancelado' }, { where: { estudante_id:  Number(estudanteId) } }, { transaction:  transacao } )
					return  res.status(200).json( {message:  `Matriculas ref. estudante ${estudanteId} canceladas.`} )
				})
			} catch (error) {
				return  res.status(500).json(error.message)
			}
		}
&nbsp;
&nbsp;
# Versionamento
### Correção:
> Dentro de `/api/config/config.json` temos o item `"operatorsAliases": false`. Para que o terminal fique mais limpo, sem exibição de Warnings, podemos deletar esta linha, já que ela será descontinuada. Assim podemos observar que no terminal não aponta mais nenhum erro.

&nbsp;
&nbsp;

# Organização do projeto
### Criando serviços:
> Os serviços são arquivos que auxiliam na execução dos controladores, facilitando assim para que não tenha muito código nos controllers, tirando a parte da conexão com o banco de dados.

> Para começarmos a criar os serviços, vamos adicionar dentro da pasta `api` uma nova pasta chamada `services`

> Dentro da pasta services, criamos um arquivo chamado `Services.js`

		Rota: api/services/Services.js
---
		const  database = require('../models')
  
		class  Services {
			constructor(modelName) {
				this.modelName = modelName
			}
		}
		  
		module.exports = Services;

&nbsp;
### Criando um serviço universal:
> Um serviço universal é um serviço utilizado em diversos controllers, podendo fazer parte tanto do `PessoaController`, quanto do `NiveisController`. A função que criaremos estará relacionada a pegar todos os registros disponíveis no banco de dados.

		Rota: api/services/Services.js
---
		const  database = require('../models')

		class  Services {
			constructor(modelName) {
				this.modelName = modelName
			}
	  
			async  pegaTodosRegistros() {
				return  database[this.modelName].findAll()
			}

		module.exports = Services;

> Para que possamos utilizar este serviço em `PessoaController.js` precisaremos importar o arquivo e em seguida usa-lo em uma função teste.

> Usaremos como teste as duas funções do tipo `GET`, no qual consiste em buscar pessoas ativas, e todas as pessoas, tirando a parte responsável por fazer ligação com o banco de dados e adicionando apenas o Service.

		Rota: api/controller/PessoaController.js
---
		const database = require('../models')
		const Sequelize = require('sequelize')
		const Services = require('../services/Services')
		const  pessoasServices = new Services('Pessoas')
  
		class  PessoaController {  
		
			static  async  pegaPessoasAtivas(req, res){
				try {
					const  pessoasAtivas = await  pessoasServices.pegaTodosRegistros()
					return  res.status(200).json(pessoasAtivas)
				} catch (error) {
					return  res.status(500).json(error.message)
				}
			}
		...
		}
> Após a mudança o código deve continuar realizando a função sem erro nenhum

&nbsp;
### Aprofundando nos Services:
> Agora veremos como realizar serviços exclusivos de um controller, como é o caso da requisição com filtragem por escopo realizado no controller Pessoas.

> Para realizar isso, vamos criar um arquivo para o controller de Pessoas dentro da pasta services chamado `...Services.js`.

		Rota: api/services/PessoasServices.js
---
		const  Services = require('./Services')

		class PessoasServices extends Services {
			constructor() {
				super('Pessoas')
			}
		} 

  

		module.exports = PessoasServices;

---
---
		Rota: api/services/MatriculasServices.js
---
		const  Services = require('./Services')
		  
		class  MatriculasServices  extends  Services {
			constructor() {
				super('Matriculas')
			}
		}
		  
		module.exports = MatriculasServices;

---
---
		Rota: api/services/NiveisServices.js
---
		const  Services = require('./Services')

		class NiveisServices extends Services {
			constructor() {
				super('Niveis')
			}
		} 

  

		module.exports = NiveisServices;
	
---
---
		
		Rota: api/services/TurmasServices.js
---
		const  Services = require('./Services')

		class TurmasServices extends Services {
			constructor() {
				super('Turmas')
			}
		} 

  

		module.exports = TurmasServices;



> Para usarmos esses arquivos de seus respectivos controllers, vamos criar um arquivo de entrada para todos estes serviços chamado de `index.js`

		Rota: api/services/index.js
---

		const  PessoasServices = require('./PessoasServices')
		const  MatriculasServices = require('./MatriculasServices')
		const  NiveisServices = require('./NiveisServices')
		const  TurmasServices = require('./TurmasServices')
		  
		module.exports = {
			PessoasServices :  PessoasServices,
			MatriculasServices : MatriculasServices,
			NiveisServices :  NiveisServices,
			TurmasServices :  TurmasServices
		}
> Atualizamos os controllers sobre as mudanças feitas dentro dos serviços

		Rota: api/controller/PessoaController.js

		const database = require('../models')
		const Sequelize = require('sequelize')
		const { PessoasServices } = require('../services')
		const  pessoasServices = new PessoasServices()
  
		class  PessoaController {  
				...
		}


### Usando métodos exclusivos:
> Para aprender a usar este modelos de método, usaremos as funções `pegaPessoasAtivas` e `pegaTodasAsPessoas` para dar exemplos de como usaremos os métodos exclusivos.

		Rota: api/services/PessoasServices.js
---

		const  Services = require('./Services')
		const  database = require('../models')
		  
		class  PessoasServices  extends  Services {
			constructor() {
				super('Pessoas')
				this.matriculas = new  Services('Matriculas')
			}
			
			async  pegaRegistrosAtivos( where = {} ) {
				return  database[this.modelName].findAll( { where: { ...where } } )
			}
			  
			async  pegaTodosRegistros( where = {} ) {
				return  database[this.modelName].scope('todos').findAll( { where: { ...where } } )
			}
		}
		  
		module.exports = PessoasServices;
---
---

		Rota: api/controller/PessoaController.js
---
		class  PessoaController {
		  
			static  async  pegaPessoasAtivas(req, res){
				try {
					const  pessoasAtivas = await  pessoasServices.pegaRegistrosAtivos()
					return  res.status(200).json(pessoasAtivas)
				} catch (error) {
					return  res.status(500).json(error.message)
				}
			}
			  
			static  async  pegaTodasAsPessoas(req, res){
				try {
					const  todasAsPessoas = await  pessoasServices.pegaTodosRegistros()
					return  res.status(200).json(todasAsPessoas)
				} catch (error) {
					return  res.status(500).json(error.message)
				}
			}
		}
> Falta somente alterar as rotas que foram invertidas com a atualização

		Rota: api/routes/pessoasRoute.js
---

		router
			.get('/pessoas', PessoaController.pegaTodasAsPessoas)
			.get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
			
### Implementando mais funções:
> Para este tópico, implementaremos a função `cancelaPessoa` para adicionar mais atividade dentro dos services.
> 
		Rota: api/services/PessoasServices.js
---

		class  PessoasServices  extends  Services {
			constructor() {
				super('Pessoas')
				this.matriculas = new  Services('Matriculas')
			}
			...
			async  cancelaPessoas(estudanteId) {
				return  database.sequelize.transaction( async  transacao  => {
					await  super.atualizaRegistro( { ativo:  false }, estudanteId, { transaction:  transacao } )
					await  this.matriculas.atualizaRegistro( { status:  'cancelado' }, { estudante_id:  estudanteId }, { transaction :  transacao } )
				})
			}
		}
---
---
		Rota: api/controller/PessoaController.js
---

		const { PessoasServices } = require('../services')
		const  pessoasServices = new  PessoasServices()
  
		class  PessoaController {
			...
	
			static  async  cancelaPessoa(req, res) {
				const { estudanteId } = req.params
				try {
					await  pessoasServices.cancelaPessoas(Number(estudanteId ))
					return  res.status(200).json( {message:  `Matriculas ref. estudante ${estudanteId} canceladas.`} )
				}
				catch (error) {
					return  res.status(500).json(error.message)
				}
			}
			...
		}

			