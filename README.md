# FoodExplorer API 

## Sobre o Projeto

A FoodExplorer API é uma solução inovadora desenvolvida por mim para o Desafio Final do curso Explorer da Rocketseat. Esta API robusta e confiável foi projetada para transformar a gestão de catálogos de pratos em restaurantes, incorporando funcionalidades avançadas como cadastro, atualização, exclusão, e listagem de pratos, além de autenticação de usuários e controle de acesso diferenciado. Com o uso de tecnologias de ponta e uma arquitetura planejada para escalabilidade, o FoodExplorer API está preparado para implementação e melhorias em ambientes reais, oferecendo uma solução completa para digitalizar a experiência gastronômica.

## Funcionalidades Principais

- **Autenticação  e autorização de Usuários**: Segurança reforçada com login e registro utilizando JWT, garantindo que apenas usuários autenticados possam acessar a aplicação e funcionalidades específicas.
- **Gerenciamento de Pratos**: Facilita a adição, listagem, modificação e remoção de pratos, simplificando o controle do catálogo.
- **Busca Avançada**: Permite aos usuários encontrar pratos por nome, categoria ou ingredientes, melhorando a experiência de busca.
- **Níveis de Acesso**: Implementa controles de acesso para administradores e clientes, assegurando a execução segura de operações críticas.
- **Upload de Imagens**: Oferece suporte para o upload de imagens dos pratos, enriquecendo a apresentação do catálogo.

## Tecnologias Utilizadas

- **Node.js** e **Express**: Para construção de uma API eficiente e escalável.
- **JWT (JSON Web Tokens)**: Para autenticação segura e gestão de sessões.
- **SQL** e **Knex.js**: Para um gerenciamento de banco de dados e construção de queries.
- **Multer**: Para gerenciamento eficiente de uploads de imagens.
- **PM2**: Para otimização do gerenciamento de processos e garantia de disponibilidade.

## Arquitetura do Projeto

Este projeto adota uma arquitetura baseada na separação clara de responsabilidades, compreendendo:
- **Controllers**: Para o tratamento de requisições e respostas HTTP.
- **Repositories**: Para abstração da lógica de acesso a dados.
- **Services**: Para encapsulamento da lógica de negócios, promovendo reuso e desacoplamento.
- **Middlewares**: Incluindo um middleware de autenticação que verifica a role do usuário, permitindo que apenas administradores executem determinadas ações.

Esta abordagem garante não apenas a escalabilidade do projeto, mas também sua manutenibilidade, facilitando expansões ou modificações futuras.

## Pronto para o Mercado

O FoodExplorer API transcende o escopo de um projeto acadêmico, apresentando-se como uma solução de mercado viável, com apenas alguns ajustes estará  pronta para implementação. Graças à sua base sólida, uso de tecnologias atualizadas e arquitetura pensada para o futuro, este projeto é ideal para restaurantes que buscam inovar no gerenciamento de seus catálogos de pratos e proporcionar uma experiência digital aprimorada aos seus clientes.
