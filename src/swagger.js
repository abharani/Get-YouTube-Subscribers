// Importing the required dependency
const swaggerJsDoc = require('swagger-jsdoc');

// Getting the port from the environment variable or using a default value
const port = process.env.PORT || 3000;

// Configuring options for Swagger documentation
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Youtube Subscribers API',
            version: '1.0.0',
            description: 'Youtube Subscribers API documentation',
        },
        servers: [
            {
                url: `http://localhost:${port}`, // Use the dynamic port
            },
        ],
    },
    apis: ['./src/app.js'], // Specify the path to the API file or directory to be documented
};

// Generating the Swagger specification using the options
const swaggerSpec = swaggerJsDoc(options);

// Exporting the generated Swagger specification
module.exports = swaggerSpec;