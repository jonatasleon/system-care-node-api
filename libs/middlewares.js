import bodyParser from 'body-parser';
import express from 'express';
// import cors from 'cors';
import helmet from 'helmet';

module.exports = (app) => {
  app.set('port', 3000);
  app.set('json spaces', 4);
  app.use(helmet());

  // TODO: DEFINIR QUAis URL's SERão UTILIZADAs PARA ACESSAR A API
  /* app.use(cors({
    origin : ["http://localhost:3001"],
    methods : ["GET", "POST", "PUT", "DELETE"],
    allowHeaders : ["Content-Type", "Authorization"]
  }));
  */

  app.use(bodyParser.json());
  app.use(app.auth.initialize());
  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });
};
