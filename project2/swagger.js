const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'User Contacts API',
        description: 'API for managing user contacts',
    },
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/users-route.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
    await import('./server.js')
});
