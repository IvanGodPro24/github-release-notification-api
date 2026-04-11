import express from 'express';
import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import rootRouter from './routes/index.js';
import { startScanner } from './services/scanner.service.js';
import { bullBoardRouter } from './queue/dashboard.js';

export const app = express();
const PORT = getEnvVar('PORT', '3000');

app.use('/api', rootRouter);
app.use('/admin/queues', bullBoardRouter);

app.use(notFoundHandler);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  startScanner();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
