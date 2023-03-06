# _Back-end_

### Tecnologias:
 > **Banco de Dados:** MongoDB Atlas
 > **Motor:** Node.JS  .v16.17.1
 > **Dependências:** 
 > - Express
 > - Nodemon
 > - Multer
 > - Morgan
 > - Mongoose
 > - Dotenv

### Preparando o Ambiente:
> Exclua todos os arquivos presentes na pasta `/temp/uploads`

### Configurando:
> Instale todas as dependências usando `npm install`

> Para utilizar o banco de dados, faça a conexão alterando o valor de `MONGO_URL` em `.env` para o seu banco de dados Mongo Atlas.
> 
> Em seguida inicie a aplicação usando `npm run dev`

### Objetivo: 
> Essa aplicação tem o objetivo de salvar imagens tanto no disco local do `multer` quanto no banco de dados por meio da URL da imagem. Fazendo assim o Front-End ter acesso as imagens por meio de suas URLs.