import { Request, Response } from 'express';

const notFound = (req: Request, res: Response) => {
  console.log('not found:', req.method, req.url)
  res.status(404).send('Route does not exist')
};

export default notFound;