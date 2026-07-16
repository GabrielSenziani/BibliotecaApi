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
     }
    }
   },
   apis:["./src/routes/*.js"], 
}

const swaggerDocument = swaggerJSDoc(swaggerConfig);

export default swaggerDocument;