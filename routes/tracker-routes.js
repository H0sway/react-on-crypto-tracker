// Import express, router, and the tracker controller
const express = require('express');
const trackerRouter = express.Router();
const trackerController = require('../controllers/tracker-controller');

// All the routes
trackerRouter.post('/', trackerController.tracker);
trackerRouter.post('/add', trackerController.add);
trackerRouter.get('/:id', trackerController.single);
trackerRouter.put('/:id', trackerController.update);
trackerRouter.delete('/:id', trackerController.delete);

module.exports = trackerRouter;
