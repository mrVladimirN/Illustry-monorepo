import Illustry from './app';
import logger from './config/logger';

let illustry: Illustry;
const cleanup = () => {
  if (illustry) {
    illustry.stop();
  }
  // Perform any other cleanup tasks here
};
const startIllustry = async () => {
  illustry = new Illustry();
  await illustry.start();

  // Add event listeners for cleanup
  process.on('beforeExit', cleanup);
  process.on('exit', cleanup);
  process.on('SIGINT', cleanup); // Handles Ctrl+C

  // If you need to handle other signals, you can add more event listeners

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    cleanup();
  });
};

startIllustry();
