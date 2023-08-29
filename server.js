import express from 'express';
import dotenv from 'dotenv';

import connectDb from './config/db.js';

// middleware
import authRouter from './routes/auth.js';
import notFound from './middleware/not-found.js';
import errorHandler from './middleware/error-handler.js';

const appName = 'node-api';
const app = express();

dotenv.config();

app
  .get('/', (req, res) => res.send('node api'))   // just a sanity check
  .use(express.json())
  .use('/api/v1/auth', authRouter)
  .use(notFound)
  .use(errorHandler);

connectDb(`${process.env.MONGO_URI}/${appName}`)
  .then(start)
  .catch(err => console.log(`Error connecting to database: ${err.message}`));

function start() {
  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`${appName} server is listening on port ${port}...`))
}