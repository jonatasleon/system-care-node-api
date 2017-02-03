module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.json({ status: 'System Care API' });
  });
};
