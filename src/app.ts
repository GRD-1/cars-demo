import express from 'express';
import bodyParser from 'body-parser';
import * as process from 'process';
import mainRoute from './routes/main.route';
import { errorHandler } from './errors/error-handler';
import { BAD_REQUEST } from './constants/err.constant';
import 'reflect-metadata';
import { validateEnvVariables } from './env/env-validator';

validateEnvVariables(process.env);

export const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', mainRoute);
app.use(errorHandler);

app.use((req, res) => {
  res.status(400).send(BAD_REQUEST);
});
