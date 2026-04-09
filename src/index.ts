import express from 'express';
import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import rootRouter from './routes/index.js';

const app = express();
const PORT = getEnvVar('PORT', '3000');

app.use('/api', rootRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
