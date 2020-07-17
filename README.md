# suzu3 [![Build Status](https://travis-ci.org/emilnakao/suzu3.svg?branch=master)](https://travis-ci.org/emilnakao/suzu3) [![Dependency Status](https://david-dm.org/emilnakao/suzu3.svg)](https://david-dm.org/emilnakao/suzu3) [![Known Vulnerabilities](https://snyk.io/test/github/emilnakao/suzu3/badge.svg)](https://snyk.io/test/github/emilnakao/suzu3)

O Suzu 3 é um sistema para controle de presenças e geração de relatórios.

Atenção: Ele ainda está em fase inicial de desenvolvimento.

## Funcionalidades Previstas

-   Cadastro de Tipos de Evento (Cerimônia Mensal, Dia Normal, etc.)
-   Cadastro de núcleos/grupos de pessoas
-   Cadastro de pessoas

-   Tela de checkin para pessoas marcarem presença (livro de presenças digital)
-   Busca rápida de nomes já conhecidos

-   Relatório de presenças, com classificação por dia, grupos

## Requisitos

-   Facilidade de instalação
-   Não deve exigir arquitetura cliente - servidor
-   Possibilidade de sincronização entre diversos clientes (definir uma instância master, e demais instâncias informam as atualizações para ele)

## Arquitetura

-   Desenvolvimento com electron, javascript, react e bootstrap.
-   Persistência de dados: PouchDB

## Desenvolvimento

### Pré-requisitos

Ter o NodeJS instalado (https://nodejs.org/en/)

Instale as dependências com:

    npm install

Para rodar:

    npm start

### Criando executáveis

    npm run build
    npm run electron-pack

### Desenvolvendo

    npm run electron-dev

### Release

-   Rodar, na branch master:

`npm version prepatch`

(no exemplo usamos prepatch, mas pode ser patch, minor, o que for adequado)

-   Fazer merge na branch prod:

```git checkout prod
    git merge master
```
