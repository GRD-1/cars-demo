import express from 'express';
import bodyParser from 'body-parser';
import * as process from 'process';
import mainRoute from './routes/main.route';
import { handleErrors } from './middleware/handle-errors.middleware';
import { BAD_REQUEST } from './constants/err.constant';
import 'reflect-metadata';
import { validateEnvVariables } from './env/env-validator';
import serviceProvider from './services/service-provider.service';
import { PassportService } from './services/passport.service';

serviceProvider.getService(PassportService);
validateEnvVariables(process.env);

export const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', mainRoute);
app.use(handleErrors);

app.use((req, res) => {
  res.status(400).send(BAD_REQUEST);
});
