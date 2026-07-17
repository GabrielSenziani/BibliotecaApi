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
                  
            }
      }
    }
   },
   apis:["./src/routes/*.js"], 
}

const swaggerDocument = swaggerJSDoc(swaggerConfig);

export default swaggerDocument;