const express = require('express');
const suggestedLodgeRoute = express.Router();
const suggestedLodgeController = require('../controllers/suggestedLodgeController');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/multer');
const validate = require('../middleware/validate');

suggestedLodgeRoute.get('/getSuggestedLodge/:id', suggestedLodgeController.getSuggestedLodge);
suggestedLodgeRoute.get('/getSuggestedLodges', suggestedLodgeController.getSuggestedLodges);
suggestedLodgeRoute.post('/', auth, validate(suggestedLodgeController.validations), upload.single("lodgepicture"), suggestedLodgeController.suggestLodge);
suggestedLodgeRoute.put('/updateSuggestedLodge/:id', auth, validate(suggestedLodgeController.validations), suggestedLodgeController.updateSuggestedLodge);
suggestedLodgeRoute.delete('/:id', auth, suggestedLodgeController.deleteSuggestedLodge);

exports.suggestedLodgeRoute = suggestedLodgeRoute;