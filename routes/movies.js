const express = require('express');
const moviesRouter = express.Router();
const Movie = require('../models/movie');

moviesRouter.get('/', (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render('movies/index', { movies });
    })
    .catch((error) => {
      next(error);
    });
});

moviesRouter.post('/', (req, res, next) => {
  const title = req.body.title;
  const genre = req.body.genre;
  const plot = req.body.plot;
  Movie.create({ title, genre, plot })
    .then((movies) => {
      res.redirect('/movies');
    })
    .catch((error) => {
      next(error);
    });
});

moviesRouter.get('/create', (req, res, next) => {
  res.render('movies/create');
});

moviesRouter.post('/:id/delete', (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/movies');
    })
    .catch((error) => {
      next(error);
    });
});

moviesRouter.get('/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      res.render('movies/edit', movie);
    })
    .catch((error) => {
      next(error);
    });
});

moviesRouter.post('/:id', (req, res, next) => {
  const title = req.body.title;
  const genre = req.body.genre;
  const plot = req.body.plot;
  Movie.findByIdAndUpdate(req.params.id, { title, genre, plot })
    .then((movies) => {
      res.redirect('/movies');
    })
    .catch((error) => {
      next(error);
    });
});

moviesRouter.get('/:id', (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      res.render('movies/show', movie);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = moviesRouter;
