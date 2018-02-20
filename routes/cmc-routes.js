// This router handles the data from the cmc controller and sends it somewhere the React server can access
const express = require('express');
const cmcRouter = express.Router();
const cmcController = require('../controllers/cmc-controller');

cmcRouter.post('/', cmcController.top);
cmcRouter.post('/', cmcController.tracker);

module.exports = cmcRouter;
