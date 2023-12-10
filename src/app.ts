import express, { Express } from 'express';
import cors from 'cors';
import * as http from 'http';
import mongoose from 'mongoose';
import VisualizationRoutes from './routes/visualization/visualization';
import ProjectRoutes from './routes/project/project';

require('dotenv').config();

export default class Illustry {
  private expressApp: Express = express();

  private httpServer: http.Server | undefined;

  constructor() {
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
  }

  async start(): Promise<void> {
    return Promise.resolve().then(() => {
      this.httpServer = this.expressApp.listen(
        process.env.ILLUSTRY_PORT,
        () => {
          console.log(`server is listening on ${process.env.ILLUSTRY_PORT}`);
        }
      );
      this.httpServer.on('error', (error) => {
        console.error(error);
      });
    });
  }

  async stop(): Promise<void> {
    return Promise.resolve().then(async () => {
      this.httpServer?.close();
      await mongoose.disconnect();
    });
  }
}
