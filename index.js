import express from 'express';
import bodyParser from 'body-parser';
import {noteRoutes} from './routes/note-routes.js';

const app = express();

app.use(bodyParser.json());
app.use(noteRoutes);
app.use(express.static('./public'));

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });