# suzu3 [![Build Status](https://travis-ci.org/emilnakao/suzu3.svg?branch=master)](https://travis-ci.org/emilnakao/suzu3)

O Suzu 3 é um sistema para controle de presenças e geração de relatórios.

Atenção: Ele ainda está em fase inicial de desenvolvimento, e não tem nenhuma versão utilizável ainda.

## Funcionalidades Previstas

- Cadastro de Tipos de Evento (Cerimônia Mensal, Dia Normal, etc.)
- Cadastro de núcleos/grupos de pessoas
- Cadastro de pessoas

- Tela de checkin para pessoas marcarem presença (livro de presenças digital)
- Busca rápida de nomes já conhecidos

- Relatório de presenças, com classificação por dia, grupos

## Requisitos

- Facilidade de instalação
- Não deve exigir arquitetura cliente - servidor
- Possibilidade de sincronização entre diversos clientes (definir uma instância master, e demais instâncias informam as atualizações para ele)


## Arquitetura

- Desenvolvimento com electron, typescript, react e bootstrap.
- Persistência de dados: PouchDB

## Desenvolvimento

### Pré-requisitos

Ter o NodeJS instalado (https://nodejs.org/en/)

Instale as dependências com:

    npm install

Para rodar:

    npm start
