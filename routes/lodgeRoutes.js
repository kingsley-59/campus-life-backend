const express = require('express');
const lodgeRoute = express.Router();
const lodgeController = require('../controllers/lodgeController');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/multer');
const validate = require('../middleware/validate');
const { onlyAdmins } = require("../middleware/adminAuth");

const uploadFields = [
    { name: 'lodgepicture', maxCount: 1 },
    { name: 'lodgemultiplepicture', maxCount: 12 },
];

lodgeRoute.get('/lodge/:id', auth, lodgeController.getLodge);
lodgeRoute.get('/getLodges', lodgeController.getAllLodges);
lodgeRoute.get('/getAvailableLodges', lodgeController.getAllAvailableLodges);
lodgeRoute.get('/getPoweredUpLodges', lodgeController.getAllPoweredUpLodges);
lodgeRoute.get('/getLodgesByTown', lodgeController.getLodgesByTown);
lodgeRoute.get('/getAvailableLodgesByTown', lodgeController.getAvailableLodgesByTown);
lodgeRoute.get('/getPoweredUpLodgesByTown', lodgeController.getPoweredUpLodgesByTown);
lodgeRoute.get('/getLodgesByTTI', lodgeController.getLodgesByTypeTownAndInstitution);
lodgeRoute.post('/', auth, onlyAdmins, validate(lodgeController.validations), upload.fields(uploadFields), lodgeController.createLodge);
lodgeRoute.put('/update/:id', auth, onlyAdmins, validate(lodgeController.validations), lodgeController.updateLodge);
lodgeRoute.put('/updateLodgeImages/:id', auth, onlyAdmins, upload.fields(uploadFields), lodgeController.updateLodgeImages);
lodgeRoute.delete('/:id', auth, onlyAdmins, lodgeController.deleteLodge);

lodgeRoute.post('/test/image', upload.fields(uploadFields), (req, res) => {
    const { lodgepicture, lodgemultiplepicture } = req.files;
    res.json({ lodgepicture, lodgemultiplepicture });
});


exports.lodgeRoute = lodgeRoute;