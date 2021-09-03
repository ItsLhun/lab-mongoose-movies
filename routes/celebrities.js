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
  const catchPhrase = req.body.catchPhrase;
  Celebrity.create({ name, occupation, catchPhrase })
    .then((celebrities) => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

celebsRouter.get('/create', (req, res, next) => {
  res.render('celebrities/create');
});

celebsRouter.post('/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

celebsRouter.get('/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      res.render('celebrities/edit', celebrity);
    })
    .catch((error) => {
      next(error);
    });
});

celebsRouter.post('/:id', (req, res, next) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  const catchPhrase = req.body.catchPhrase;
  Celebrity.findByIdAndUpdate(req.params.id, { name, occupation, catchPhrase })
    .then((celebrity) => {
      res.redirect('/celebrities');
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
