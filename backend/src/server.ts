import app from './app';
import { env } from './config/env';
import { connectDB } from './config/db';

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start Express server
    const server = app.listen(env.PORT, () => {
      console.log(`🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });

    // Handle clean shutdown
    const shutdown = () => {
      console.log('📡 Shutting down server gracefully...');
      server.close(() => {
        console.log('📡 Server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    console.error('❌ Server startup error:', error);
    process.exit(1);
  }
};

startServer();
