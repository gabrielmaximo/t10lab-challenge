<h1 align="center"> Desafio Backend com nodeJS - <a href="https://t10lab.com">T10LAB</a> </h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/gabrielmaximo/t10lab-challenge.svg">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/gabrielmaximo/t10lab-challenge.svg">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

<p align="center">
  <img alt="Frontend" src=".github/t10lab.png" width="40%">
</p>

## :clipboard: Documentação disponível na [Base URL](https://t10lab.herokuapp.com/#addresses-update-address-put) do projeto

## :warning: Dependências Essenciais
* Node.js 
* Yarn ou Npm
* IDE ou Text Editor ( recomendo o VS Code)
* Insomnia ou Postman (para testar as rotas)
* Ambiente Baseado em Unix (Linux ou Mac), mas também funcionará no windows

## :electric_plug: Sobre o Deploy:
* Fiz o deploy no heroku disponivel em https://t10lab.herokuapp.com
* Eu escolhi o heroku, pois ele oferece até 5 projetos gratuitos, e ele  bem facil de manusear e configurar, mas ele não tem suporte a docker nos projetos gratuitos, por isso utilizei um cloud gratuito do mongo DB de até 512MB para manter a base de dados online junto com o servidor.
* Com isso basta abrir o insomina ou o postman e usar a url do heroku para testar as rotas da aplicação.

## :floppy_disk: Sobre a Base de Dados
* Eu utilizei o MongoDB simplesmente pela questão custo beneficio, sei das desvantagens de usar em banco noSQL em todo o projeto, porém como a aplicação tinha poucos relacionamentos e nesse caso, o mongo se encaixa perfeitamente e deixa mais facil na hora de fazer o deploy e também na hora de codar, graças a um sistema similar a uma ORM feita pela lib mongoose.
* Graças a isso, eu consegui fazer o deploy 100% gratuito para um banco de dados de até 512MB que o cloud do mongo DB atlas oferece.
* Eu também uso bastante bancos SQL como o postgress junto com a ORM do sequelize quando desenvolvo com o express no nodeJS, fiz um repositório que ensino como usar o Sequelize e criar relacionamentos 1:n, 1:1, m:n nessa ORM que é bem parecido com esse teste, caso queira dar uma olhada é só clicar [AQUI](https://github.com/gabrielmaximo/Sequelize-ORM)

## :email: Sobre o serviço de SMTP
* Eu não consegui utilizar o ZIMBRA como vocês sugerem, nunca tinha utilizado ele, tentei encontrar algum tutorial ou suporte para implementar, porém não achei nada que me ajudou. Então optei pelo SENDGRID, um serviço prático, simples, rápido e gratuito, para poder combar com o cloud do mongoDB Atlas e o deploy do heroku obtendo uma API 100% gratuita online.
* Para saber mais como o SENDGRID funciona e como ele é pratico, acesse [AQUI](https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail), ele é o mesmo usado pela Uber, Spotify, AirBnB e etc..
* Toda vez que criar um usuário, você receberá um email de boas vindas no email que cadastrou com a menssagem "Seja bem vindo ao Reino 'nome do usurário aqui'!.
* **OBS:** Verificar se o email no foi para o spam.

## :earth_asia: Sobre o serviço de Geo Location
* Utilizei a Place API do google maps, ao invés da Geocoding API, a diferença entre elas é que a Place API retorna mais informações sobre um local e o token de photo, e a Geocoding retorna mais sobre o endereço mesmo e não retorna fotos, porém a Place API exige que você insira um dado a mais além do endereço, que seria o Place Name, para identificar as fotos daquele local, exemplo: Prefeitura, Center Shopping, T10 Lab, etc..
* Consegui salvar as cordenadas geograficas da pessoa cadastrada com sucesso, porém não consegui as fotos do local, infelizmente, outro detalhe é que fiquei confuso na hora de fazer o endpoint de cadastro de pessoa, pois não sabia se o endereço seria cadastrado junto com a pessoa ou separado, então acabei escolhendo o cadastro do endereço junto ao cadastro de uma pessoa.

## :camera: Sobre o sistema de Bucket
* Infelizmente não consegui obter as fotos da API do google maps, a Place API do google possui mais de um serviço para obter geolocation e fotos, que no caso, é o Place Search e o Place Photos, eu utilize o Place Search para obter as cordenadas geograficas e um token para acessar a foto do local nesse outro serviço chamado Place Photo. Porém essa segunda API me retorna o base64 do arquivo png da imagem, e eu não soube trabalhar com ele para exibi-las e fazer o upload.
* Ja utilizei o serviço AWS S3 da amazon varias vezes, ele é um dos melhores. Porém como não consegui obter um link para a imagem direto da API do google maps, não fiz o upload dela, geralmente eu utilizo o multer para trabalhar com arquivos mult part form, mas com base 64 não deu certo, fico devendo essa parte. Ainda tenho muito o que aprender hehe.

## :arrow_forward: Como executar o projeto?
* Basta instalar as dependencias essenciais, clonar o repositório, instalar as dependências do projeto (eu utilizei o yarn para gerenciar as dependências) disponveis no arquivo package.json, abrir o repositório com sua IDE predileta (eu utilizei o visual studio code).
* Após isso, crie e configure um arquivo .env baseado no .env.example que disponibilizei na raiz do projeto. Após configurar as variaveis ambiente, abra o terminal na raiz do projeto e rode o comando ```yarn start```  para iniciar a aplicação, e com isso ela estará rodando na porta que você configurou no arquivo .env, então acesse http:localhost:porta/ e pronto!
* Para executar as rotas, utilize o insomnia ou o postman, deixei um arquivo de config em JSON para importar no insomnia e facilitar o teste das rotas.

###### enjoy it!
