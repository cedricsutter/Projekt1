import express from 'express'
import path, {dirname} from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'

import {noteRoutes} from './routes/note-routes.js'
import {fileURLToPath} from "url"
import Datastore from "nedb-promises"

const ndb = new Datastore({filename: '../data/data.db', autoload: true});
const cdb = new Datastore({filename: '../data/data.db', autoload: true});

ndb.remove();

const __dirname = dirname(fileURLToPath(import.meta.url));

export const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", noteRoutes);


