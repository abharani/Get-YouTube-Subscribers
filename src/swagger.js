// Importing the required dependency
const swaggerJsDoc = require('swagger-jsdoc');

// Getting the port from the environment variable or using a default value
const port = process.env.PORT || 4000;

const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://get-youtube-subscribers-o1sr.onrender.com/'
    : `http://localhost:${port}`;

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
                url: baseUrl, // Use the dynamic port
            },
        ],
    },
    apis: ['./src/app.js'], // Specify the path to the API file or directory to be documented
};

// Generating the Swagger specification using the options
const swaggerSpec = swaggerJsDoc(options);

// Exporting the generated Swagger specification
module.exports = swaggerSpec;