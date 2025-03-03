const express = require('express');
const server = express();
const projectRouter = require('./data/projectRouter');
const actionRouter = require('./data/actionRouter');
const helmet = require('helmet');
server.use(express.json());
server.use(helmet());

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

module.exports = server;