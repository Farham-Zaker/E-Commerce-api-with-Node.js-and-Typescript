import express, { Express } from "express";
const server: Express = express();

import projectConfigs from "./projectConfigs";
projectConfigs(server);

import api from "./api/api";
server.use(api);

import errorHandler from "./errorHandler";
server.use(errorHandler);

import config from "./config/config";

const port: number = config.port;
server.listen(port, (): void => {
  console.log(`The server is listening on port ${port}`);
});
