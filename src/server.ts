import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { IResponse } from './definitions/data';
import { storesBySearchTerm } from './store';
const app = express();
const PORT = 3001;
const TIMEOUT = 10000000;

app.use(express.json({ limit: '2mb' }));
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, Authorization');
  next();
});

app.use(morgan('combined'))

app.get('/api/stores-by-location/:zipCode/:radius', async (req: Request, res: Response) => {
  await storesBySearchTerm(req, res);
});

const server = app.listen(PORT, () => {
  console.log(`server is listening at http://localhost:${PORT}`);
});

// maximizing timeout to improve response success
server.setTimeout(TIMEOUT);

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});
