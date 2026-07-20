import swaggerJSDoc from "swagger-jsdoc";

const swaggerConfig = {
   definition: {
    openapi: '3.0.0',
    info: {
        title: 'Biblioteca-API',
        version: '1.0.0'
    },
    components: {
        securitySchemes: {
        BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
        }
     },
        schemas: {
            Livro: {
                type: "object",
                required: [
                    "titulo", 
                    "autor"
                ],
                properties: {
                    _id: {
                        type: "string"
                    },
                    titulo: {
                        type: "string"
                    },
                    autor: {
                        type: "string"
                    },
                    disponibilidade: {
                        type: "boolean"
                    },
                    capa: {
                        type: "string"
                    }

                }
                  
            },
         CredenciaisUsuario: {
            type: "object",
            required: [
                "email",
                "senha"
            ],
            properties: {
                email: {
                    type: "string",
                    example: "usuario@email.com"
                },
                senha: {
                    type: "string",
                    example: "1234T6"
                }
            }
         },
         TokenJWT: {
            type: "object",
            required: [ "token" ],
            properties: {
                token: {
                    type: "string",
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                }
            }
         },
         MensagemSucesso: {
            type: "object",
            required: [ "mensagem" ],
            properties: {
                mensagem: {
                    type: "string",
                    example: "Operação realizada com sucesso"
                }
            }
         }
      }
    }
   },
   apis:["./src/routes/*.js"], 
}

const swaggerDocument = swaggerJSDoc(swaggerConfig);

export default swaggerDocument;