const express = require('express');
const lodgeRoute = express.Router();
const lodgeController = require('../controllers/lodgeController');
// const { auth } = require('../middleware/auth');
const upload = require('../middleware/multer');
const validate = require('../middleware/validate');

const uploadFields = [
    { name: 'lodgepicture', maxCount: 1 },
    { name: 'lodgemultiplepicture', maxCount: 12 },
];

lodgeRoute.get('/lodge/:id', lodgeController.getLodge);
lodgeRoute.get('/getLodges', lodgeController.getAllLodges);
lodgeRoute.post('/', validate(lodgeController.validations), upload.fields(uploadFields), lodgeController.createLodge);
lodgeRoute.put('/update/:id', validate(lodgeController.validations), lodgeController.updateLodge);
lodgeRoute.delete('/:id', lodgeController.deleteLodge);

lodgeRoute.post('/test/image', upload.fields(uploadFields), (req, res) => {
    const { lodgepicture, lodgemultiplepicture } = req.files;
    res.json({ lodgepicture, lodgemultiplepicture });
});


exports.lodgeRoute = lodgeRoute;