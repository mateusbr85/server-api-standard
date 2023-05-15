import './config/moduleAlias';
import express from 'express';
import doteEnvConfig from './config/doteEnv';
import bodyParser from 'body-parser';
import cors from 'cors'
import router from './routes/web';
import * as path from 'path';
const app = express();
doteEnvConfig

app.use(cors())

//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//rotas
app.use('/api/v1/', router);


export default app;