import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';

// database
import connectDb from './config/db.js';

// security packages
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import rateLimiter from 'express-rate-limit';

// routes
import authRouter from './routes/auth.js';
import widgetsRouter from './routes/widgets.js';

// middleware
import authenticatedUser from './middleware/auth.js';
import notFound from './middleware/not-found.js';
import errorHandler from './middleware/error-handler.js';

const appName = 'node-api';
const app: Express = express();

dotenv.config();

app
  .get('/', (req: Request, res: Response) => res.send('node api'))   // just a sanity check
  .set('trust proxy', 1)  // (for heroku deploy) https://www.npmjs.com/package/express-rate-limit#user-content-troubleshooting-proxy-issues
  .use(
    rateLimiter({
      windowMs: 15 * 60 * 1000,   // 15 mins
      max: 100,   // limit each IP to 100 requests per windowMs
    }
  ))
  .use(express.json())    // for accessing post data in the body
  .use(helmet())
  .use(cors())
  .use(xss())
  .use('/api/v1/auth', authRouter)
  .use('/api/v1/widgets', authenticatedUser, widgetsRouter)
  .use(notFound)
  .use(errorHandler);

connectDb(`${process.env.MONGO_URI}/${appName}`)
  .then(start)
  .catch(err => console.log(`Error connecting to database: ${err.message}`));

function start() {
  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`${appName} server is listening on port ${port}...`))
}