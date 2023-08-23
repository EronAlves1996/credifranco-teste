# Teste Credfranco

Repositório contendo teste técnico para empresa Credfranco.

## Stack Utilizada

- Typescript
- Next.js 13
- PHP 8.2
- Laravel 10
- Laravel Sanctum
- MySQL

## Estrutura de Páginas do Frontend

- `/`: Página inicial, contém tela de login;
- `/clients`: Área de clientes;
- `/manager`: Área do gerente;
- `/manager/clients`: Área onde lista todos os clientes cadastrados;
- `/manager/products`: Área onde cadastra um novo produto e lista todos os produtos em promoção cadastrados.

As páginas `/clients` e `/manager` e suas respectivas filhas são protegidas através do layout que está sob o grupo `(protected)`.

Foi feita esta proteção somente via client side, visto que toda a infraestrutura que suporta a aplicação está localizada diretamente no backend

## Rotas do Backend

- `GET /sanctum/csrf-cookie`: Rota que fornece o token de CSRF para proteger o backend de ataques CSRF;
- `POST /api/login`: Rota que autentica e persiste a seção do usuário;
- `POST /api/logout`: Rota que invalida a seção do usuário, deslogando-o;
- `GET /api/user`: Rota que devolve a informação do usuário logado atualmente;
- `PUT /api/user/{id}`: Rota para atualização das informações do usuário;
- `POST /api/products`: Rota para inclusão de um produto nas promoções disponíveis;
- `GET /api/products`: Rota que retorna todos os produtos em promoção salvos;
- `GET /api/clients`: Rota que retorna informação de todos os clients.

## Estrutura do Banco de Dados

- **Tabela 'users'**

  - `id`: Inteiro auto-incrementável
  - `name`: varchar(255)
  - `identification`: varchar(255)
  - `identification_type`: enum('cpf', 'gerente')
  - `role`: enum('MANAGER', 'CLIENT')
  - `password`: varchar(255)
  - `accumulated_points`: inteiro
  - `created_at`: timestamp
  - `updated_at`: timestamp

- **Tabela 'products'**
  - `id`: Inteiro auto-incrementável
  - `product`: varchar(255)
  - `price`: natural de precisão (8,2) sem sinal
  - `discount`: inteiro sem sinal
  - `created_at`: timestamp
  - `updated_at`: timestamp

## Design do Frontend

O design do frontend foi feito de forma bem simples, utilizando somente representações que lembram wireframes, onde, só foram feitas para dar uma base visual para as funcionalidades do frontend.

A tela inicial é parecida com o design abaixo:

![image](design/2.1%20-%20Login%20Component%20Wireframe.png)

A área do gerente contém só um componente atualmente e é parecida com o design abaixo:

![image](design/6%20-%20Manager%20Screen.png)

A área do gerente para gerenciar produtos é parecida com o design abaixo:

![image](design/4.1%20-%20Product%20screen.png)

A área do gerente para listar os clientes é parecida com o design abaixo:

![image](design/7%20-%20clients%20list%20screen.png)

A área do cliente é parecida com o design abaixo:

![image](design/5.1%20-%20client%20area.png)

Na pasta `design` há outros modelos mais antigos de design que não foram utilizados devido mudanças nos requerimentos e amadurecimento do projeto

## Rodando o Projeto

1 - Inicialize o banco de dados com o nome de sua preferência. Aqui irei usar o nome `credfranco`:

```sql
CREATE DATABASE credfranco
```

2 - Após inicializar o banco de dados, configure o seu `.env`, na pasta `src/back`, seguindo o exemplo fornecido no `.env.example`. Todos os campos são essenciais. Se for rodar com o banco de dados `credfranco` rodando no mysql, localmente, então as informações do `.env.example` são suficientes, basta renomeá-lo para `.env`.

3 - Instale as dependências do backend, com o seguinte comando:

```sh
composer install
```

4 - Feito isso, faça as migrações e o seed do banco de dados.

```sh
php artisan migrate --seed
```

5 - Após isso rode o seu projeto no backend

```sh
php artisan serve
```

6 - Vá na pasta `src/front`, instale as dependências

```sh
npm install
```

7 - Rode o projeto. Ele irá ser servido em `localhost:3000`.

```sh
npm run dev
```

## Testando o projeto

O gerente que o seed irá criar possui as seguintes credenciais:

**id**: GERENTE
**Senha**: 1234gerente

No caso dos clientes, eles são criados através da biblioteca `faker`. Dito isso, a senha é a mesma para todos (`1234`), porém a identificação é gerada de forma aleatória. Faça a consulta no banco de dados após o seed para pegar uma identificaçao de cliente:

```sql
USE credfranco;
SELECT * from users;
```

Como ainda não há a funcionalidade de logout, os testes deverão ser feitos em browser de modo anônimo.
