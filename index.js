import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from "method-override";
import {noteRoutes} from './routes/note-routes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(noteRoutes);
app.use(express.static('./public'));

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });