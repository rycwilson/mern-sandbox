import type { Request, Response, NextFunction } from 'express';
// import { writeFile } from 'fs';
// import { promisify } from 'util';
import { promises as fsPromises } from 'fs';

export const logCreatedWidget = (req: Request, res: Response, next: NextFunction) => {
  // const writeFilePromise = promisify(writeFile);
  const { writeFile } = fsPromises;
  const logData = `Created Widget @ ${new Date().toLocaleString()}: ${JSON.stringify(req.body)}\n`;
  // writeFilePromise('./logs/log.txt', logData, { encoding: 'utf8', flag: 'a' })
  writeFile('./logs/log.txt', logData, { encoding: 'utf8', flag: 'a' })
    .then(() => console.log('Log written successfully'))
    .catch((err) => console.error('Error writing log:', err));

  next();
};