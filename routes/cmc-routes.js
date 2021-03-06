// This router handles the data from the cmc controller and sends it somewhere the React server can access
const express = require('express');
const cmcRouter = express.Router();
const cmcController = require('../controllers/cmc-controller');

cmcRouter.get('/', cmcController.top);
cmcRouter.get('/all', cmcController.getAll);
cmcRouter.post('/:currency_id', cmcController.tracker);

module.exports = cmcRouter;
