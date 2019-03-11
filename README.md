FORMAT: 1A
HOST: http://localhost:3000/

# API

## Grupo Tools

Recursos relacionados a ferramentas na API.

## Tools [/tools]

Um objeto ferramenta tem os seguintes atributos:

+ _id 
+ title
+ link
+ description
+ tags - An array of String.

### Lista todas as ferramentas [GET]

+ Response 200 (application/json)

        {
            id: 5c85c473b8c1c75438ec2db2,
        title: "json-server",
        link: "https://github.com/typicode/json-server",
        description: "Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.",
        tags: [
            "api",
            "json",
            "schema",
            "node",
            "github",
            "rest"
            ]
        }


## Coleção de Tools [/tools/{?tag=:tag}]

+ Parametros
    + tag: String 

### Criar uma nova Tool [POST]



+ Tool (string) 

+ Request (application/json)

        {
        title: "json-server",
        link: "https://github.com/typicode/json-server",
        description: "Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.",
        tags: [
            "api",
            "json",
            "schema",
            "node",
            "github",
            "rest"
            ]
        }

### Deletar uma Tool [DELETE]

## Deletar Tool [/tools/{?tag=:tag}]

+ Response (application/json)

{}