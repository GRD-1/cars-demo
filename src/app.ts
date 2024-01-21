import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import mainRoute from './routes/main.route';
import { errorHandler } from './middleware/error-handler';
import { BAD_REQUEST } from './constants/err.constant';

export const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', mainRoute);
app.use(errorHandler);

app.use((req, res) => {
  res.status(400).send(BAD_REQUEST);
});
