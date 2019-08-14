# About

This repo is a starting point for a fullstack web app, written in TypeScript, which includes

* NextJS
* Apollo Server
* Apollo Client
* Apollo Engine
* Prisma ORM
* Prisma Nexus
* Auth0

## NextJS
React - with the abillity to have SSR code on demand. AMP & PWA ready.

## Prisma
Connecting to a Heroku PostgreSQL Database and run queries.

## Prisma Nexus
Auto generating code for GraphQL resolvers based on the schema.

## Apollo Server
GraphQL Server with auto caching queries and more usefull tools.

## Apollo Client
Query Lib for GraphQL on the clientside. Abillity to cache & run optimistic mutations.

## Apollo Engine
Track changes to a GraphQL schema within a team.

## Auth0
Scalable AaaS solution with roles & groups.

# Requirements

* Node
* NPM
* Docker
* Now CLI
* Apollo CLI (codegen & engine)
* Prisma CLI

# Init
`cd api && npm run docker`

# Run

`npm run dev:start:frontend`
`npm run dev:start:backend`

# Changing Prisma & Apollo Schema

`cd api && npm run prisma:deploy:dev`
`cd ../ && npm run dev:codegen`
