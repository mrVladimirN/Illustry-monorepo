import Illustry from './app';
import logger from './config/logger';

let illustry: Illustry;

const cleanup = () => {
  if (illustry) {
    illustry.stop();
  }
  process.exit(-1);
};

const restart = async (): Promise<void> => {
  await illustry.stop();
  illustry = new Illustry();
  await illustry.start();
};

const processUnhandledError = async (error: Error) => {
  logger.error(error.message);
  try {
    await restart();
  } catch (err) {
    await processUnhandledError(err as Error);
  }
};

const startIllustry = async () => {
  illustry = new Illustry();
  await illustry.start();
};

process.on('beforeExit', cleanup);
process.on('exit', cleanup);
process.on('SIGINT', cleanup);
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection, reason:${err}`);
  processUnhandledError(err as Error).catch((error) => {
    logger.error(error.message);
    process.exit(-1);
  });
});
process.on('uncaughtException', (err) => {
  logger.error(`Unhandled Exception, reason:${err}`);
  processUnhandledError(err as Error).catch((error) => {
    logger.error(error.message);
    process.exit(-1);
  });
});

startIllustry();
