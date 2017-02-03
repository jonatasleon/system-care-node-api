module.exports = (app) => {
  const Doctors = app.db.models.Doctors;

  app.route('/api/doctor')
  .all(app.auth.authenticate())
  .get((req, res) => {
    Doctors.findById(req.user.id, {
      attributes: ['id', 'name', 'email'],
    })
    .then(result => res.json(result))
    .catch((error) => {
      res.status(412).json({ msg: error.message });
    });
  });
  app.post('/doctors', (req, res) => {
    Patients.create(req.body)
    .then(result => res.json(result))
    .catch((error) => {
      res.status(412).json({ msg: error.message });
    });
  });
};
