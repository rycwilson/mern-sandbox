// https://dev.to/asjadanis/parsing-env-with-typescript-3jjm

// import path from 'path';

// https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/
// import * as url from 'url';
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Interface to load env variables
// Note these variables can possibly be undefined
interface ENV {
  NODE_ENV: string | undefined,
  PORT: number | undefined,
  MONGO_URI: string | undefined,
  JWT_SECRET: string | undefined,
  JWT_EXPIRES_IN: string | undefined,
}

interface Config {
  NODE_ENV: string,
  PORT: number,
  MONGO_URI: string,
  JWT_SECRET: string,
  JWT_EXPIRES_IN: string,
}

// Loading process.env as ENV interface
const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? +process.env.PORT : undefined,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN
  };
};

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.
const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;