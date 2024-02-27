import http from "node:http";
import cors from 'cors';
import { AddressInfo } from "node:net";

import express, { Express } from "express";

import { config } from "@core/config/config";
import { healthRouter } from "@core/health/api/health-router";

import { userRouter } from "@contexts/users/api/user-router";

const allowedOrigins = ['http://wepardo.services:8080', 'http://wepardo.services:80', 'http://wepardo.services:443', 'http://wepardo.services:3001', "http://wepardo.services/"];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

export class Server {
  private readonly app: Express;
  private httpServer?: http.Server;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use("/health", healthRouter);
    this.app.use("/api/users", userRouter);
    this.app.use("/", userRouter);
  }

  async start(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.app.listen(config.server.port, () => {
        const { port } = this.httpServer?.address() as AddressInfo;
        // eslint-disable-next-line no-console
        console.log(`App is ready and listening on port ${port} 🚀`);
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }

  getHttpServer(): http.Server | undefined {
    return this.httpServer;
  }
}
