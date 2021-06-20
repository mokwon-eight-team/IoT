module.exports = (app) => {
  const infrareds = require('./infrared.controller.js');
  app.get('/infrareds', infrareds.findAll);
  app.get('/infrareds/:infraredId', infrareds.findOne);
  app.post('/infrareds',infrareds.create);
  app.put('/infrareds/:infraredId', infrareds.update);
  app.delete('/infrareds/:infraredId', infrareds.delete);
}
