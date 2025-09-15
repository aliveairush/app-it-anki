import mongoose from 'mongoose';

let connected = false;

export async function connectMongo(uri: string) {
  if (connected) return;
  mongoose.connection.on('connected', () => {
    connected = true;
    console.log('[Mongo] connected');
  });
  mongoose.connection.on('error', (err) => {
    console.error('[Mongo] connection error', err);
  });
  mongoose.connection.on('disconnected', () => {
    connected = false;
    console.warn('[Mongo] disconnected');
  });

  await mongoose.connect(uri, {
    // options
  });
}
