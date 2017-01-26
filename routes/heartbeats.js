module.exports = (app) => {
  const Heartbeats = app.db.models.Heartbeats;

  app.route('/heartbeats/:id')
	.all(app.auth.authenticate())
	.get((req, res) => {
  Heartbeats.findOne({
    where: {
      patient_id: req.user.id,
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
  })

	.delete((req, res) => {
  Heartbeats.destroy({
    where: {
      id: req.params.id,
      patient_id: req.user.id,
    } })
		.then(result => res.sendStatus(204))
		.catch((error) => {
  res.status(412).json({ msg: error.message });
});
});
};
