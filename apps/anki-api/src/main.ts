/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { connectMongo } from './db';

const app = express();

app.use(pinoHttp()); // Http logging
app.use(helmet({ contentSecurityPolicy: false})) //For nw false
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}))


const MONGODB_URI = process.env.MONGODB_URI!;
const port = process.env.PORT || 3000;

connectMongo(MONGODB_URI)
  .then(() => {
    // Start app after database connect
    app.listen(port, () => console.log(`API http://localhost:${port}`));
  })
  .catch((err) => {
    console.error('Failed to connect Mongo', err);
    process.exit(1);
  });

// ------ PUBLIC API ---
app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to anki-api!' });
});

// ---------- AUTH ----------
// app.use('/auth', authRouter);

// app.use('/assets', express.static(path.join(__dirname, 'assets')));



