// https://dev.to/asjadanis/parsing-env-with-typescript-3jjm
namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string,
    JWT_SECRET: string,
    JWT_EXPIRES_IN: string
  }
}