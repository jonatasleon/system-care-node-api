import express from 'express';
import HeartbeatsController from '../controller/heartbeats';


module.exports = (app) => {
  const heartbeatsController =  new HeartbeatsController();
  app.route('api/heartbeats/:id')
	.all(app.auth.authenticate())
	.get((req, res) => {
  Heartbeats.findAll({
    where: {
      patient_id: req.user.id
      ,$between: [,] //TODO INSERIR DATAS PARA PEGAR OS BATIMENTOS CARDIACOS
    } })
		.then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.sendStatus(404);
      }
    })
		.catch((error) => {
      res.status(412).json({ msg: error.message });
    });
  })
  .post((req, res) => {
    req.body.patient_id = req.user.id;
    Heartbeats.create(req.body)
      .then((result) => { res.json(result); })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  });
};
