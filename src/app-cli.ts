import Illustry from './app';

let illustry: Illustry;

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
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    cleanup();
  });
};

const cleanup = () => {
  if (illustry) {
    illustry.stop();
  }
  // Perform any other cleanup tasks here
};

startIllustry();
