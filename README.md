# Go Baber

Este é um projeto que está sendo criado ao longo do treinamento goStack da Rocketseat. Embora o código de preferência para a língua inglesa, essas anotações serão feitas em português, pois escrevo ao mesmo tempo que assisto a aula e ainda não tenho fluência suficiente para escrever corretamente em inglês ao mesmo tempo que estou vendo um vídeo em português.

O backend utiliza Node com a biblioteca `express`, entre outras, que podem ser instaladas com o comando `yarn` dentro do diretório do projeto.

O código está organizado nos seguintes diretórios:
- **rotes** contém as rotas que podem ser acessadas pelos clientes.
- **models** descrevem os tipos de entidades, com suas propriedades, que serão utilizados no projeto.
- **repositories** códigos responsáveis por manipular entidades da aplicação, terão funcionalidades como _criar_, _listar_, _filtrar_, etc
- **services** códigos responsáveis pelas regras de negócio de uma maneira geral. Cada arquivo nesse diretório será responsável por uma única regra de negócio.
- **database** código que conecta ao banco de dados, juntamente com as migrations. Veja mais detalhes sobre o banco na seção de banco de dados.

## Banco de Dados
O sistema utiliza banco de dados Postgres com o TypeORM rodando em um Docker. As confugurações estão no arquivo `ormconfig.json`. A conexão é feita importando o `index.ts` da pasta database. As tabelas criadas são:
- appointments
  - id: varchar, primary, generationStrategy uuid, default uuid_generate_v4()
  - provider: varchar
  - date: timestamp with time zone
  - created_at: timestamp, default now()
  - updated_at: timestamp, default now()
- users
  - id: varchar, primary, generationStrategy uuid, default uuid_generate_v4()
  - name: varchar
  - password: varchar
  - email: varchar, unique
  - created_at: timestamp, default now()
  - updated_at: timestamp, default now()


## Funcionalidades do Sistema

### Recuperação de senha
#### Requisitos Funcionais
- [ ] O usuário pode recuperar sua senha informando o seu e-mail;
- [ ] O usuário recebe um e-mail com instruções de recuperação de senha;
- [X] O usuário pode resetar a senha;

#### Requisitos Não Funcionais
- [ ] Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- [ ] Utilizar Amazon SES para envios em ambiente de produção;
- [ ] O envio de e-mail deve acontecer em segundo plano;

#### Regras de Negócio
- [X] O link enviado por e-mail para resetar a senha deve expirar em 2 horas;
- [ ] O usuário precisa confirmar a sua senha ao resetar a senha;

### Atualização do Perfil
#### Requisitos Funcionais
- [ ] O usuário pode atualizar seu nome, e-mail e senha;

#### Regras de Negócio
- [ ] O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- [ ] Para atualizar sua senha, o usuário deve informar a senha antiga;
- [ ] Para atualizar sua senha, o usuário precisa confirmar a nova senha;

### Painel do Prestador
#### Requisitos Funcionais
- [ ] O usuário pode listar seus agendamentos em um dia específico;
- [ ] O prestador recebe uma notificação sempre que houver um novo agendamento;
- [ ] O prestador pode visualizar as notificações não lidas;

#### Requisitos Não Funcionais
- [ ] Os agendamentos do prestador no dia devem ser armazenados em cache;
- [ ] As notificações do prestador devem ser armazenadas no MongoDB;
- [ ] As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io;

#### Regras de Negócio
- [ ] A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

### Agendamento de Serviços
#### Requisitos Funcionais
- [ ] O usuário pode listar todos os prestadores de serviço cadastrados;
- [ ] O usuário pode listar os dias de um mês com pelo menos um horário disponível de um prestador;
- [ ] O usuário pode listar os horários disponíveis em um dia específico de um prestador;
- [ ] O usuário pode realizar um novo agendamento com um prestador;

#### Requisitos Não Funcionais
- [ ] A listagem de prestadores deve ser armazenada em cache;

#### Regras de Negócio
- [ ] Cada agendamento deve durar exatamente 1 hora;
- [ ] Os agendamentos devem estar disponíveis entre 8h e 18h (Primeiro às 8h, último às 17h);
- [ ] O usuário não pode agendar em um horário já ocupado;
- [ ] O usuário não pode agendar em um horário que já passou;
- [ ] O usuário não pode agendar serviços consigo mesmo;
