const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.1.0',
    info: {
      title: 'ExpressJS',
      version: '0.1.0',
      description: 'HTTP services.',
      contact: {
        name: 'Andres Orozco',
        url: 'https://github.com/AndresOrozcoDev',
        email: 'andres.orozco.dev@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3005',
        description: 'Local server',
      },
    ],
    tags: [
      {
        name: 'users',
        description: 'Endpoints for managing users',
      }
    ],
    components: {
      schemas: {
        Response: {
          type: 'object',
          properties: {
            status_code: { type: 'integer' },
            message: { type: 'string' },
            data: { 
              type: 'array',
              items: { type: 'object' }
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;