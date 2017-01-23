module.exports = (app) => {
  app.get('/', (req, res) => {
    res.json({ status: 'System Care API' });
  });
};
