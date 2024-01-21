import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import mainRoute from './routes/main.route';

export const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

app.use('/api', mainRoute);

app.use((req, res) => {
  res.status(404).send('#404 invalid request');
});
