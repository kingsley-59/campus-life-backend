const express = require('express');
const lodgeRoute = express.Router();
const lodgeController = require('../controllers/lodgeController');
const { auth } = require('../middleware/auth');
const validate = require('../middleware/validate');

lodgeRoute.get('/lodge/:id', lodgeController.getLodge);
lodgeRoute.get('/', lodgeController.getAllLodges);
lodgeRoute.post('/', validate(lodgeController.validations), lodgeController.suggestLodge);
lodgeRoute.put('/:id', auth, validate(lodgeController.validations), lodgeController.updateLodge);
lodgeRoute.delete('/:id', auth, lodgeController.deleteLodge);


exports.lodgeRoute = lodgeRoute;