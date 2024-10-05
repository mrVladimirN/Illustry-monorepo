import express, { Express } from 'express';
import cors from 'cors';
import * as http from 'http';
import mongoose from 'mongoose';
import VisualizationRoutes from './routes/visualization/visualization';
import ProjectRoutes from './routes/project/project';
import logger from './config/logger';

import 'dotenv/config';

class Illustry {
  private expressApp: Express = express();

  private httpServer: http.Server;

  constructor() {
    const { ILLUSTRY_PORT = '8000' } = process.env;

    this.expressApp.use(
      cors({
        origin: '*',
        methods: 'GET, POST, OPTIONS, PUT, PATH, DELETE',
        allowedHeaders: [
          'Access-Control-Allow-Headers',
          'Content-Type, Authorization'
        ],
        credentials: true
      })
    );

    this.expressApp.use(express.json());
    this.expressApp.use(ProjectRoutes);
    this.expressApp.use(VisualizationRoutes);

    this.httpServer = this.expressApp.listen(+ILLUSTRY_PORT, '0.0.0.0', () => {
      logger.info(`server is listening on ${ILLUSTRY_PORT}`);
    });
  }

  async start(): Promise<void> {
    try {
      await new Promise<void>((resolve, reject) => {
        this.httpServer.on('error', (error) => {
          logger.error(error);
          reject(error);
        });
        this.httpServer.on('listening', () => {
          resolve();
        });
      });
    } catch (error) {
      logger.error('Error on starting Illustry service');
      process.exit(-1);
    }
  }

  async stop(): Promise<void> {
    try {
      this.httpServer.close();
      await mongoose.disconnect();
    } catch (error) {
      logger.error('Error on stopping Illustry service');
      process.exit(-1);
    }
  }
}

export default Illustry;
