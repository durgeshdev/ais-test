'use strict';

const express = require('express');
const app = express();
module.exports = app; // for testing

const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const morgan = require('morgan');
const path = require('path');

require('dotenv').config();


require('./config/db');

app.use(express.json());
app.use(cors())

const appRoutes = require("./api/routes/App");
app.use(appRoutes);


// Serve the Swagger documents and Swagger UI
const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.disable('x-powered-by');

const server = require('http').createServer(app);

app.use(function (req, res, next) {
    // req.io = io;
    next();
});

const port = process.env.PORT || 10010;
server.listen(port, () => console.log(`Listening on port ${port}`));