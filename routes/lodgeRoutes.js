const express = require('express');
const lodgeRoute = express.Router();
const lodgeController = require('../controllers/lodgeController');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/multer');
const validate = require('../middleware/validate');

const uploadFields = [
    { name: 'displayImage', maxCount: 1 },
    { name: 'images', maxCount: 12 },
];

lodgeRoute.get('/lodge/:id', lodgeController.getLodge);
lodgeRoute.get('/', lodgeController.getAllLodges);
lodgeRoute.post('/', validate(lodgeController.validations), upload.fields(uploadFields), lodgeController.suggestLodge);
lodgeRoute.put('/:id', auth, validate(lodgeController.validations), lodgeController.updateLodge);
lodgeRoute.delete('/:id', auth, lodgeController.deleteLodge);

lodgeRoute.post('/test/image', upload.fields(uploadFields), (req, res) => {
    const { displayImage, images } = req.files;
    res.json({ displayImage, images });
});


exports.lodgeRoute = lodgeRoute;