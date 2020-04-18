# Go Baber

Este é um projeto que está sendo criado ao longo do treinamento goStack da Rocketseat. Embora o código de preferência para a língua inglesa, essas anotações serão feitas em português, pois escrevo ao mesmo tempo que assisto a aula e ainda não tenho fluência suficiente para escrever corretamente em inglês ao mesmo tempo que estou vendo um vídeo em português.

O backend utiliza Node com a biblioteca `express`, entre outras, que podem ser instaladas com o comando `yarn` dentro do diretório do projeto.

O código está organizado nos seguintes diretórios:
- **rotes** contém as rotas que podem ser acessadas pelos clientes.
- **models** descrevem os tipos de entidades, com suas propriedades, que serão utilizados no projeto.
- **repositories** códigos responsáveis por manipular entidades da aplicação, terão funcionalidades como _criar_, _listar_, _filtrar_, etc
- **services** códigos responsáveis pelas regras de negócio de uma maneira geral. Cada arquivo nesse diretório será responsável por uma única regra de negócio.
