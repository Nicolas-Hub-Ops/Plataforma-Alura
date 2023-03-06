# Criação da API

Nesse tutorial vamos criar uma API que segue a imagem abaixo:
![enter image description here](https://caelum-online-public.s3.amazonaws.com/351+-+ORM+com+NodeJS+-+API+com+Sequelize+e+MySQL/aula1-v%C3%ADdeo4-imagem1.png)

Nosso objetivo é criar uma API para uma suposta escola de inglês, nela terá diversas tabelas que serão relacionadas umas com as outras, como está mostrando na imagem. Usaremos o banco de dados MySQL-cli, Sequelize e NodeJS.


- > Iniciamos um projeto Node com o comando `npm init -y`

&nbsp;
&nbsp;
&nbsp;
### Primeira etapa de instalação de dependências:
- > Express para subir nossa API `npm install express`

- > Body Parser para converter o corpo de requisições `npm install body-parser`

- > Nodemon para atualizar automaticamente a API `npm install nodemon --save-dev`

&nbsp;
&nbsp;
&nbsp;
### Iniciando a API:
- > Dentro da pasta raiz, criamos a pasta API para ter uma melhor organização dos arquivos
- > Dentro da pasta API criamos um arquivo `index.js` para subir a API
- > Na configuração importamos `Express` e `Body-Parser`
- > Em seguida criamos uma constante App que estará usando o Express
- > Colocamos o `App` para usar o `Body-Parser` no modelo `.json`
- > Escrevemos outra `const` para especificar a porta da API
- > Com a `App` criamos uma função `get` que retornara uma mensagem da API
- > Iniciamos o `App` para ouvir na porta especificada e retornar uma mensagem no console
- > E por fim exportamos o App
##### Resultado:

		rota: /index.js
		_____________________________________________


        const  express  =  require('express')
        const  bodyParser  =  require('body-parser')
        
        const  app  =  express()
       
	    app.use(bodyParser.json())
	    
	    const  port  =  3000
    
	    app.get('/', (req, res) => {
		    res.status(200)
			   .send({ mensagem: 'Bem vindo a api' })
	    })
    
	    app.listen(port, () => {
		    console.log(`Servidor rodando na porta ${port}`)
	    })
	     
	    module.exports  =  app;


### Configuração do nodemon:
- > Dentro da `package.json` criamos um novo script para iniciar nossa API
- > Passamos um nome ao script e adicionamos o nodemon para iniciar a API
- > Colocamos em seguida o caminho do arquivo que rodará a API
##### Resultado:
		rota: /package.json
	    _____________________________________________
	    
	    ...
	    "scripts": {
		    "dev": "nodemon ./api/index.js",
		    ...
	    },
	    ...
&nbsp;
&nbsp;
&nbsp;
### Rodando a API:
- > Dentro de um terminal, navegue para a pasta raiz do projeto
- > Em seguida subimos a API usando `npm run dev`
&nbsp;
&nbsp;
&nbsp;
### Segunda etapa de instalação de dependências:
- > Usaremos o banco MySQL então o instalamos `npm install mysql2@2.1.0`
- > Neste projeto vamos usar o ORM sequelize, logo baixaremos:
	⤷ Sequelize  `npm install sequelize@5.21.7`
	⤷ Sequelize-cli `npm install sequelize-cli@5.5.1`
	⤷ Path `npm install path@0.12.7`
	
&nbsp;
&nbsp;
&nbsp;
### Sequelize Command Line Interface (CLI)
- > Dentro da pasta api, iniciaremos o sequelize-cli pelo terminal usando `npx sequelize-cli init`
- > Com o sequelize-cli iniciado serão criados as pastas config, migrations, models e seeders
- > A pasta `models` contém todos os modelos criados
- > A pasta `config` que mostrará como o CLI irá se conectar ao banco de dados
- > A pasta `migrations` armazenará todos os arquivos de migrações
- > A pasta `seeders` ficará todas as seeds criadas no projeto

&nbsp;
&nbsp;
&nbsp;
### Corrigindo rota com Path:
- > Para usar comandos na pasta raiz e as pastas do sequelize-cli, temos que corrigir as rotas
- > Na pasta raiz, criamos o arquivo para corrigir as rotas chamado `.sequelizerc`
- > No arquivo importamos o path e fazemos a correção para podermos usar comandos na pasta raiz
##### Resultados:
		rota: /.sequelizerc
		_____________________________________________
		

		const path = require('path');

		module.exports = {
		    'config': path.resolve('api/config', 'config.json'),
		    'models-path': path.resolve('api/models'),
		    'seeders-path': path.resolve('api/seeders'),
		    'migrations-path': path.resolve('api/migrations')
		}
&nbsp;
&nbsp;
&nbsp;
### Criando o Banco de Dados:
- > Tendo o MySQL instalado e configurado corretamente, utilizaremos o MySQL cli
- > Dentro do terminal MySQL criamos o banco de dados `create database api_sequelize_nodejs;`
- > Em seguida visualizamos os bancos de dados presentes `show databases;`
##### Resultados:
		
		+----------------------+
		| Database             |
		+----------------------+
		| api-sequelize-nodejs |
		| information_schema   |
		| mysql                |
		| performance_schema   |
		| sys                  |
		+----------------------+
&nbsp;
&nbsp;
&nbsp;
### Fazendo a conexão com o Banco de dados:
- > Dentro de `/api/config/config.json` conectaremos o banco com a API
- > No array de `development` substituiremos pelos dados do banco de dados
##### Resultados:
		rota: /api/config/config.json
		_____________________________________________


		{
		"development": {
			"username": "usuario_do_mysql",
			"password": "sua_senha_mysql",
			"database": "api_sequelize_nodejs",
			"host": "127.0.0.1",
			"dialect": "mysql",
			"operatorsAliases": false
		},
		...
&nbsp;
&nbsp;
&nbsp;
### Criando models:
- > Para criar nosso primeiro modelo usaremos o sequelize-cli
- > Use `npx sequelize-cli model:create --name Pessoas --attributes nome:string,ativo:boolean,email:string,role:string`
##### Resultados:
	
	rota: /api/models/pessoas.js
	_____________________________________________
	
	
		'use strict';

		module.exports  = (sequelize, DataTypes) => {
			const  Pessoas  =  sequelize.define('Pessoas', {
				nome: DataTypes.STRING,
				ativo: DataTypes.BOOLEAN,
				email: DataTypes.STRING,
				role: DataTypes.STRING
			}, {});

			Pessoas.associate  =  function(models) {
			// associations can be defined here
			};
			return  Pessoas;
		};

---

	
	rota: /api/migrations/...create-pessoas.js
	_____________________________________________
	
	
		'use strict';

		module.exports  = {
				up: (queryInterface, Sequelize) => {
					return  queryInterface.createTable('Pessoas', {
						id: {
							allowNull: false,
							autoIncrement: true,
							primaryKey: true,
							type: Sequelize.INTEGER
						},
						nome: {
							type: Sequelize.STRING
						},
						ativo: {
							type: Sequelize.BOOLEAN
						},
						email: {
							type: Sequelize.STRING
						},
						role: {
							type: Sequelize.STRING
						},
						createdAt: {
							allowNull: false,
							type: Sequelize.DATE
						},
						updatedAt: {
							allowNull: false,
							type: Sequelize.DATE
						}
					}
				);
			},
			down: (queryInterface, Sequelize) => {
				return  queryInterface.dropTable('Pessoas');
			}
		};
&nbsp;
&nbsp;
&nbsp;
### Criando migrations:
- > Para criar as primeiras migrações use `npx sequelize-cli db:migrate`
- > E assim criará as primeiras migrations da nossa API

### Inserindo alguns dados na API:
- > No MySQL CLI entramos no banco de dados da API `use database api_sequelize_nodejs`
- > Dentro do banco de dados adicionamos os dados manualmente
- > Use `insert into pessoas (nome, ativo, email, role, createdAt, updatedAt) values ("Rodrigo Sousa", 1, "rodrigosousa2022@testeAp.com", "professor", NOW(), NOW());`
- > Para visualizar os dados `select * from pessoas;`
##### Resultados:
	+----+---------------+-------+------------------------+-----------+---------------------+---------------------+
	| id | nome          | ativo | email                  | role      | createdAt           | updatedAt           |
	+----+---------------+-------+------------------------+-----------+---------------------+---------------------+
	|  1 | Rodrigo Sousa |     1 | rodrigosousa@test.com  | Professor | 2022-04-22 10:10:28 | 2022-04-22 10:10:28 |
	+----+---------------+-------+------------------------+-----------+---------------------+---------------------+ 

&nbsp;
&nbsp;
&nbsp;
### Criando seeds:
- > Para criar uma seed use `npx sequelize-cli seed:generate --name demo-pessoa`
- > Após a criação, dentro do arquivo criado remova os comentários e deixe somente o código
- > Altere o primeiro método de `bulkInsert` pelo nome da tabela do banco de dados
- > Faça o mesmo com o método `bulkDelete`
- > Agora podemos adicionar dados de exemplos
##### Resultados:
		rota: /api/seeders/...demo-pessoa.js
		_____________________________________________


		module.exports  = {
			up: (queryInterface, Sequelize) => {
				return  queryInterface.bulkInsert('pessoas', [
				...
				{
					nome: "Matheus Carvalho",
					ativo: true,
					email: "teuteucarvalho@teste.com",
					role: "estudante",
					createdAt: new  Date(),
					updatedAt: new  Date()
				}
					], {})
			},
			
			down: (queryInterface, Sequelize) => {
				return  queryInterface.bulkDelete('pessoas', null, {})
					}
			}
- > Agora conectamos a seed ao banco de dados `npx sequelize-cli db:seed:all`
- > Dentro do banco de dados podemos ver que foi adicionado com sucesso
- > Para visualizar use novamente `select * from pessoas;` dentro do banco de dados
##### Resultados:

		+----+------------------+-------+----------------------------+------------+---------------------+---------------------+
		| id | nome             | ativo | email                      | role       | createdAt           | updatedAt           |
		+----+------------------+-------+----------------------------+------------+---------------------+---------------------+
		|  1 | Rodrigo Sousa    |     1 |  rodrigosousa@test.com     | Professor  | 2022-04-22 10:10:28 | 2022-04-22 10:10:28 |
		|  2 | Matheus Carvalho |     1 | teuteucarvalho@teste.com   | estudante  | 2022-04-22 13:55:37 | 2022-04-22 13:55:37 |
		+----+------------------+-------+----------------------------+------------+---------------------+---------------------+

&nbsp;
&nbsp;
&nbsp;
### Criando controllers:
- > Dentro da pasta `api` criamos outra pasta chamada `controllers`
- > Na pasta `api/controllers` criamos um arquivo `PessoasControl.js`
- > Dentro do arquivo importamos os modelos o arquivo principal de modelos
- > Em seguida criamos uma classe chamada `PessoasControl`
- > Dentro da classe criaremos métodos para realizar o CRUD 
- > CRUD é o padrão Create Read Update Delete
##### Resultados:
		rota: /api/controllers/PessoasControl.js
		_____________________________________________
	

		const database = require('../models')

		class PessoasControl {
			...
		}
&nbsp;
&nbsp;
&nbsp;
### Criando primeira parte do método CRUD:
- > Primeiramente vamos criar o método de listagem do banco de dados
- > Dentro da classe criamos uma função assíncrona estática chamada `listAll`
- > Nos parâmetros da função, receberá `req` e `res`, request e response
- > Dentro de `listAll` criamos uma `const`  que será responsável por pegar os dados do `database`
- > Logo após retornamos a `res` com `.status(200)` e `json(nome_const)`
- > Para finalizar incluímos os metodos dentro de um `try` `catch` e exportamos
##### Resultados:
		rota: /api/controllers/PessoasControl.js
		_____________________________________________


		const database = require('../models');

		class PessoasControl {
				static async listAll(req, res) {
					try {
						const list = await database.Pessoas.findAll()
						return  res.status(200).json(list)
					} catch (error) {
						return res.status(500).json(error.message)
					}
				}
		}
		
		module.exports = PessoasControl
&nbsp;
&nbsp;
&nbsp;
### Mexendo com rotas:
- > Na pasta `api` criamos uma nova pasta chamada `routes`
- > Dentro da pasta `routes` criamos um arquivo `index.js`
- > Nesse arquivo importamos o `body-parser` e movemos a rota de `index.js` da raiz para este arquivo
##### Resultados:
		rota: /api/routes/index.js
		_____________________________________________
	

		const  bodyParser  =  require('body-parser')

		module.exports  =  app  => {
			app.use(bodyParser.json())
			app.get('/', (req, res) => {
				try {
					res.status(200).send('Api criada com a tecnologia NodeJS, Sequelize e banco de dados MySQL')
				} catch(error) {
					res.status(500).json(error.message)
				}
			})
		}
&nbsp;
&nbsp;
&nbsp;
### Configurando a primeira rota:
- > Dentro de `api/routes` criamos um arquivo `pessoasRoute.js` para gerenciar rotas
- > Importamos o `Router` do express e o arquivo `controller` de pessoas
- > Após isso, usamos a função `Router` do express e criamos um método `get`
- > Com o método `get` passamos a rota no primeiro parâmetro e a função no segundo parâmetro
- > Em seguida exportamos o `router`
##### Resultados:
		rota: /api/routes/pessoasRoute.js
		_____________________________________________

		const { Router } =  require('express')
		const  PessoasControl  =  require('../controllers/PessoasControl')

		const  router = Router()

		router.get('/pessoas', PessoasControl.listAll)

		module.exports = router
&nbsp;
&nbsp;
&nbsp;
### Usando a primeira rota:
- > Após finalizarmos a primeira rota, vamos para o arquivo `index.js` em `routes`
- > Dentro do arquivo importamos a primeira rota e colocamos o `app` para usar ela
##### Resultados:
		
		rota: /api/routes/index.js
		_____________________________________________
		
		...
		const  pessoasRoute  =  require('./pessoasRoute')

		module.exports  =  app  => {
			app.use(bodyParser.json())
			app.use(pessoasRoute)
		...
		}
	
- > Para visualizar o resultado da função `get`, use o Postman ou o navegador
- > A partir dos próximos métodos, será necessário o uso do Postman
- > Faça o download dele clicando [aqui](https://app.getpostman.com/app/download/win64)

&nbsp;
&nbsp;
&nbsp;
### Criando requisição por Id:
- > Voltamos para o arquivo `/api/controllers/PessoasControl.js` para criar o novo método
- > Dentro da `class PessoasControl` criamos uma nova função estatica assíncrona chamada `listId`
- > Na função criamos uma `const` responsável por pegar o ID dos usuários cadastrados
- > Logo em seguida abrimos um `try` e  `catch` para digitar nossa função
- > Dentro do `try` criamos uma `const` e puxamos o usuario pelo ID usando a função `findOne()`
- > E no final retornamos essa `const` passando também o `.status(200)`
- > Dentro do `catch(error)` recebemos erro e retornamos `.status(500)` juntamente com `.json(error.message)`
##### Resultados:

		rota: api/controllers/PessoasControl.js
		_____________________________________________
		
		...
		static async listId(req, res) {

			const { id } = req.params

			try {
				const onePeople  =  await  database.Pessoas.findOne( {where: { id: Number(id) }} )
				return res.status(200).json(onePeople)
			}
			catch (error) {
				return res.status(500).json(error.message)
			}
		}
&nbsp;
&nbsp;
&nbsp;
### Usando a requisição por ID:
- > Na rota `/api/routes/pessoasRoute.js` acrescentamos um `router.get()` e usamos a função `listId` nela
- > Na etapa de especificar os parametros da linha de pesquisa, acrescentamos `/:id` para mostrar o parametro que desejamos buscar
##### Resultados:

		rota: api/routes/pessoasRoute.js
		_____________________________________________
		
		...
		router.get('/pessoas/:id', PessoasControl.listId)
		...
&nbsp;
&nbsp;
&nbsp;
### Criando função Create:
- > Para cadastrar usuários em nossa database, voltamos `api/controllers/PessoasControl.js`
- > Dentro da classe criamos uma nova função assíncrona e estática chamada `create`
- > Os parametros em geral das funções são por padrão `..(req, res)`
- > Dentro da função criamos uma `const` responsável por pegar o corpo da requisição
- > Usando o `Try` e `Catch(error)` escrevemos nossa função para caso tenha erro, ele seja especificado
- > No `Try` criamos a `const` repsonsavel por criar um novo usuario no banco de dados
- > Como parametro passamos o corpo da requisição
- > No `Catch(error)` retornamos o erro com `.status(500)` e `.json(error.message)`
##### Resultados:

		Rota: api/controllers/PessoasControl.js
		_____________________________________________
		
		...
		static  async  create(req, res) {

			const  newPeople  =  req.body

			try {
				const  createNewPeople  =  await  database.Pessoas.create(newPeople)
				return  res.status(200).json(createNewPeople)
			}
			catch(error) {
				return  res.status(500).json(error.message)
			}
		}
&nbsp;
&nbsp;
&nbsp;
### Usando o função Create:
- > Seguindo o mesmo raciocínio da usabilidade da função de requisição por ID, faremos o mesmo passo a passo
- > A mudança será que em vez de realizar um `get`, realizaremos um `post` e não terá a presença de `/:id`

##### Resultados:

		Rota: api/routes/pessoasRoute.js
		_____________________________________________
		
		...
		router.post('/pessoas', PessoasControl.create)
		...
&nbsp;
&nbsp;
&nbsp;
### Usando função Update:
- > Na no arquivo `PessoasControl.js` criaremos uma nova função responsavel por alterar campos já cadastrados no banco de dados
- > Dentro da classe criamos uma função assíncrona e estática chamada `update` que recebe `(req, res)` como parametro
- > Dentro dela criamos uma `const` que pegará as novas informações do corpo da requisição
- > E seguida criamos outra `const` para puxar o ID do usuario que será modificado
- > Abrimos um `try` e `catch` e escrevemos novamente como padrão
- > No `try` temos um ação com a função `update` que recebe a nova informação e o ID
- > Seguindo puxamos o id deste usuario por meio de uma `const` e a retornamos com status e json padrão
- > No `catch` usamos o erro passado nas outras funções
##### Resultados:
		
		Rota: api/controllers/PessoasControl.js
		_____________________________________________	

		...
		static  async  update(req, res) {

			const  newInfo  =  req.body

			const { id } =  req.params

			try {
				await  database.Pessoas.update(newInfo, { where: { id: Number(id) } })
				const  updatePeople  =  await  database.Pessoas.findOne( {where: { id: Number(id) }} )
				
				return  res.status(200).json(updatePeople)
			}
			catch(error) {
				return  res.status(500).json(error.message)
			}
		}
&nbsp;
&nbsp;
&nbsp;
### Usando o função Update:
- > Em `api/routes/pessoasRoute.js` criamos um novo router que terá o `put` como função
- > Nele passaremos o caminho com `/:id` para especificar o ID no usuario na linha de pesquisa
- > Em seguida usamos a função criada nos controllers
##### Resultados:
		
		Rota: api/routes/pessoasRoute.js
		_____________________________________________
		
		...
		router.put('/pessoas/:id', PessoasControl.update)
		...
&nbsp;
&nbsp;
&nbsp;
### Testando os funções:
- > Usando o Postman criamos um workbench para trabalhar com a API
- > Após a criação do Workbench pegamos o caminho da api e colocamos no Postman
- > `http://localhost:3000/pessoas`, e terá como resposta a lista de usuarios
- > Se acrescentarmos `http://localhost:3000/pessoas/1` retornara o usuario com ID 1
- > Se alterarmos do `GET` para `POST` e escrevermos em `BODY	-> RAW` e transformar de `TEXT` para `JSON` e escrever: 
				
				{
				"nome":  "TESTE-1",
				"ativo":  true,
				"email":  "teste1@teste.com",
				"role":  "testeEstudante"
				}

- > Em seguida apertar `Send` veremos que cadastrará um novo usuário
- > Voltando para o caminho `http://localhost:3000/pessoas` vemos o usuario cadastrado
- > Para modificar algum campo alteramos de `POST` para `PUT` e em seguida podemos alterar qualquer campo e seguindo apertando `Send` vemos que foi alterado no banco de dados

&nbsp;
&nbsp;
&nbsp;
### Criando função Delete:
- > No arquivo `/api/controllers/PessoasControl.js` criamos uma nova função chamada `deleta`
- > Criamos uma `const` para pegar o parâmetro ID
- > Novamente usamos o `try` e `catch` para escrever nossas funções
- > Dentro do `try` colocamos a função `destroy` que recebe o `id`
- > Em seguida retornamos uma mensagem de sucesso
- > No `catch` retornamos uma resposta com a mensagem de erro
##### Resultados:

		Rota: /api/controllers/PessoasControl.js
		_____________________________________________

		static  async  deleta(req, res) {

			const { id } =  req.params

			try {
				await  database.Pessoas.destroy({ where: { id: Number(id) } })
				return  res.status(200).json({ "message": "Deletado com sucesso!" })
			}
			catch(error){
				return  res.status(500).json(error.message)
			}
		}
&nbsp;
&nbsp;
&nbsp;
### Usando o função Deleta:
- > Em `/api/routes/PessoaRoute.js` criamos uma nova `router` com método `delete`
- > E como parâmetro passamos o caminho `/pessoas/:id` e a função usada `PessoasControl.deleta`
##### Resultados:
	
		Rota: /api/routes/pessoasRoute.js
		_____________________________________________
		
		...
		 router.delete('/pessoas/:id', PessoasControl.deleta)
		...
&nbsp;
&nbsp;
&nbsp;
### Testando a função Deleta:
- > Dentro do Postman fazemos um `GET` para listar as pessoas cadastradas
- > Em seguida pegamos o `id` de uma delas e acrescentamos no caminho `.../pessoas/1`
- > Alteramos o método `GET` para o `DELETE`
- > Em seguida usamos o `Send` para realizar a função
##### Resultados:
	
		{
			"message": "Deletado com sucesso!"
		}
&nbsp;
&nbsp;
&nbsp;

### Organizando ideias:
>  Criamos a primeira tabela do nosso projeto, implementamos o padrão CRUD (Create, Read, Update, Delete). Mas ainda temos mais três tabelas para criar, para relembrar segue a imagem abaixo:
>  ![enter image description here](https://caelum-online-public.s3.amazonaws.com/351+-+ORM+com+NodeJS+-+API+com+Sequelize+e+MySQL/aula1-v%C3%ADdeo4-imagem1.png) 

&nbsp;
&nbsp;
&nbsp;



### Criando novos modelos para as novas tabelas:
- > Na terminal, dentro de `/api` usamos `npx sequelize-cli model:create --name Niveis --attributes descr_nivel:string`
- > Assim criamos o model Níveis
- > Agora `npx sequelize-cli model:create --name Turmas --attributes data_inicio:dateonly`
- > Criamos o model Turmas, e por fim criaremos o model Matriculas
- > Use `npx sequelize-cli model:create --name Matriculas --attributes status:string`

&nbsp;
&nbsp;
&nbsp;

### Fazendo a associação das tabelas:
- > Com a criação do modelo das tabelas criadas no tópico passado, vamos fazer a associação delas agora
- > Para entender melhor acesse a documentação do sequelize-cli [aqui](https://sequelize.org/api/v6/class/src/associations/base.js~association)
- > Nesse caso usaremos a associação de 1 para vários, assim usando `a.hasMany(b)` 
- > Onde `a` e `b` são os models das tabelas que se relacionarão
- > Como vimos no tópico de organização de ideias, as tabelas Pessoas, está relacionada com Turmas e Matriculas
 - > Para primeiras associações usaremos `/api/models/pessoas.js` dentro de `Pessoas.associate = function(models){ // associations can be defined here }`
 - > Nesse arquivo escreveremos `Pessoas.hasMany(models.Turmas)` para relacionar Pessoas com Turmas
 - > Continuamos `Pessoas.hasMany(models.Matriculas)` para relacionar Pessoas com Matriculas
 - > Agora associamos a tabela Turmas a tabela Matrículas
 - > Dentro de `/api/models/turmas.js` e em associação adicionamos `Turmas.hasMany(models.Matriculas)`
 - > Por fim associamos a tabela Niveis a tabela Turmas
 - > Usamos `Niveis.hasMany(models.Turmas)`
 - > Agora usamos o `foreignKey: 'nome'` para nomear a chave estrangeira passando como segundo parâmetro
 - > Para finalizar, utilizamos o `a.belongsTo(b)` para mostrar a qual tabela ele pertence
##### Resultados:

		Rota: /api/models/pessoas.js
		_____________________________________________
		
		...		
		Pessoas.associate  =  function(models) {
			Pessoas.hasMany(models.Turmas, {
				foreignKey: 'docente_id'
			})
			Pessoas.hasMany(models.Matriculas, {
				foreignKey: 'estudante_id'
			})
		};
		...


		Rota: /api/models/niveis.js
		_____________________________________________

		...
		Niveis.associate  =  function(models) {
			Niveis.hasMany(models.Turmas, {
				foreignKey: 'nivel_id'
			})
		};
		...


		Rota: /api/models/turmas.js
		_____________________________________________

		...
		Turmas.associate  =  function(models) {

			Turmas.hasMany(models.Matriculas, {
				foreingKey: 'turma_id'
			})
			Turmas.belongsTo(models.Pessoas, {
				foreignKey: 'docente_id'
			})
			Turmas.belongsTo(models.Niveis, {
				foreignKey: 'nivel_id'
			})
		};
		...


		Rota: /api/models/matriculas.js
		_____________________________________________
		
		...
		Matriculas.associate  =  function(models) {
			Matriculas.belongsTo(models.Pessoas, {
				foreignKey: 'estudante_id'
			})
			Matriculas.belongsTo(models.Turmas, {
				foreingKey: 'turma_id'
			})
		};	
		...

- > Agora para finalizar vamos adicionar as colunas das referencias nas respectivas tabelas
- > Dentro de `/api/migrations/...turmas.js` adicionaremos uma nova coluna chamada `docente_id`
- > Em `docente_id` colocamos as especificações corretas para o modelo que iremos usar
- > Dentro de `docente_id`, não pode ser nulo: `allowNull: false` terá um conteúdo: `type: Sequelize.INTEGER,`referencias: `references: { model: 'Pessoas', key: 'id' }`
- > Ainda no arquivo criamos outra coluna chamada `nivel_id` com as mesmas características, alterando apenas as referencias para `references: { model: 'Niveis', key: 'id' }`
- > Indo para `/api/migrations/...matriculas.js` criamos uma nova coluna chamada `estudante_id`
- > Dentro de `estudante_id` iremos usar o mesmo modelo usado anteriormente, alterando novamente as referencias para `references: { model: 'Pessoas', key: 'id' }`
- > Neste arquivo criamos a ultima coluna com o nome `turma_id` e novamente alteramos somente as referencias para `references: { model: 'Turmas', key: 'id' }`
- > Para finalizar o processo vamos usar  `npx sequelize-cli db:migrate` para criar as migrações
- > Para ver os resultados, use o MySQL CLI. Dentro do banco de dados criado, utilize `show tables;` para visualizar as tabelas criadas, dentre elas estão as novas.
- > Para mais detalhes das tabelas use `describe nome_da_tabela;`

##### Resultados:

		+--------------------------------+
		| Tables_in_api_sequelize_nodejs |
		+--------------------------------+
		| matriculas                     |
		| niveis                         |
		| pessoas                        |
		| sequelizemeta                  |
		| turmas                         |
		+--------------------------------+

&nbsp;
&nbsp;
&nbsp;

### Populando as tabelas:
- > Com as novas tabelas criadas, vamos realizar as novas seeds de teste
- > Para criar as seeds usamos o sequelize na linha de comando, será necessário criar uma seed para cada tabela nova
- > Primeira seed: `npx sequelize-cli seed:generate --name demo-niveis`
- > Segunda seed: `npx sequelize-cli seed:generate --name demo-turmas`
- > Terceira seed: `npx sequelize-cli seed:generate --name demo-matriculas`
- > Agora substituímos o conteúdo das seeds pelo código a seguir em seus respectivos caminhos:
##### Resultados:

		rota: /api/seeders/...demo-nivel.js
		_____________________________________________
	
		module.exports  = {
			up: (queryInterface, Sequelize) => {
				return  queryInterface.bulkInsert('Niveis', [
					{
						descr_nivel: 'básico',
						createdAt: new  Date(),
						updatedAt: new  Date()
					},
					{
						descr_nivel: 'intermediário',
						createdAt: new  Date(),
						updatedAt: new  Date()
					},
					{
						descr_nivel: 'avançado',
						createdAt: new  Date(),
						updatedAt: new  Date()
					}
					], {})
					},
			  
			down: (queryInterface, Sequelize) => {
				return  queryInterface.bulkDelete('Niveis', null, {})
			}
		}
---
		rota: /api/seeders/...demo-turmas.js
		_____________________________________________
		
		module.exports  = {
			up: (queryInterface, Sequelize) => {
				return queryInterface.bulkInsert('Turmas', [
				{
					data_inicio: "2020-02-01",
					nivel_id: 1,
					docente_id: 6,
					createdAt: new  Date(),
					updatedAt: new  Date()
				},
				{
					data_inicio: "2020-02-01",
					nivel_id: 2,
					docente_id: 5,
					createdAt: new  Date(),
					updatedAt: new  Date()
				},
				{
					data_inicio: "2020-02-01",
					nivel_id: 3,
					docente_id: 6,
					createdAt: new  Date(),
					updatedAt: new  Date()
				},
				{
					data_inicio: "2020-07-01",
					nivel_id: 3,
					docente_id: 6,
					createdAt: new  Date(),
					updatedAt: new  Date()
				}
			], {})
			},
			  
			down: (queryInterface, Sequelize) => {
				return  queryInterface.bulkDelete('Turmas', null, {})
			}
		}
---

		Rota: /api/seeders/...demo-matriculas.js
		_____________________________________________

		module.exports  = {
			up: (queryInterface, Sequelize) => {
				return  queryInterface.bulkInsert('Matriculas', [
				{
					status: "confirmado",
					estudante_id: 1,
					turma_id: 1,
					createdAt: new  Date(),
					updatedAt: new  Date()
				},
				{
					status: "confirmado",
					estudante_id: 2,
					turma_id: 1,
					createdAt: new  Date(),
					updatedAt: new  Date()
				},
				{
					status: "confirmado",
					estudante_id: 3,
					turma_id: 2,
					createdAt: new  Date(),
					updatedAt: new  Date()
				},
				{
					status: "confirmado",
					estudante_id: 4,
					turma_id: 3,
					createdAt: new  Date(),
					updatedAt: new  Date()
				},
				{
					status: "cancelado",
					estudante_id: 1,
					turma_id: 2,
					createdAt: new  Date(),
					updatedAt: new  Date()
				},
				{
					status: "cancelado",
					estudante_id: 2,
					turma_id: 2,
					createdAt: new  Date(),
					updatedAt: new  Date()
				}
			], {})
			},
			  
			down: (queryInterface, Sequelize) => {
				return  queryInterface.bulkDelete('Matriculas', null, {})
			}
		}

- > Por ultimo usamos `npx sequelize-cli db:seed:all` para ativar as seeds dentro do banco de dados
- > Será possivel observar a mudança dentro do MySQL dentro das novas tabelas

&nbsp;
&nbsp;
&nbsp;


###  Criando controladores para as novas tabelas:
- > Dentro da pasta `controllers` criamos `NivelControl.js` e `TurmaControl.js`
- > Esses arquivos se assemelham muito ao controller de Pessoas, então seguimos o raciocínio
- > Basicamente copiamos o conteúdo do controlador Pessoas e alteramos apenas o nome de `.database.nome-do-banco`
##### Resultados:

		Rota: /api/controllers/TurmaControl.js
		_____________________________________________
		
				
		const database = require('../models');
		  
		class TurmaControl {
			static async listAll(req, res) {
				try {
					const  listTurmas = await  database.Turmas.findAll()
					return  res.status(200).json(listTurmas)
				} 
				catch (error) {
					return res.status(500).json(error.message);
				}
			}
			
			static async listId(req, res) {
				const { id } = req.params
				try {
					const onePeople = await database.Turmas.findOne( {where: { id:  Number(id) }} )
					return  res.status(200).json(onePeople)
				}
				catch (error) {
					return  res.status(500).json(error.message)
				}
			}
			  
			static async create(req, res) {
				const newTurma = req.body
				try {
					const createNewTurma = await database.Turmas.create(newTurma)
					return res.status(200).json(createNewTurma)
				}
				catch(error) {
					return res.status(500).json(error.message)
				}
			}
			  
			static async update(req, res) {
				const newInfo = req.body
				const { id } = req.params
				try {
					await database.Turmas.update(newInfo, { where: { id:  Number(id) } })
					const updateTurma = await  database.Turmas.findOne( {where: { id:  Number(id) }} )
					return res.status(200).json(updateTurma)
				}
				catch(error) {
					return res.status(500).json(error.message)
				}
			}
			  
			static async deleta(req, res) {
				const { id } = req.params
				  
				try {
					await database.Turmas.destroy({ where: { id:  Number(id) } })
					return res.status(200).json({ "message":  "Deletado com sucesso!" })
				}
				catch(error){
					return res.status(500).json(error.message)
				}
			}
		}
		 
		  
		module.exports = TurmaControl;

---

		Rota: /api/controllers/NiveisControl.js
		_____________________________________________
		

		const  database = require('../models');
 
		class  NiveisControl {
		  
			static  async  listAll(req, res) {
				try {
					const  listNivel = await  database.Niveis.findAll()
					return  res.status(200).json(listNivel)
				} catch (error) {
					return  res.status(500).json(error.message);
				}
			}
			
			static  async  listId(req, res) {
				const { id } = req.params
				try {
					const  onePeople = await  database.Niveis.findOne( {where: { id:  Number(id) }} )
					return  res.status(200).json(onePeople)
				}
				catch (error) {
					return  res.status(500).json(error.message)
				}
			}
			  
			static  async  create(req, res) {
				const  newNivel= req.body
				try {
					const  createNewNivel = await  database.Niveis.create(newNivel)
					return  res.status(200).json(createNewNivel)
				}
				catch(error) {
					return  res.status(500).json(error.message)
				}
			}
			  
			static  async  update(req, res) {
				const  newInfo = req.body
				const { id } = req.params
				try {
					await  database.Niveis.update(newInfo, { where: { id:  Number(id) } })
					const  updateNivel = await  database.Niveis.findOne( {where: { id:  Number(id) }} )
					return  res.status(200).json(updateNivel)
				}
				catch(error) {
					return  res.status(500).json(error.message)
				}
			  
			}
			  
			static  async  deleta(req, res) {
				const { id } = req.params
				  
				try {
					await  database.Niveis.destroy({ where: { id:  Number(id) } })
					return  res.status(200).json({ "message":  "Deletado com sucesso!" })
				}
				catch(error){
					return  res.status(500).json(error.message)
				}
			}
		}
		  
		module.exports = NiveisControl;

&nbsp;
&nbsp;
&nbsp;
### Organizando as rotas das novas tabelas:
- > Dentro de `/routes` criamos um arquivo para turmas e outro para niveis
- > Para turmas será `turmasRoute.js` e para niveis criamos `niveisRoute.js`
- > Dentro de ambos os arquivos importamos o router do express e seus respectivos controllers
- > Agora adicionamos as funções `GET`, `PUT`,`POST` e `DELETE`
- > Em seguida configuramos todos no arquivo principal `index.js`
##### Resultados:

		Rota: /api/routes/turmasRoute.js
		_____________________________________________
		

		const { Router } = require('express')
		
		const  TurmaController = require('../controllers/TurmaControl')
		  
		const  router = Router()
		router
			.get('/turmas', TurmaController.listAll)
			.get('/turmas/:id', TurmaController.listId)
			.post('/turmas', TurmaController.create)
			.put('/turmas/:id', TurmaController.update)
			.delete('/turmas/:id', TurmaController.deleta)
			  
		module.exports = router
---

		Rota: /api/routes/niveisRoute.js

		const { Router } = require('express')
	
		const  NivelController = require('../controllers/NiveisControl')
		  
		const  router = Router()
		router
			.get('/niveis', NivelController.listAll)
			.get('/niveis/:id', NivelController.listId)
			.post('/niveis', NivelController.create)
			.put('/niveis/:id', NivelController.update)
			.delete('/niveis/:id', NivelController.deleta)		  

		module.exports = router
---

		Rota: /api/routes/index.js

		...
			const  niveisRoute = require('./niveisRoute')
			const  turmasRoute = require('./turmasRoute')
		...
			module.exports = app => {
		...
			app.use(niveisRoute)
			app.use(turmasRoute)
		...
			}

&nbsp;
&nbsp;
&nbsp;
### Criando um caso a parte:
- > Criaremos agora as funções para Matriculas que está diretamente relacionada com Pessoas
- > Dentro de `/api/controllers/PessoasControl.js` criaremos os controllers para essa função
- > Na `class PessoasControl` criaremos o CRUD para Martriculas
- > Na listargem das matriculas teremos que receber dois IDs, o de pessoas e o de matriculas
- > E em seguida alteramos as configurações da função `where`
- > Para criar usamos apenas o ID de pessoas, e seguindo o modelo de Pessoas alteramos o banco de dados
- > Para fazer o update recebemos dois IDs e alteramos o `where` para receber os dois IDs
- > Por fim no delete basta passar novamente os IDs e configurar dentro do `where`
##### Resultados:

		Rota: /api/controllers/PessoasControl.js
		_____________________________________________
		
		...
		 
		static  async  listOneMatricula(req, res) {
			const { estudanteId, matriculaId } = req.params
			try {
				const  oneMatricula = await  databaseMatriculas.findOne( {where: { id:  Number(matriculaId), estudante_id:  Number(estudanteId) }} )
				return  res.status(200).json(oneMatricula)
			}
			catch (error) {
				return  res.status(500).json(error)
			}
		}
		  
		static  async  createMatricula(req, res) {
			const { estudanteId } = req.params
			const  newMatricula = { ...req.body, estudante_id:  Number(estudanteId) }
			try {
				const  createNewMatricula = await  database.Matriculas.create(newMatricula)
				return  res.status(200).json(createNewMatricula)
			}
			catch(error) {
				return  res.status(500).json(error.message)
			}
		}
		  
		static  async  updateMatricula(req, res) {
			const  newInfo = req.body
			const { estudanteId, matriculaId } = req.params
			try {
				await  database.Matriclas.update(newInfo, {where: { id:  Number(matriculaId), estudante_id:  Number(estudanteId) }})
				const  updateMatricula = await  database.Matriculas.findOne( {where: { id:  Number(matriculaId) }} )
				return  res.status(200).json(updateMatricula)
			}
			catch(error) {
				return  res.status(500).json(error.message)
			}
		  
		}
		  
		static  async  deletaMatricula(req, res) {
			const { estudanteId, matriculaId } = req.params
			  
			try {
				await  database.Matriculas.destroy({ where: { id:  Number(matriculaId) } })
				return  res.status(200).json({ "message":  "Deletado com sucesso!" })
			}
			catch(error){
				return  res.status(500).json(error.message)
			}
		}
		
		...

### Usando as novas rotas:
- > Em `routes/pessoasRoute.js` criamos os métodos `GET`, `POST`,`PUT` e`DELETE` com suas respectivas funções
##### Resultados:

		Rota: /api/routes/pessoasRoute.js
		
		...
		router
			.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoasControl.listOneMatricula)
			.post('/pessoas/:estudanteId/matricula', PessoasControl.createMatricula)
			.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoasControl.updateMatricula)
			.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoasControl.deletaMatricula)
		...
- > Agora basta testar os métodos usando o Postman


## Fim do Projeto ! ! !