const express = require('express');
const celebsRouter = express.Router();
const Celebrity = require('../models/celebrity');

celebsRouter.get('/', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('celebrities/index', { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

celebsRouter.post('/', (req, res, next) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  const catchphrase = req.body.catchphrase;
  Celebrity.create({ name, occupation, catchphrase })
    .then((celebrities) => {
      res.redirect('celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

celebsRouter.get('/create', (req, res, next) => {
  res.render('celebrities/create');
});

celebsRouter.get('/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      res.render('celebrities/show', celebrity);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = celebsRouter;
