import express, { Request, Response } from 'express';
import { storesBySearchTerm } from './store';
const app = express();
const port = 3001;

app.use(express.json({ limit: '2mb' }));
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, Authorization');
  next();
});

app.get('/api/stores-by-location/:zipCode/:radius', async(req: Request, res: Response) => {
  res.json(await storesBySearchTerm(req.params.zipCode, req.params.radius));
});

const server = app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});
