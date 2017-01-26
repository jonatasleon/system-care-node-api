module.exports = (app) => {
  const Patients = app.db.models.Patients;

  app.route('/patient')
  .all(app.auth.authenticate())
  .get((req, res) => {
    Patients.findById(req.user.id, {
      attributes: ['id', 'name', 'email'],
    })
    .then(result => res.json(result))
    .catch((error) => {
      res.status(412).json({ msg: error.message });
    });
  })
  .delete((req, res) => {
    Patients.destroy({ where: { id: req.user.id } })
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      res.status(412).json({ msg: error.message });
    });
  });
  app.post('/patients', (req, res) => {
    Patients.create(req.body)
    .then(result => res.json(result))
    .catch((error) => {
      res.status(412).json({ msg: error.message });
    });
  });
};
