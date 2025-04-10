import type { Request, Response } from 'express';
import express from 'express';

// configuration
import config from './config/config.js';
import connectDb from './config/db.js';

// security packages
import helmet from 'helmet';
import cors from 'cors';
import rateLimiter from 'express-rate-limit';

// routes
import authRouter from './routes/auth.js';
import widgetsRouter from './routes/widgets.js';

// middleware
import authenticateUser from './middleware/auth.js';
import handleNotFound from './middleware/not-found.js';
import handleError from './middleware/error-handler.js';

const appName = 'node-api';
const app = express();

app
  .get('/', (req: Request, res: Response) => res.send('here is the node api'))   // just a sanity check
  .set('trust proxy', 1)  // (for heroku deploy) https://www.npmjs.com/package/express-rate-limit#user-content-troubleshooting-proxy-issues
  .use(
    rateLimiter({
      windowMs: 15 * 60 * 1000,   // 15 mins
      max: 100,   // limit each IP to 100 requests per windowMs
    })
  )
  .use(express.json())    // for accessing post data in the body
  .use(helmet())
  .use(cors())
  .use('/api/v1/auth', authRouter)
  .use('/api/v1/widgets', authenticateUser, widgetsRouter)
  .use(handleNotFound)
  .use(handleError);

connectDb(`${config.MONGO_URI}/${appName}`)
  .then(start)
  .catch(err => console.log(`Error connecting to database: ${err.message}`));

function start() {
  const port = config.PORT || 8000;
  app.listen(port, () => console.log(`${appName} server is listening on port ${port}...`))
}