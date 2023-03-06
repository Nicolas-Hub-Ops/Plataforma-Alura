# Usando JWT parte 2
Nesta etapa implementaremos Refresh Tokens e adicionaremos também uma confirmação de cadastro.

Para realizar esses projeto, continuaremos utilizando o projeto de JWT porém em uma versão modificada para este projeto, ele pode ser adquirido clicando no [link](https://github.com/alura-cursos/blog-do-codigo-2/archive/aula0.zip).



- > Para começar a implementação, utilizamos `npm install` para instalar as dependências do projeto
- > Em seguida usamos `npm start` para iniciar o projeto

&nbsp;

### Refresh Tokens, BlackList e WhiteList:
> Os refresh tokens que geram outros tokens, nesse projeto usaremos eles para que o usuario não precise toda vez que o token expirar, ele logar novamente para adquirir outro token válido, fazendo assim com que ele permaneça com o mesmo token por mais tempo e mantendo a segurança do projeto.

> Vale a pena também explicar sobre os conceitos de BlackList ou BlockList e WhiteList ou AllowList para esse projeto. De maneira resumida, um BlackList trata-se de uma lista de tokens que foram expirados, que não apresentam validação dentro do projeto, já a WhiteList é uma lista de tokens que estarão disponíveis para uso dentro do projeto, no qual ainda não foram expirados ou usados.

&nbsp;

### Criando um refresh token:
> O Refresh Token usará dentro do nosso projeto o tipo AllowList para podermos fazer as devidas validações se o token é válido ou não, e por se tratar de um Refresh Token, sua usabilidade é única, ou seja, só pode ser usado uma vez.
 
> Dentro de: `/src/usuario/usuarios-controlador.js`
> - Para gerar o token  importamos o modulo `const crypto = require('crypto')`
> -  Adicionaremos um função `criaRefreshToken` logo após `criaTokenJWT(){..}`
> - Na função terá uma `const refreshToken = crypto.randomBytes(24)` que será responsável por conter o refreshToken
> - Adicionamos também após o `crypto.randomBytes(24)` o `.toString('hex')` para transformar o resultado em string
> - Para testar, usamos o `return` para retornar o refresh token
> - Assim chamamos a função dentro de `login` para realizar o teste e seu resultado para aparecer em `res.status(200).json({refreshToken})`

##### Resultado: 

	const crypto = require('crypto');

	criaRefreshToken() {
		const refreshToken = crypto.randomBytes(24).toString('hex');
		return refreshToken;
	}

	module.exports = {
		...
		async login(req, res) {
			try {
				const accessToken = criaTokenJWT(req.user);
				const refreshToken = criaRefreshToken();
				res.set('Authorization', accessToken);
				res.status(200).json({ refreshToken });
			} catch (erro) {
				res.status(500).json({ erro:  erro.message });
			}
		},
		...
	}

> - Basta agora ir no Postman e logar em algum usuário e será retornado como resposta o valor do refresh token

&nbsp;
### Adicionando expiração no Refresh Token:

> Para realizar essa função teremos que pegar o `usuario.id` para especificar o usuario, e também dar ao refresh token uma validação de token, no qual usaremos uma dependência do NPM.

> Dentro de: `/src/usuario/usuarios-controlador.js`
> 
> - Na função `criaRefreshToken(){...}` adicionamos um argumento `criaRefreshToken(usuario){...}` para capturar o id do usuario
> 
> - Agora instalamos a dependência moment usando `npm install moment@2.26.0` 
> 
> - Importamos usando para dentro do arquivo com `const moment = require('moment');`
> 
> - Na função criaRefreshToken criamos a expiração de refresh token para 5 dias
> 
> - Para isso colocamos `const expiration = moment().add(5, 'd').unix()`

##### Resultados:

	const  moment = require('moment');
	...
	async  function  criaRefreshToken(usuario) {
		const  refreshToken = crypto.randomBytes(24).toString('hex')
		const  expiration = moment().add(5, 'd').unix()	
		return  refreshToken
	}
	...

&nbsp;
### Funções da Allowlist:

> Para criar a allowlist vamos fazer uma atualização nos arquivos da pasta `redis` para não ficar muita repetição de código em vários arquivos

> Na pasta `/redis` criamos um novo arquivo chamado `manipula-lista.js`

> Dentro de `/redis/manipula-lista.js` 
>  - Primeiramente adicionamos `module.exports = lista => {}` para realizar a função de acordo com o nome da lista
>
> - Dentro desse primeiro método adicionamos um tag `return {}` para servir de retorno de função
>
> - Dentro de `return {}` criamos as duas funções da blocklist, tanto a função `adiciona`  quanto a `contemChave`
>
> - Para isso criamos `async adiciona(chave, valor, dataExpiracao){},` em seguida `async contemChave(chave){}` dentro de `return {}`
>
> - E assim como está em `blocklist.js` adicionamos também o promisify
> 
> - Importamos com `const { promisify } = require('util')` e usamos ele dentro de `module.exports` assim como está na blocklist com as funções `setAsync`,  `existsAsync`, `getAsync` e `delAsync`
> 
> - Agora podemos começar a escrever a composição das funções da blocklist

> Continuando em `/redis/manipula-lista.js`
> -  Dentro de `adiciona` guardamos a chave e o valor dentro de um setAsync `await setAsync(chave, valor)`
> 
> - Apos verificamos a expiração com `lista.expireat(chave, dataExpiracao)`
> 
> - Já em `contemChave` guardamos o resultado da chave em existsAsync `const resultado = await existsAsync(chave)`
> 
> - E por fim retornamos caso seja true `return resultado === 1`
> 
> - Começamos então a adicionar funções para a Allowlist, criamos uma nova função dentro de `return` chamada `buscaValor(chave){}`
> 
> - Dentro da nova função retornamos a chave em getAsync `return getAsync(chave)`
> 
> - Outra função importante é invalidar o refresh token, para isso criamos a função `deleta(chave){}` após a função `buscaValor(chave){...}`
> 
> - Por fim, dentro de `deleta(chave){}` adicionamos delAsync recebendo a chave `await delAsync(chave)`

##### Resultados: 
	const { promisify } = require('util')
  
	module.exports = lista  => {
		const  setAsync = promisify(lista.set).bind(lista);
		const  existsAsync = promisify(lista.exists).bind(lista);
		const  getAsync = promisify(lista.get).bind(lista);
		const  delAsync = promisify(lista.del).bind(lista);
		 
		  
		return {
			async  adiciona(chave, valor, dataExpiracao){
				await  setAsync(chave, valor);
				lista.expireAt(chave, dataExpiracao);
			},
			  
			async  contemChave(chave){
				const  resultado = await  existsAsync(chave);
				return  resultado === 1;
			},
			  
			async  buscaChave(chave){
				return  getAsync(chave)
			},
			  
			async  deleta(chave){
				return  await  delAsync(chave)
			}
		}
	}

&nbsp;
### Criando Allowlist:
> Dentro de `/redis` criamos um arquivo chamado `allowlist-refresh-token.js`

> Em `/redis/allowlist-refresh-token.js`
> - Importamos o redis com `const redis = require('redis')`
> 
> - Criamos a Allowlist usando o redis `const allowlist = redis.createClient({ prefix: 'allowlist-refresh-token:' })`
> 
> - Agora importamos o `manipula-lista.js` criando no tópico passado `const manipulaLista = require('./manipula-lista')`
> 
> - Agora dentro de um `module.exports` utilizamos `manipulaLista` com a `allowlist` criada `module.exports = manipulaLista(allowlist)`
##### Resultados:

	const  redis = require('redis')
	const  manipulaLista = require('./manipula-lista')
	  
	const  allowlist = redis.createClient({ prefix:  'allowlist-refresh-token:' })
	  
	module.exports = manipulaLista(allowlist)

&nbsp;

> Iniciamos a `allowlist` em `/server.js` após a `blackList` usando `require('./redis/allowlist-refresh-token')`

> Em `/src/usuarios/usuarios-controlador.js`
> 
> - Importamos a allowlist com `const allowlist - require('../../allowlist-refresh-token')
> 
> - Adicionamos o refresh token na allowlist em `criaRefreshToken(){...}` usando `await allowlist.adiciona(refreshToken, usuario.id, expiration)`
> 
> - Para funcionar adicionamos `async` na função `criaRefreshToken(){...}` já que usamos o `await` dentro dela
> 
> - Para testar vamos na função `login(){...}` e adicionamos `await` em `const refreshToken = await criaRefreshToken(req.user)`
> 
> - Agora basta testar no Postman fazendo login com algum usuário, e ao realizar o login, para ver token da Allowlist basta abrir o promp de comando, entrar em `redis-cli` e usar `KEYS *` para listar os tokens
##### Resultados: 
	async  function  criaRefreshToken(usuario) {
			const  refreshToken = crypto.randomBytes(24).toString('hex')
			const  expiration = moment().add(5, 'd').unix()
			const  id = usuario.id;
			await  allowlist.adiciona(refreshToken, id, expiration)
			return  refreshToken
		}
		...

&nbsp;
### Refatorando a Blocklist:
> Dentro de `/redis/manipula-blocklist.js`
> - Importamos `manipula-lista` com `const manupulaLista = require('./manipula-lista')`
> 
> - Criamos uma `const`  com `manipulaLista` recebendo a `blocklist`, `const manipulaBlocklist = manipulaLista(blocklist)`
> 
> - Agora substituimos as duas ultimas linha de código da função `adiciona` por `await manipulaBlocklist.adiciona(tokenHash, '', dataExpiracao)`
> 
> - Substituimos também as duas ultimas linha de código da função `contemToken` por `return manipulaBlocklist.contemChave(tokenHash)`
> 
> - Assim podemos apagar o `promisify` com `existsAsync` e `setAsync`
> 
> - Para finalizar importamos o redis, `const redis = require('redis')`
> 
> - Em seguida criamos o cliente redis com `const blocklist = redis.createClient({ prefix: 'blocklist-access-token:' })`
> 
> - Assim podemos excluir o arquivo `/redis/blocklist.js` e renomear o arquivo atual para `blocklist-access-token.js`

 
> Em `/redis/blocklist-access-token.js`
> - Atualizamos a rota em `server.js` para `require('./redis/blocklist-access-token')`
> 
> - Atualizamos também em `/src/usuarios/usuarios-controlador.js` para `const blocklist = require('../../redis/blocklist-access-token')`
> 
> - Por fim atualizamos em `/src/usuarios/estrategias-autenticacao..js` para `const blocklist = require('../../redis/blocklist-access-token')`

##### Resultados:

	const  redis = require('redis');
	const  blocklist = redis.createClient({ prefix:  'blocklist-access-token:' });
	  
	const  manipulaLista = require('./manipula-lista');
	const  manipulaBlocklist = manipulaLista(blocklist);
	  
	const  jwt = require('jsonwebtoken');
	const { createHash } = require('crypto');
	  
	function  geraTokenHash(token) {
		return  createHash('sha256').update(token).digest('hex');
	}
	  
	module.exports = {
		async  adiciona(token) {
			const  dataExpiracao = jwt.decode(token).exp;
			const  tokenHash = geraTokenHash(token);
			await  manipulaBlocklist.adiciona(tokenHash, '', dataExpiracao)
		},
		async  contemToken(token) {
			const  tokenHash = geraTokenHash(token);
			return  manipulaBlocklist.contemChave(tokenHash)
		}
	};

&nbsp;
### Verificação do Refresh Token: 
> Dentro de `/src/usuarios/middlewares-autenticacao.js`
> - Neste arquivo temos duas funções, `local(...){...}` e `bearer(..){...}`, criamos então uma para verificar o refresh token chamada `async refresh(req, res, next){}`
> 
> - Primeiramente para realizar o tratamento de erro usamos um código `try` e `catch(error)`
> 
> - No nosso projeto, o refresh token será enviado por meio do corpo da requisição, então dentro da nova função em `try {}` criamos `const {refreshToken} = req.body` para buscar o refresh token
> 
> - Assim fazemos a verificação e retornamos como id `const id = await verificaRefreshToken(refreshToken)`
> 
> - Para resposta igual e `true`, iremos invalidar o refresh token com `await invalidaRefreshToken(refreshToken)`
> 
> - Agora para recuperar usuário, precisaremos usar o model, então importamos ele `const Usuario = require('./usuarios-modelo')`
> 
> - Novamente dentro da função `refresh`  buscamos o usuario com `req.user = await Usuario.buscaPorId(id)`
> 
> - Por fim retornamos a função para o próximo fluxo `return next()`
> 
> - Tratamos os erros agora dentro do `catch(error)`
> 
> - Primeira verificação de erros para o cliente `if(error.name === 'InvalidArgumetError'){return res.status(401).json({error: error.message})}`
> 
> - Outra verificação é para erro no no servidor `return res.status(500).json({error: error.message})`
> 
> - Com a base terminada criamos agora `verificaRefreshToken` e `invalidaRefreshToken`
> 
> - Acima de `module.exports = {...}` começamos a criar a primeira função chamada `async function verificaRefreshToken(refreshToken)`
> 
> - Primeiramente verificamos se realmente existe um refresh token que foi buscado por `req.body`
> 
> - Para verificamos implementamos `if(!refreshToken){throw new InvalidArgumentError('Refresh Token não enviado!')}`
> 
> - Como `InvalidArgumentError` é um erro customizado, importamos ele com `const {InvalidArgumentError} = require('../erros')`
> 
> - Após verificar se o refresh token realmente existe, vamos agora verificar se ele está ou não na `allowlist`
> 
> - Importamos a `allowlist` com `const allowlist = require('../../redis/allowlist-refresh-token')`
> 
> - Em seguida verificamos e retornamos o valor como `id` com `const id = await allowlist.buscaValor(refreshToken)`
> 
> - Para saber se é válido ou não, adicionamos outro `if` com `if(!id){throw new InvalidArgumentError('RefreshToken inválido')}`
> 
> - Por fim retornamos esse valor `id` com `return id;`
>
> - Escrevemos agora a segunda função `async funciton invalidaRefreshToken(refreshToken)`
> 
> - Nesta nova função tornamos o refresh token invalido usando `await allowlist.deleta(refreshToken)`
> 

##### Resultados: 

	...
	const { InvalidArgumentError } = require('../erros')
	const  allowlist = require('../../redis/allowlist-refresh-token')
	const  Usuario = require('./usuarios-modelo')
	

	async  function  verificaRefreshToken(refreshToken) {
		if(!refreshToken) {
			throw  new  InvalidArgumentError('Refresh Token não enviado!')
		}
		const  id = await allowlist.buscaChave(refreshToken)
		if(!id) {
			throw  new  InvalidArgumentError('Refresh Token inválido!')
		}
		return id;
	};
		  
	async  function  invalidaRefreshToken(refreshToken) {
		await  allowlist.deleta(refreshToken)
	};  
	  

	module.exports = {
	
		local(req, res, next) {...},
		bearer(req, res, next) {...},
		  
		async  refresh(req, res, next) {
			try {
				const { refreshToken } = req.body;
				const  id = await verificaRefreshToken(refreshToken);
				await  invalidaRefreshToken(refreshToken);
				req.user = await  Usuario.buscaPorId(id);
				return next();
			} catch(error) {
				if(error.name === 'InvalidArgumentError') {
					return  res.status(401).json( { error:  error.message } )
				}
				return  res.status(500).json( { error:  error.message } )
			}
		}
	};

&nbsp;
### Implementando as rotas:
> Dentro de `/src/usuarios/usuarios-rota.js`
> - Em `module.exports` criamos uma nova rota com `app.route('/usuario/atualiza_token')`
> 
> - Como método de `app.route(...)` usamos `.post(middlewaresAutenticacao.refresh, usuariosControlador.login)`
> 
> - Por ultimo atualizamos a rota de `logout` para `post` e adicionamos o `middlewaresAutenticacao.refresh`
> 
> - Assim ficando `app.route('/usuario/logout').post([middlewaresAutenticacao.refresh ,middlewaresAutenticacao.bearer], usuariosControlador.logout);`
> 
> - Agora testamos no Postman, primeira logamos com um usuário e depois usamos a nova rota

##### Resultados: 

	module.exports = (app) => {
		app
			.route('/usuario/atualiza_token')
			.post(middlewaresAutenticacao.refresh, usuariosControlador.login)
			  
		app
			.route('/usuario/login')
			.post(middlewaresAutenticacao.local, usuariosControlador.login);
			  
		app
			.route('/usuario/logout')
			.post([middlewaresAutenticacao.refresh ,middlewaresAutenticacao.bearer], usuariosControlador.logout);
			  
		app
			.route('/usuario')
			.post(usuariosControlador.adiciona)
			.get(usuariosControlador.lista);
			  
		app
			.route('/usuario/:id')
			.delete(middlewaresAutenticacao.bearer, usuariosControlador.deleta);
	};

&nbsp;
### Modularização: 
> No nosso projeto, para que haja uma melhor organização do código e facilite a manutenção do programa, iremos modularizar algumas função que tem usabilidades para o mesmo argumento, no caso, relacionados com os tokens, modularizareoms a criação, verificação e invalidação de tokens, para que em casa arquivo fique um código mais limpo.

### Modularizando a criação dos tokens:
> Em `/src/usuarios` criamos um arquivo novo chamado `tokens.js`

> Dentro de `/src/usuarios/tokens.js`
> - Adicionamos `module.exports = {}` para possibilitar o uso em outras partes do projeto
> 
> - Então começamos a implementação adicionando `access: {},` e `refresh: {}`
> 
> - Dentro de cada um deles terá as funções para a manipulação de cada tipo de token
> 
> - Primeiramente criamos tanto o `access` quanto o `refresh`, para isso recortamos de `usuarios-controlador.js` a parte de criação de cada um deles e adicionamos no nosso `tokens.js`
> 
> - Dentre as funções de criação estão `criaTokenJWT(...){...}`, `criaRefreshToken(...){...}`
> 
> - Importamos também as dependencias deles, `jwt`, `crypto` , `moment` e `allowlist`
> 
> - Agora modularizaremos as duas funções de criação de tokens
> 
> - Primeiramente em `criaRefreshToken(usuario)` substituimos os atributo usuario por  `criaRefreshToken(id, [Qtemp, Utemp], allowlist)`
> 
> - Dentro da função substituimos em `dataExpiracao` `5` por `Qtemp` e `d` por `Utemp` e ainda em `await allow.adiciona` trocamos `usuario.id` por somente `id`
> 
> Por fim alteramos `await allowlist.adiciona(refreshToken, usuario.id, dataExpiracao)` por `await allowlist.adiciona(refreshToken, id, dataExpiracao)`
> 
> - Agora modulamos a função `criaTokenbJWT()` para o atributo `(id, [Qtemp, Utemp])`
> 
> - Substituimo em `{expiresIn: '15m'}` por `{expiresIn: Qtemp + Utemp}`
> 
> - Ainda em `criaTokenJWT` alteramos `payload = { id: usuario.id }` para somente `payload = { id }`
> 
> - Agora implemenamos dentro de `access` e `refresh`
> 
> - Em `access` criamos o atributo tempo `expiration: [ 15, 'm' ]`
> 
> - Em seguida usamos `cria(id){ return criaTokenJWT(id, this.expiration) }`
> 
> - Já em `refresh` segue o mesmo raciocínio, criamos `expiration: [ 5, 'd' ],` e `lista: allowlist`
> 
> - Em seguida usamos `cria(id) { return criaRefreshToken(id, this.expiration, this.lista) }`

##### Resultados: 
	
	const  allowlistRefreshToken = require('../../redis/allowlist-refresh-token');
	const  crypto = require('crypto');
	const  moment = require('moment');
	const  jwt = require('jsonwebtoken');
	  
	function  criaTokenJWT(id, [Qtemp, Utemp]) {
		const  payload = { id };
		const  token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn:  Qtemp + Utemp});
		return  token;
	};
	  
	async  function  criaRefreshToken(id, [Qtemp, Utemp], allowlist) {
		const  refreshToken = crypto.randomBytes(24).toString('hex');
		const  expiration = moment().add(Qtemp, Utemp).unix();
		await  allowlist.adiciona(refreshToken, id, expiration);
		return  refreshToken;
	};
	  
	module.exports = {
		access: {
			expiration: [15, 'm'],
			cria(id) {
				return  criaTokenJWT(id, this.expiration)
			}
		},
		refresh: {
			expiration: [5, 'd'],
			allowlist:  allowlistRefreshToken,
			cria(id) {
				return  criaRefreshToken(id, this.expiration, this.allowlist)
			}
		}
	};


> Dentro de `/src/usuarios/usuarios-controlador.js`
> - Por fim atualizamos em `login` no qual  `const accessToken` será modificado para  `const accessToken = tokens.access.cria(req,user.id)`
> 
> - Seguindo atualizamos `const refreshToken` para `const refreshToken = await tokens.refresh.cria(req,user.id)`

##### Resultados: 
	
	...
	const tokens = require('./tokens')
	
	module.exports = {
		async  adiciona(req, res) {...},
		  
		async  login(req, res) {
			try {
				const  accessToken = tokens.access.cria(req.user.id);
				const  refreshToken = await  tokens.refresh.cria(req.user.id);
				res.set('Authorization', accessToken);
				res.status(200).json({ refreshToken });
			} catch (erro) {
				res.status(500).json({ erro:  erro.message });
			}
		},
		
		async logout(req, res) {...},
	
		async lista(req, res) {...},
		
		async deleta(req, res) {...}
	};

&nbsp;
### Modularizando a verificação de tokens:
> Dentro de `/src/usuarios/tokens.js`
> - Após a função de `cria()` criamos uma função `verifica(token){}` tanto em `access` quanto em `refresh`
> 
> - Em `verifica(token)` que está em `access` usamos `return verificaJWT(token);` para verificar
> 
> - Semelhante ocorre em  `refresh` que na função `verifica(token)` usa  `return verificaRefresh(token);` para verificar o token
> 
> - Assim antes de `module.exports` implementamos as respectivas funções `verificaRefresh(token)` e `verificaJWT(token)`
> 
> - Criamos primeiramente `async function verificaJWT(token){}` e dentro dela começamos a implementar as devidas funções
> 
> - Dentro de `verificaJWT(token, blocklist, name)` adicionamos `await verificaTokenNaBlocklist(token, blocklist, name)` e em seguida `const payload = jwt.verify(token, process.env.CHAVE_JWT)` para fazer a verificação na `blocklist`
> 
> - Criamos agora `verificaTokenNaBlocklist(token, blocklist, name)` e adicionamos `const tokenNaBlocklist = await blocklist.contemToken(token)`
> 
> - Ainda na função `verificaTokenNaBlocklist()` implementamos `if(tokenNaBlocklist) { throw new jwt.JsonWebTokenError(name + 'inválido por logout!') }`
> 
> - Assim importamos a dependencia `blocklistAccessToken` para que a função possa usar `const blocklistAccessToken = require('../../redis/blocklist-access-token')`
> 
> - Retornando na função `verificaJWT(token)` e trocamos o valor `payload` para `{ id }` em seguida retornamos com `return id;`
> 
> - Dentro de `access` passamos os valores `name: 'Access Token'` e atualizamos `list: 'blocklist'` para `blocklist: 'blocklistAccessToken'`
> 
> - Assim podemos ir na função `verifica(token)` de `access` e implementar `return verificaJWT(token, this.blocklist, this.name)`
> 
> - Após as funções `verificaJWT(token, blocklist, name)` e `verificaTokenNaBlocklist(token, blocklist, name)` criamos a função `async verificaRefresh(token, allowlist, name)`
> 
> - Na função `verificaRefresh` adicionamos `verificaTokenEnviado(token, name);` em seguida `const  id = await  allowlist.buscaValor(token)` e `verificaTokenValido(id, name);`
> 
> - Criamos então a função `verificaTokenEnviando(token, name)` sua composição será somente um `if` em que `if(!token) { throw new InvalidArgumentError(name + 'não enviado!') }` 
> 
> - Já na função `verificaTokenValido(id, name)` passamos `if(!id) { throw new InvalidArgumentError(name + 'é inválido') }`
> 
> - Por fim, retornando na função `verificaRefresh(token, allowlist, name)`, no final do codigo adicionamos um `return id;`
> 
> - Implementamos agora a função dentro de `refresh`, primeiramente adicionamos um valor a nome com `name: 'Refresh Token',`
> 
> - Dentro de `verifica(token)` de `refresh` refatoramos para `return  verificaRefresh(token, this.allowlist, this.name);`

##### Resultados:
 
	
	const  allowlistRefreshToken = require('../../redis/allowlist-refresh-token');
	const  crypto = require('crypto');
	const  moment = require('moment');
	const  jwt = require('jsonwebtoken');
	const  blocklistAccessToken = require('../../redis/blocklist-access-token');
	const { InvalidArgumentError } = require('../erros')
	  
	function  criaTokenJWT(id, [Qtemp, Utemp]) {
		const  payload = { id };
		const  token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn:  Qtemp + Utemp});
		return  token;
	};
	  
	async  function  verificaJWT(token, blocklist, name) {
		await  verificaTokenNaBlocklist(token, blocklist, name);
		const { id } = jwt.verify(token, process.env.CHAVE_JWT);
		return  id;
	};
	  
	async  function  verificaTokenNaBlocklist(token, blocklist, name) {
		const  tokenNaBlocklist = await  blocklist.contemToken(token);
		if (tokenNaBlocklist) {
			throw  new  jwt.JsonWebTokenError(`${name} inválido por logout!`);
		}
	};
	 
	 
	  
	async  function  criaRefreshToken(id, [Qtemp, Utemp], allowlist) {
		const  refreshToken = crypto.randomBytes(24).toString('hex');
		const  expiration = moment().add(Qtemp, Utemp).unix();
		await  allowlist.adiciona(refreshToken, id, expiration);
		return  refreshToken;
	};
	  
	function  verificaTokenValido(id, name) {
		if (!id) {
			throw  new  InvalidArgumentError(`${name} inválido !`);
		}
	};
	  
	function  verificaTokenEnviado(token, name) {
		if (!token) {
			throw  new  InvalidArgumentError(`${name} não enviado !`);
		}
	};
	  
	async  function  verificaRefresh(token, allowlist, name) {
		verificaTokenEnviado(token, name);
		const  id = await  allowlist.buscaValor(token)
		verificaTokenValido(id, name);
		return  id;
	};
	  
	module.exports = {
		access: {
			expiration: [15, 'm'],
			blocklist:  blocklistAccessToken,
			name:  'Access Token',
			  
			cria(id) {
				return  criaTokenJWT(id, this.expiration, this.name)
			},
			  
			verifica(token) {
				return  verificaJWT(token, this.blocklist, this.name);
			}
		},
		refresh: {
			expiration: [5, 'd'],
			allowlist:  allowlistRefreshToken,
			name:  'Refresh Token',
			  
			cria(id) {
				return  criaRefreshToken(id, this.expiration, this.allowlist)
			},
			  
			verifica(token) {
				return  verificaRefresh(token, this.allowlist, this.name);
			}
		}
	};

&nbsp;
> Atualizamos em `/src/usuarios/middlewares.autenticacao.js`
> - Em `module.exports` na função `refresh` substituimos `const  id = await  verificaRefreshToken(refreshToken);` para `const  id = await  tokens.refresh.verifica(refreshToken);`

##### Resultados

	const  Usuario = require('./usuarios-modelo');
	const  tokens = require('./tokens')
	  
	async  function  invalidaRefreshToken(refreshToken) {
		await  allowlist.deleta(refreshToken)
	}
	 
	module.exports = {
	
		local(req, res, next) {...},

		bearer(req, res, next) {...},
		  
		async  refresh(req, res, next) {
			try {
				const { refreshToken } = req.body;
				const  id = await  tokens.refresh.verifica(refreshToken);
				await  invalidaRefreshToken(refreshToken);
				req.user = await  Usuario.buscaPorId(id);
				return  next();
			} catch(error) {
				if(error.name === 'InvalidArgumentError') {
					return  res.status(401).json( { error:  error.message } )
				}
				return  res.status(500).json( { error:  error.message } )
			}
		}
	};
	
&nbsp;
> Atualizamos em `/src/usuarios/estrategias-autenticacao.js` como está a baixo:
##### Resultados
	const  passport = require('passport');
	const  LocalStrategy = require('passport-local').Strategy;
	const  BearerStrategy = require('passport-http-bearer').Strategy;
	const  Usuario = require('./usuarios-modelo');
	const { InvalidArgumentError } = require('../erros');
	const  bcrypt = require('bcrypt');
	const  tokens = require('./tokens');
	  
	function  verificaUsuario(usuario) {
		if (!usuario) {
			throw  new  InvalidArgumentError('Não existe usuário com esse e-mail!');
		}
	};
	  
	async  function  verificaSenha(senha, senhaHash) {
		const  senhaValida = await  bcrypt.compare(senha, senhaHash);
		if (!senhaValida) {
			throw  new  InvalidArgumentError('E-mail ou senha inválidos!');
		}
	};
	  
	passport.use(
		new  LocalStrategy(
			{
				usernameField:  'email',
				passwordField:  'senha',
				session:  false,
			},
			async (email, senha, done) => {
				try {
					const  usuario = await  Usuario.buscaPorEmail(email);
					verificaUsuario(usuario);
					await  verificaSenha(senha, usuario.senhaHash);
					done(null, usuario);
				} catch (erro) {
					done(erro);
				}
			}
		)
	);
	  
	passport.use(
		new  BearerStrategy(async (token, done) => {
			try {
				const  id = await  tokens.access.verifica(token)
				const  usuario = await  Usuario.buscaPorId(id);
				done(null, usuario, { token });
			} catch (erro) {
				done(erro);
			}
		})
	);

&nbsp;
### Modularizando a invalidação dos tokens:
> Dentro de `/src/usuarios/tokens.js`
> - Em ambas as funções, `access` e `refresh` adicionamos a função `invalida(token)`
> 
> - Em `access` implementamos na função `invalida(token)` o código `return invalidaJWT(token, this.blocklist);`
> 
> - Já em `refresh` na função `invalida(token)` adicionamos `return invalidaRefresh(token);`
> 
> - Iremos criar a função `invalidaJWT(token, blocklist) {}` dentro dela usamos `return blocklist.adiciona(token)`
> 
> - Invalidação de `access` inválido já foi feita, vamos agora para do `refresh`
> 
> - Criamos a função `invalidaRefresh(token, allowlist)`, que terá `await allowlist.deleta(token)` como composição
> 
> - Assim finalizamos a modulação da funçã `invalida`

##### Resultados: 

	const { InvalidArgumentError } = require('../erros')
	const  crypto = require('crypto');
	const  moment = require('moment');
	const  jwt = require('jsonwebtoken');
	  
	const  allowlistRefreshToken = require('../../redis/allowlist-refresh-token');
	const  blocklistAccessToken = require('../../redis/blocklist-access-token');
	 
	 
	  
	function  criaTokenJWT(id, [Qtemp, Utemp]) {
		const  payload = { id };
		const  token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn:  Qtemp + Utemp});
		return  token;
	};
	  
	async  function  verificaJWT(token, blocklist, name) {
		await  verificaTokenNaBlocklist(token, blocklist, name);
		const { id } = jwt.verify(token, process.env.CHAVE_JWT);
		return  id;
	};
	  
	async  function  verificaTokenNaBlocklist(token, blocklist, name) {
		const  tokenNaBlocklist = await  blocklist.contemToken(token);
		if (tokenNaBlocklist) {
			throw  new  jwt.JsonWebTokenError(`${name} inválido por logout!`);
		}
	};
	  
	async  function  invalidaJWT(token, blocklist) {
		return  blocklist.adiciona(token);
	}
	 
	  
	async  function  criaRefreshToken(id, [Qtemp, Utemp], allowlist) {
		const  refreshToken = crypto.randomBytes(24).toString('hex');
		const  expiration = moment().add(Qtemp, Utemp).unix();
		await  allowlist.adiciona(refreshToken, id, expiration);
		return  refreshToken;
	};
	  
	function  verificaTokenValido(id, name) {
		if (!id) {
			throw  new  InvalidArgumentError(`${name} inválido !`);
		}
	};
	  
	function  verificaTokenEnviado(token, name) {
		if (!token) {
			throw  new  InvalidArgumentError(`${name} não enviado !`);
		}
	};
	  
	async  function  verificaRefresh(token, allowlist, name) {
		verificaTokenEnviado(token, name);
		const  id = await  allowlist.buscaValor(token)
		verificaTokenValido(id, name);
		return  id;
	};
	  
	async  function  invalidaRefresh(token, allowlist) {
		await  allowlist.deleta(token)
	}
	  
	module.exports = {
		access: {
			expiration: [15, 'm'],
			list:  blocklistAccessToken,
			name:  'Access Token',
			  
			cria(id) {
				return  criaTokenJWT(id, this.expiration, this.name)
			},
			  
			verifica(token) {
				return  verificaJWT(token, this.list, this.name);
			},
			  
			invalida(token) {
				return  invalidaJWT(token, this.list);
			}
		},
		  
		refresh: {
			expiration: [5, 'd'],
			list:  allowlistRefreshToken,
			name:  'Refresh Token',
			  
			cria(id) {
				return  criaRefreshToken(id, this.expiration, this.list)
			},
			  
			verifica(token) {
				return  verificaRefresh(token, this.list, this.name);
			},
			  
			invalida(token) {
				return  invalidaRefresh(token, this.list)
			}
		}
	}
	
&nbsp;
> Atualizamos em `/src/usuarios/usuarios-controlador.js`
> 
> - Importamos `const tokens = require('./tokens')`
>
> - Na função `logout` substituimos `await blocklist.adiciona(token)` por `await tokens.access.invalida(token)`

##### Resultados:

	const  Usuario = require('./usuarios-modelo');
	const { InvalidArgumentError } = require('../erros');
	const  tokens = require('./tokens')
	 
	  
	module.exports = {
	
		async  adiciona(req, res) {...},
		  
		async  login(req, res) {...},
		  
		async  logout(req, res) {
			try {
				const  token = req.token;
				await  tokens.access.invalida(token)
				res.status(204).json();
			} catch (erro) {
				res.status(500).json({ erro:  erro.message });
		}

		},
		  
		async  lista(req, res) {...},
		  
		async  deleta(req, res) {...}
	};
&nbsp;
> Atualizamos também em `/src/usuarios/middlewares-autenticacao.js`
> - Na função `refresh` substituimos `await invalidaRefreshToken(refreshToken)` para `await tokens.refresh.invalida(refreshToken)`

##### Resultados: 

	const  passport = require('passport');
	const { InvalidArgumentError } = require('../erros');
	const  allowlist = require('../../redis/allowlist-refresh-token');
	const  Usuario = require('./usuarios-modelo');
	const  tokens = require('./tokens')
	  

	module.exports = {
		local(req, res, next) {...},
		  
		bearer(req, res, next) {...},
		  
		async  refresh(req, res, next) {
			try {
				const { refreshToken } = req.body;
				const  id = await  tokens.refresh.verifica(refreshToken);
				await  tokens.refresh.invalida(refreshToken);
				req.user = await  Usuario.buscaPorId(id);
				return  next();
			} catch(error) {
				if(error.name === 'InvalidArgumentError') {
					return  res.status(401).json( { error:  error.message } )
				}
				return  res.status(500).json( { error:  error.message } )
			}
		}
	};
&nbsp;
### Criando e testando verificação de e-mails:
> Em nosso projeto implementaremos a verificação de e-mail, para um sistema de defesa mais eficás contra falsos e-mails, para isso usaremos uma dependência chamada `nodemailer` que irá enviar e-mails de verificação para o usuario criado.

> No terminal instalamos a dependência `nodemailer` para nos auxiliar na verificação de e-mails
> 
> - Usamos `npm install nodemailer@6.4.8` para instalar

>  Em `/src/usuarios` criamos um novo arquivo chamado `emails.js` para tratar de e-mails

> Dentro de `/src/usuarios/email.js`
> - Importamos o `nodemailer` com `const nodemailer = require('nodemailer');`
> 
> - Criamos a função `async enviaEmail(usuario) {}` para realzar a verificação de email
> 
> - Dentro da função adicionamos uma conta teste para realizar testes com o `nodemailer` para isso usamos `const testAccount = await nodemailer.createTestAccount();`
> 
> - Com isso criamos o `transporter` que será responsavel por enviar a verificação ao email, `const transporter = nodemailer.createTransporter({ host: 'smtp.ethereal.email',auth: testAccount, });`
> 
> - Para enviar basta adicionarmos `const info =  await transporter.sendMail({ from: 'noreply@blogcode.com.br', to: usuario.email,subject: 'Teste de email', text: 'Este é um e-mail de teste!!!', html: '<h1>Olá!</h1><p>Este é um e-mail de teste!</p>' });`
> 
> - E recuperamos o link gerado com `console.log('URL criada:' + nodemailer.getTestMessageUrl(info));`
> 
> - Ao finalizar a função `enviaEmail` exportamos com `module.exports = { enviaEmail };`

##### Resultados: 

	const  nodemailer = require('nodemailer')
	  
	async  function  enviaEmail(usuario) {
		const  testAccount = nodemailer.createTestAccount();
		const  transporter = nodemailer.createTransport({
			host:  'smtp.ethereal.email',
			auth:  testAccount
		})
		const  info = transporter.sendMail({
			from:  'noreply@blogcode.com.br',
			to:  usuario.email,
			subject:  'Teste de email',
			text:  'Este é um teste de e-mail',
			html:  '<h1>Olá!</h1><p>Este é um teste de e-mail</p>'
		})
		  
		console.log(`URL criada: ${nodemailer.getTestMessageUrl(info)}`)
	};
	  
	module.exports = { enviaEmail }

&nbsp;
> Em `/src/usuarios/usuarios-controlador.js`
> - Importamos o `email.js` com `const emails = require('./email')`
> 
> - Dentro da função `adiciona` após `await usuario.adiciona();` adicionamos `emails.enviaEmail(usuario).catch(console.log);`

##### Resultados: 


	...
	async  adiciona(req, res) {
		const { nome, email, senha } = req.body;
		  
		try {
			const  usuario = new  Usuario({
				nome,
				email,
			});
			await  usuario.adicionaSenha(senha);
			await  usuario.adiciona();
			  
			emails.enviaEmail(usuario).catch(console.log);
			  
			res.status(201).json();
		} catch (erro) {
			if (erro  instanceof  InvalidArgumentError) {
				return  res.status(400).json({ erro:  erro.message });
			}
			res.status(500).json({ erro:  erro.message });
		}
	},
	...
&nbsp;
### Configurando e-mails do banco de dados:
> Em `/src/usuarios/emails.js`
> - Uma funcionalidade interessante que podemos implementar é nosso projeto ter a capacidade de enviar mais de um tipo de e-mail, podendo por exemplo enviar e-mails não somente de verificação, mas também de notificações e recuperar senha por exemplo, seguindo esse modelo.
> 
> - Antes da função `enviaEmail(usuario)` criamos uma classe chamada Email `class Email {}`
> 
> - Nessa classe terá toda a configuração do `.sendMail({})` utilizada no projeto
> 
> - Primeiro passo é transformar a função `enviaEmail(usuario, url)` em um método de `class Email {}`
> 
> - Para isso basta pegarmos a função `enviaEmail` e adicionar dentro da classe `class Email {}` removendo apenas a palavra `function` da função para transformar ela em um método de `class Email {}`
> 
> - Agora adicionamos uma nova classe para realizarmos um `constructor` para as definições de `sendMail({})`
> 
> - Criamos a classe `class EmailVerificacao extends Email {}` que dentro dela conterá um `constructor(usuario) {}`
> 
> - Dentro do `constructor` adicionamos `super();` para herdar métodos de `Email` e em seguida começamos a implementar as deficições de `sendMail({})`
> 
> - Aplicamos então valor para from: `this.from = '"Blog do Código" <noreply@blogdocodigo.com.br>';`
>
> - Valor para to: `this.to = usuario.email;`
> 
> - Valor de subject: `this.subject = 'Verificação de e-mail';`
> 
> - Valor de text: `this.text = 'Olá! Verifique seu e-mail aqui: ' + endereço;`
> 
> - Valor de html: `this.html = 'Olá! Verifique seu e-mail aqui: ' + endereço;`
> 
> - Agora apenas exportamos em vez de `enviaEmail` usamos `EmailVerificacao`

##### Resultados: 

	const  nodemailer = require('nodemailer')
	  
	class  Email {
		async  enviaEmail(usuario) {
		const  testAccount = await  nodemailer.createTestAccount();
		const  transporter = nodemailer.createTransport({
			host:  'smtp.ethereal.email',
			auth:  testAccount
		})
		const  info = await  transporter.sendMail(this)
		console.log(`URL criada: ${nodemailer.getTestMessageUrl(info)}`)
		};
	};
	  
	class  EmailVerificacao  extends  Email {
		constructor(usuario, url) {
			super();
			this.from = `"Blog do Código" <noreply@blogdocodigo.com.br>`;
			this.to = usuario.email;
			this.subject = `Verificação de e-mail`;
			this.text = `Olá! Verifique seu e-mail aqui: ${url}`;
			this.html = `<h1>Olá!</h1> <p>Verifique seu e-mail <a href="${url}">aqui</a></p> `;
		};
	};
	 
	module.exports = { EmailVerificacao }
&nbsp;
> Atualizamos o código em `/src/usuarios/usuarios-controlador.js`
> - Alteramos o código `emails.enviaEmail(usuario).catch(console.log);` para `const url = 'localhost:3000/usuarios/verifica_email/' + usuario.id;`
> 
> - Implementamos também `const emailVerificacao = new EmailVerificacao(usuario, url)` e `emailVerificacao.enviaEmail().catch(console.log)` para assim podermos verificar o e-mail

##### Resultados:

	const  Usuario = require('./usuarios-modelo');
	const { InvalidArgumentError } = require('../erros');
	const  tokens = require('./tokens');
	const { EmailVerificacao } = require('./email');
	  
	module.exports = {
		async  adiciona(req, res) {
			const { nome, email, senha } = req.body;
			  
			try {
				const  usuario = new  Usuario({
				nome,
				email,
				});
				await  usuario.adicionaSenha(senha);
				await  usuario.adiciona();
				  
				const  url = 'localhost:3000/usuario/verifica_email/' + usuario.id;
				const  emailVerificacao = new  EmailVerificacao(usuario, url);
				emailVerificacao.enviaEmail().catch(console.log)
				  
				res.status(201).json();
			} catch (erro) {
				if (erro  instanceof  InvalidArgumentError) {
				return  res.status(400).json({ erro:  erro.message });
			}
				res.status(500).json({ erro:  erro.message });
			}
		},
		  
		async  login(req, res) {...},
		  
		async  logout(req, res) {...},
		  
		async  lista(req, res) {...},
		  
		async  deleta(req, res) {...}
	}; 

&nbsp;
### Arrumando erro do id do usuarios igual a undefined:
> O erro de `ùsuario.id` undefined é por conta da função `adiciona` que no momente em que adiciona o usuario no banco de dados, as únicas informações que podemos resgatar dele é `email`, `nome` e `senhaHash`. Então para ter acesso ao `id` do usuario precisamos alterar uma configuração no `usuarios-modelos.js`

> Em `/src/usuarios/usuarios-modelo.js`
> - Após o `await  usuariosDao.adiciona(this);` da função `asycn adiciona()` implementamos `const { id } = await usuarioDao.buscaPorEmail(this.email);`
> 
> - Assim adicionamos em seguida `this.id = id;`

##### Resultados: 

	...
	async  adiciona() {
		if (await  Usuario.buscaPorEmail(this.email)) {
			throw  new  InvalidArgumentError('O usuário já existe!');
		}
	  
		await  usuariosDao.adiciona(this);
		const { id } = await  usuariosDao.buscaPorEmail(this.email);
		this.id = id;
	};
	...

&nbsp;
###  Organizando a URL de verificação:
> Um dos problemas do nosso código é que a URL de verificação que é `'localhost:3000/usuario/verifica_email/' + usuario.id` só funcionará em ambiente de desenvolvimento, deixando assim a URL inacessível em produção. Para isso criaremos uma função que gerará URLs para verificação de e-mail, independentemente do nosso projeto estar em produção ou desenvolvimento.

> Em `/src/usuarios/usuarios-controlador.js`
> - Antes de `module.exports = {...}` criamos a função `geraURL(rota, id) {...}`
> 
> - Nessa função adicionaremos uma base de rota `const baseURL = 'localhost:3000'`
> 
> - Por fim retornamos uma concatenação da `baseURL`, com a `rota` e `id`
> 
> - Assim, em vez de usar dentro da função `adiciona` a const com a URL, apenas chamamos a função `geraURL` a passamos os parametro `'/usuario/verifica_email'` e `usuario.id` nessa função: `const URL = geraURL('/usuario/verifica_email', usuario.id);`

##### Resultados: 

	const  Usuario = require('./usuarios-modelo');
	const { InvalidArgumentError } = require('../erros');
	const  tokens = require('./tokens');
	const { EmailVerificacao } = require('./email');
	  
	function  geraURL(rota, id) {
		const baseURL = "localhost:3000";
		return `${baseURL}${rota}${id}`;
	}
	  
	module.exports = {
		async adiciona(req, res) {
			const { nome, email, senha } = req.body;
			  
			try {
				const usuario = new Usuario({
					nome,
					email,
				});
				await usuario.adicionaSenha(senha);
				await usuario.adiciona();
				  
				const url = geraURL('/usuario/verifica_email', usuario.id);
				const emailVerificacao = new  EmailVerificacao(usuario, url);
				emailVerificacao.enviaEmail().catch(console.log)
				  
				res.status(201).json();
			} catch (erro) {
				if (erro instanceof InvalidArgumentError) {
					return  res.status(400).json({ erro: erro.message });
				}
				res.status(500).json({ erro: erro.message });
			}
		},
			
		async login(req, res) {...},

		async logout(req, res) {...},

		async lista(req, res) {...},

		async deleta(req, res) {...}
	};
&nbsp;
> Fazemos agora uma pequena alteração na `beseURL` para deixar lá em uma variavel de ambiente para facilitar a usabilidade dela no projeto.

> Em `/.env` logo após a `CHAVE_JWT="..."` adicionamos `BASE_URL="localhost:3000"`
##### Resultados

	CHAVE_JWT="..."
	BASE_URL="localhost:3000"
&nbsp;
> Retornamos em `/src/usuarios/usuarios-controlador.js` e alteramos a `baseURL` da função `geraURL` para `baseURL = process.env.BASE_URL;`

##### Resultados: 

	function  geraURL(rota, id) {
			const baseURL = process.env.BASE_URL;
			return `${baseURL}${rota}/${id}`;
		}
&nbsp;
### Criando campo de verificação de e-mails:
> Agora iremos criar a verificação para o campo `emailVerificado` no banco de dados, que dependendo do status do da verificação, o programa permitirá ou não acesso ao serviço.

> Dentro de `/database.js` em `const USUARIOS_SCHEMA` adicionamos uma nova linha com o conteúdo de `emailVerificado INTEGER ` logo após de `email VARCHAR(255) NOT NULL UNIQUE,`

##### Resultados:

  

	const  USUARIOS_SCHEMA = `
		CREATE TABLE IF NOT EXISTS usuarios (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			nome VARCHAR(40) NOT NULL,
			email VARCHAR(255) NOT NULL UNIQUE,
			emailVerificado INTEGER,
			senhaHash VARCHAR(255) NOT NULL
		)
	`;

> Alteramos agora em `/src/usuarios/usuarios-dao.js` para que seja suportado essa mudança no banco de dados
> - Na função `adiciona` em `await dbRun()` adicionamos `emailVerificado` logo após de `èmail` 
> 
> - Em seguida colocamos em `VALUES` adicionamos uma `?` para mostrar que apresenta mais um valor
> 
> - Dentro do array após `VALUES` colocamos o valor `usuario.emailVerificado`

##### Resultados: 

	const  db = require('../../database');
	const { InternalServerError } = require('../erros');
	  
	const { promisify } = require('util');
	const  dbRun = promisify(db.run).bind(db);
	const  dbGet = promisify(db.get).bind(db);
	const  dbAll = promisify(db.all).bind(db);
	
	module.exports = {
		async  adiciona(usuario) {
			try {
				await  dbRun(
				`INSERT INTO usuarios (nome, email, emailVerificado, senhaHash)
				VALUES (?, ?, ?, ?)`,
				[
					usuario.nome, 
					usuario.email, 
					usuario.emailVerificado,
					usuario.senhaHash
				]);
			} catch (erro) {
				throw  new  InternalServerError('Erro ao adicionar o usuário!');
			}
		},
		
		async buscaPorId(id) {...},

		async buscaPorEmail(email) {...},
		
		async lista() {...},
		
		async deleta(usuario) {...}
	};

> Atualizamos também em `/src/usuarios/usuarios-modelo.js`
> - Na `class Usuario {}` adicionamos `this.emailVerificado = usuario.emailVerificado;`

##### Resultados:

	const  usuariosDao = require('./usuarios-dao');
	const { InvalidArgumentError } = require('../erros');
	const  validacoes = require('../validacoes-comuns');
	const  bcrypt = require('bcrypt');
	  
	class  Usuario {
		constructor(usuario) {
			this.id = usuario.id;
			this.nome = usuario.nome;
			this.email = usuario.email;
			this.emailVerificado = usuario.emailVerificado;
			this.senhaHash = usuario.senhaHash;
			this.valida();
		}
	...
	};

> Por fim inicializamos ele dentro de `/src/usuarios/usuarios-controlador.js`
> - Na função `adiciona` dentro de  `const usuario = new Usuario({})` adicionamos o campo `emailVerificado: false`

##### Resultados: 

	module.exports = {
		async  adiciona(req, res) {
			const { nome, email, senha } = req.body;
			  
			try {
				const  usuario = new  Usuario({
					nome,
					email,
					emailVerificado:  false
				});
				await  usuario.adicionaSenha(senha);
				await  usuario.adiciona();
				  
				const  url = geraURL('/usuario/verifica_email', usuario.id);
				const  emailVerificacao = new  EmailVerificacao(usuario, url);
				emailVerificacao.enviaEmail().catch(console.log)
				  
				res.status(201).json();
			} catch (erro) {...}
		},


### Modificando novo campo: 
> A função que teremos que implementar agora é a de quando o usuario entrar na rota de verificação que ele pegou no e-mail, o campo `emailVerificado` mude de `false` para `true`

> Para isso iremos na rota `/src/usuarios/usuarios-dao.js`
> - Nele criamos uma função para modificar o campo `emailVerificado` com `asycn modificaEmailVerificado(usuario, emailVerificado) {},`
> 
> - Dentro da função aplicamos um `try {}` e `catch(error) {}`
> 
> - Dentro do `try` adicionamos uma modificação no bando de dados com `await dbRun(UPDATE usuarios SET emailVerificado	= ? WHERE id = ?, [emailVerificado, usuario.id]);`
> 
> - Caso não der certo usamos `throw new InternalServerError('Erro ao modificar verificação de email!')` dentro do `catch`
##### Resultados: 

	async  modificaEmailVeridicado(usuario, emailVerificado) {
		try {
			await  dbRun(`UPDATE usuarios SET emailVerificado = ? WHERE id = ?`,
			[
				emailVerificado,
				usuario.id
			]);
		} catch(error) {
			throw  new  InternalServerError('Erro ao modificar campo: emailVerificado!')
		}
	},

> Após realizar a função a nível do banco de dados, vamos modificar agora em modelos

> Dentro de `/src/usuarios/usuarios-modelo.js`
> -  Criamos a função `async verificaEmail() {}` que recebe `this.emailVerificado = true;` e `await usuariosDao.modificaEmailVerificado(this, this.emailVerificado);`

##### Resultados: 

	async  verificaEmail() {
		this.emailVerificado = true;
		await  usuariosDao.modificaEmailVeridicado(this, this.emailVerificado);
	}

### Implementando a rota: 
> Agora implementamos as rotas de `verificaEmail` para assim poder realizar a mudanda a partir de `modificaEmailVerificado`

> Em `/src/usuarios/usuarios-rotas.js`
> - Criamos um novo `app.route('/usuario/verifica_email/:id').get(usuariosControlador.verificaEmail);` para assim criarmos a rota de verificação de e-mail

##### Resultados: 
	app
		.route('/usuaio/verifica_email/:id')
		.get(usuariosControlador.verificaEmail);

> Agora criaremos a função `verificaEmail` em `/src/usuarios/usuarios-controlador.js`
> - Depois da função `lista` implementamos essa função chamda `async verificaEmail(req, res){}`
> 
> - Dentro da função usamos um `try {}` `catch(error) {}`, dentro do `try` pegamos o id do usuário e verificamos qual usuario está fazendo requisção: `const usuario = await Usuario.buscaPorId(req.params.id);`
> 
> - Assim umas a função que criamos em `usuario`: `await usuario.verificaEmail();`
> 
> - Agora devolvemos uma resposta com: `res.status(200).json({ message: "Valor de E-mail alterado com sucesso!" })`
> 
> - Por fim dentro de `catch` caso tenha dado erro utilizamos: `res.status(500).json({ error: error.message });`

##### Resultados: 

	async  verificaEmail(req, res) {
		try {
			const  usuario = req.user;
			await  usuario.verificaEmail();
			res.status(200).json();
		} catch(error) {
			res.status(500).json({ error:  error.message })
		}
	},
	
> Agora criamos o middleware de `req.user` para essa função em `/src/usuarios/middlesautenticacao.js`
> - Após a função `async refresh` criamos `async verificaEmail(req, res, next)`
> 
> - Nela será buscado o `id`: `const { id } = req.params.id;`
> 
> - Em seguida será buscado  o usuário com esse `id`: `const usuario = await Usuario.buscaPorId(id);`
> 
> - Assim declaramos `req.user` que recebe o resultado de `usuario`: `req.user = usuario;`
> 
> - Por fim usamos o `next();` para continuar os proximos código depois dessa função

##### Resultados: 
  
	...
	module.exports = {
	
		local(req, res, next) {...},

		bearer(req, res, next) {...},

		async  refresh(req, res, next) {...},
		  
		async  verificaoEmail(req, res, next) {
			const { id } = req.params;
			const  usuario = await  Usuario.buscaPorId(id);
			req.user = usuario;
			next();
		}
	};

> Agora podemos atualizar as rotas de para receber esse middleware em `/src/usuarios/usuarios-rotas.js`
> - Em `.get(usuariosControlador.verificaEmail);` substituimos por `.get(middlewaresAutenticacao.verificaoEmail, usuariosControlador.verificaEmail);`

##### Resultados: 

	app
		.route('/usuario/verifica_email/:id')
		.get(middlewaresAutenticacao.verificaoEmail, usuariosControlador.verificaEmail);

### Aumentando a segurança na verificação de e-mail:
> Com o uso de uma rota fixa para verificação `/usuarios/verifica_email` e o uso do `id` do usuário, possibilita uma vulnerabilidade ao validar o e-mail, podendo assim ser facilmente chutado pelo atacante e com isso validando um e-mail falso.

> Para isso iremos utilizar um token JWT para validar a rota, começamos sua implementação em `/src/usuarios/tokens.js`
> - Após a implementação de `refresh: {}` criamos: `verificacaoEmail: {}`
> 
> - Adicionamos os componentes `nome: 'Token de verificação de e-mail'`, `expiracao: [1, 'h']`
> 
> - Agora criamos os métodos `cria(id) {}` e `verifica(token) {}`
> 
> - Em `cria(id) {}` adicionamos `return criaTokenJWT(id, this.expiracao);`
> 
> - E no método `verifica(token) {}` usamos `return verificaTokenKWT(token, this.nome);`
> 
> - Para evitar erros, vamos na função `verificaJWT(...) {...}` adicionamos `if(!blocklist) { return; }`, para a situação atual, que não apresenta blocklist
##### Resultados;

  
	...
	async  function  verificaJWT(token, blocklist, name) {
		if(!blocklist) {
			return;
		}
		await  verificaTokenNaBlocklist(token, blocklist, name);
		const { id } = jwt.verify(token, process.env.CHAVE_JWT);
		return  id;
	};
	...

	module.exports = {
	
		access: {...},

		refresh: {...},
		  
		email: {
		
			name:  'Verificação de e-mails',
			expiration: [1, 'h'],
			
			cria(id) {
				return  criaTokenJWT(id, this.expiration);
			},
			  
			verifica(token) {
				return  verificaJWT(token, this.name);
			}
		}
	};

> Agora aplicamos esse token no nosso projeto na rota `/src/usuarios/usuarios-controlador.js`
> - Na função adiciona adicionamos próximo a configuração das rotas de verificação de email: `const token = tokens.emai.cria(usuario.id);`
> 
> - Em `const url` substituimos o `usuario.id` por `token`
> 
> - Alteramos també na função `geraURL` onde apresenta `id` alteramos para `token`

##### Resultados

	...
	
	function  geraURL(rota, token) {
		const  baseURL = process.env.BASE_URL;
		return  `${baseURL}${rota}/${token}`;
	};
	  
	module.exports = {
		async  adiciona(req, res) {
			const { nome, email, senha } = req.body;
			  
			try {
				const  usuario = new  Usuario({
				nome,
				email,
				emailVerificado:  false
				});
				await  usuario.adicionaSenha(senha);
				await  usuario.adiciona();
				  
				const  token = tokens.email.cria(usuario.id);
				const  url = geraURL('/usuario/verifica_email', token);
				const  emailVerificacao = new  EmailVerificacao(usuario, url);
				emailVerificacao.enviaEmail().catch(console.log);
				  
				res.status(201).json();
			} catch (erro) {
				if (erro  instanceof  InvalidArgumentError) {
					return  res.status(400).json({ erro:  erro.message });
				}
				res.status(500).json({ erro:  erro.message });
			}
		},
		...
	};

> Agora atualizamos em `/src/usuarios/usuarios-rotas.js` na rota que recebe `.route('/usuario/verifica_email/:id')`
> - Alteramos assim em vez de `:id` colocamos `:token`

##### Resultados: 
	app
		.route('/usuario/verifica_email/:token')
		.get(middlewaresAutenticacao.verificaoEmail, usuariosControlador.verificaEmail);

> Fazemos agora o suporte em `/src/usuarios/middlewares-autenticacao.js`
> - No método `verificaEmail` alteramos `{ id }` para `{ token }`
> 
> - Logo após criamos: `const id = await tokens.verificaEmail.verifica(token);`
> 
> - Por fim realizamos o tratamento de erro com `try {}` e `catch(error) {}`
> 
> - No `try` encapsulamos todo o nosso codigo, e em `catch(error) {}` usamos: `if(error.name === 'JsonWebTokenError') {return res.status(401).json({ error: error.message })}`
> 
> - E para tratar erro de expiração: `if(error.name === 'TokenExpiredError') { return res.status(401).json({ error: error.message, expiradoEm: error.expireAt }); }`
> 
> - E por fim o erro interno: `return res.status(500).json({ error: error.message });`

##### Resultados: 

	module.exports = {
		async  verificaoEmail(req, res, next) {
			try {
				const { token } = req.params;
				const  id = tokens.email.verifica(token);
				const  usuario = await  Usuario.buscaPorId(id);
				req.user = usuario;
				next();
			} catch(error) {
				if(error.name === 'JsonWebTokenError') {
				return  res.status(401).json({ error:  error.message })
				};
				  
				if(erro.name === 'TokenExpiredError') {
				return  res.status(401).json({
				error:  error.message,
				expiradoEm:  error.expireAt });
				};
				  
				return  res.status(500).json({ error:  error.message });
			}
		}
	};
	
### Enviando e-mails reais: 
> Em `/src/usuarios/email.js`
> - Antes das classes criamos a função `configurationEmail()` que conterá a configuração de `host` e `auth` para que haja a diferenciação de meio de produção para desenvolvimento
> 
> - Assim dentro da função implementamos: `if(process.env.NODE_ENV === 'production') { return configurateProd; } else { const accountTest = await nodemailer.createTestAccount(); return configurateDev(contaTeste);}`
>
> - Criamos a função `configurateTest` com: `const configurateDev = (accountTest) => ({ host: 'smtp.ethereal.email', auth: accountTest });`
> 
> - Agora implementamos a função `configurateProd` com: `const configurateProd = { host: process.env.EMAIL_HOST, auth: { user: process.env.EMAIL_USUARIO, pass: process.env.EMAIL_SENHA }, secure: true }`
##### Resultados:

	
	const  nodemailer = require('nodemailer')
	  
	const  configurateProd = {
		host:  process.env.EMAIL_HOST,
		auth: {
			user:  process.env.EMAIL_USUARIO,
			pass:  process.env.EMAIL_SENHA
		},
		secure:  true
	};
	  
	const  configurateDev = (testAccount) => ({
		host:  'smtp.ethereal.email',
		auth:  testAccount
	});
	 
	  
	async  function  configuration() {
		if(process.env.NODE_ENV === 'production') {
			return  configurateProd;
		} else {
			const  testAccount = await  nodemailer.createTestAccount();
			return  configurateDev(testAccount);
		}
	};
	  
	class  Email {
		async  enviaEmail() {
			const  transporter = nodemailer.createTransport(configuration);
			const  info = await  transporter.sendMail(this)
			console.log(`URL criada: ${nodemailer.getTestMessageUrl(info)}`)
		};
	};

> Agora configuramos o `.env` com esses atributos adicionados no ultimo tópico
##### Resultados: 

	CHAVE_JWT="..."

	BASE_URL="...."
	  
	NODE_ENV="production"
	  
	EMAIL_HOST="your type email"
	EMAIL_USUARIO="your email"
	EMAIL_SENHA="your password"



# Curso de Implemtentação de Refresh Tokens e verificação de e-mail finalizado !!!