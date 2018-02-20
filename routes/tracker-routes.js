// Import express, router, and the tracker controller
const express = require('express');
const trackerRouter = express.Router();
const trackerController = require('../controllers/tracker-controller');

// All the routes
trackerRouter.get('/', trackerController.tracker);
trackerRouter.post('/', trackerController.add);
trackerRouter.get('/:id', trackerController.single);
trackerRouter.post('/:id', trackerController.update);
trackerRouter.delete('/:id', trackerController.delete);

module.exports = trackerRouter;
