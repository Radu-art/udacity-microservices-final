import cors from 'cors';
import express from 'express';
import {sequelize} from './sequelize';

import {IndexRouter} from './controllers/v0/index.router';

import bodyParser from 'body-parser';
import {config} from './config/config';
import {V0_FEED_MODELS, } from './controllers/v0/model.index';


(async () => {
  await sequelize.addModels(V0_FEED_MODELS);
  await sequelize.sync();

  const app = express();
  const port = process.env.PORT || 8080;

  app.use(bodyParser.json());

  app.use(cors({
    allowedHeaders: [
      'Origin', 'X-Requested-With',
      'Content-Type', 'Accept',
      'X-Access-Token', 'Authorization',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    //origin: config.url,
    origin: "http://localhost:8100",
  }));
  

  //app.use('/', IndexRouter);
  app.use('/api/v0/', IndexRouter);

  // Root URI call
  
  app.get( '/', async ( req, res ) => {
    console.log("HEEEEEEEREEEEEEEEEE");  console.log("HERE" +  config.aws_media_bucket + " " + config.aws_profile + " " + config.database + " " + config.password + " " + config.host);
    console.log(req + " this is the REQUEST");
    res.send( '/api/v0/' );
    //res.send( '/' );
  } );

  // Start the Server
  app.listen( port, () => {
    console.log( `server running ${config.url}` );
    console.log( `press CTRL+C to stop server` );
  } );
})();
