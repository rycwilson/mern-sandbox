import express from 'express';

// configuration
import config from './config/config.ts';
import connectDb from './config/db.ts';

// logs
import morgan from 'morgan';

// security packages
import helmet from 'helmet';
import cors from 'cors';
import rateLimiter from 'express-rate-limit';

// routes
import authRouter from './routes/authRouter.ts';
import usersRouter from './routes/usersRouter.ts';
import widgetsRouter from './routes/widgetsRouter.ts';

// middleware
import cookieParser from 'cookie-parser';
import { authenticateUser } from './middleware/auth.ts';
import handleNotFound from './middleware/not-found.ts';
import handleError from './middleware/error-handler.ts';

const appName = 'node-api';
const app = express();

app
  .get('/', (_, res) => res.send('herre is the node api'))   // just a sanity check
  .set('trust proxy', 1)  // (for heroku deploy) https://www.npmjs.com/package/express-rate-limit#user-content-troubleshooting-proxy-issues
  .use(morgan('dev'))     // log requests in dev mode
  .use(
    rateLimiter({
      windowMs: 15 * 60 * 1000,   // 15 mins
      max: 100,   // limit each IP to 100 requests per windowMs
    })
  )
  .use(cookieParser())  
  .use(express.json())
  .use(helmet())
  .use(cors())
  .use('/api/v1/auth', authRouter)
  .use('/api/v1/users', authenticateUser, usersRouter)
  .use('/api/v1/widgets', authenticateUser, widgetsRouter)
  .use(handleNotFound)
  .use(handleError);

try {
  // await connectDb(`${config.MONGO_URI}/${appName}`);
  await connectDb(config.MONGO_URI);
  app.listen(config.PORT, () => console.log(`${appName} server is listening on port ${config.PORT}...`))
} catch (err) {
  console.error(`Error connecting to database: ${err.message}`);
  process.exit(1);
}