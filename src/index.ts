import express from 'express';
import { getEnvVar } from './utils/getEnvVar.js';

const app = express();
const PORT = getEnvVar('PORT', '3000');

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
