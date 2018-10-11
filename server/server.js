import path from 'path';

import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import Joi from 'joi';
import mongodb from 'mongodb';
import dbConfig from './config/db';

const MongoClient = mongodb.MongoClient;

import serverHeadersMiddleware from './middlewares/server-headers';
import logger from './init/bunyan-logger';

import simpleList from '../client/response-mocks/service-list-simple';
import list from '../client/response-mocks/service-list';

const app = express();

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';
const VIEWS_PATH = path.resolve(__dirname, '../client-dist');
const STATIC_PATH = path.resolve(__dirname, '../client-dist/static');

app.use(serverHeadersMiddleware);
app.use(bodyParser.json({ type: 'application/json' }));

app.engine('html', ejs.renderFile);
app.set('views', VIEWS_PATH);
app.set('view engine', 'html');

app.use('/static', express.static(STATIC_PATH));

app.get('/', (req, res) => res.render('index'));

app.get('/api/servicelist', (req, res) => {
    MongoClient.connect(dbConfig.url, (err, client) => {
        if (err) return err;
        let db = client.db('iphone_service_test');
        db.collection('service_list').find({}).toArray((err, result) => {
            if (err) return err;
            res.json(result);
        })
        client.close();
    });
});

app.get('/api/getadditionaliteminfo/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    console.log(itemId);
    const item = list.find((item) => item.id === itemId);

    if (!item) {
        res.statusCode = 404;
        res.end();
        return;
    }

    res.json(item);
});

app.post('/api/addnewitem', (req, res) => {
    const newItem = req.body;
    const schema = {
        name: Joi.string().min(3).required(),
    }

    const result = Joi.validate(newItem, schema);

    if (result.error) {
        res.statusCode = 400;
        res.end();
        return;
    }

    simpleList.push(newItem);
    list.push({
        ...newItem,
        info: 'no add info',
    })
    res.json(req.body);
});

app.get('*', (req, res) => res.render('index'));

app
    .listen(PORT, HOST, () => logger.info(`Aplication server is listening on port ${PORT}.`))
    .on('error', err => logger.error(`Failed to start application server, check if ${PORT} port is empty \n`, err));
