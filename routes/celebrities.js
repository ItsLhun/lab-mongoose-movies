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
