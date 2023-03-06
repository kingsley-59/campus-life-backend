const apiResponse = require('../helpers/apiResponse');
const Lodge = require('../models/lodgeModel');
const { body } = require('express-validator');
// const User = require('../models/userModel');

// const getPagination = (page, size) => {
//     const limit = size ? +size : 10;
//     const offset = page ? page * limit : 0;

//     return { limit, offset };
// };

exports.getAllLodges = async (req, res) => {
    try {
        // const { page, size } = req.query;
        // const { limit, offset } = getPagination(page, size);, {select: "-", offset, limit}
        const lodges = await Lodge.find({});

        return apiResponse.successResponseWithData(res, "success", lodges);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.getLodge = async (req, res) => {
    try {
        let { id } = req.params;
        const lodge = await Lodge.findById(id);

        if (!lodge) return apiResponse.notFoundResponse(res, "No lodge was found with that id.");
        return apiResponse.successResponseWithData(res, "Lodge found successfully", lodge);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.getLodgesByTown = async (req, res) => {
    try {
        let { town } = req.query;
        const lodge = await Lodge.find({ lodgetown: town });

        if (!lodge) return apiResponse.notFoundResponse(res, "Lodges in that town are not available.");
        return apiResponse.successResponseWithData(res, `Lodges in ${town}`, lodge);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.getLodgesByTypeTownAndInstitution = async (req, res) => {
    try {
        let { town, type, institution } = req.query;
        const lodge = await Lodge.find({ lodgetown: town, lodgetype: type, institution });

        if (!lodge) return apiResponse.notFoundResponse(res, "Lodges in that town are not available.");
        return apiResponse.successResponseWithData(res, `${type} Lodges in ${town}, ${institution}`, lodge);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.validations = [
    body('address'),
    body('caretakernumber'),
    body('email'),
    body('fullname'),
    body('institution'),
    body('lodgedescription'),
    body('lodgemultiplepicture'),
    body('lodgename'),
    body('lodgepicture'),
    body('lodgeprice'),
    body('lodgetown'),
    body('lodgetype'),
    body('phonenumber'),
    body('lat'),
    body('lng'),
    body('location'),
];

exports.createLodge = async (req, res) => {
    try {
        const { 
            address, caretakernumber, email, fullname, institution, lat, lng,
            lodgedescription, lodgename, lodgeprice, lodgetown, lodgetype, phonenumber, 
        } = req.body;
        const { lodgepicture, lodgemultiplepicture } = req.files;

        const lodgePictureUrl = lodgepicture[0].path;
        const imagesPaths = lodgemultiplepicture.map(image => image.path);

        const newSuggestion = new Lodge({ 
            address,
            caretakernumber,
            email,
            fullname,
            institution,
            lat,
            lng,
            lodgedescription,
            lodgename,
            lodgeprice,
            lodgetown,
            lodgetype,
            phonenumber,
            lodgepicture: lodgePictureUrl,
            lodgemultiplepicture: imagesPaths,
        });
        await newSuggestion.save();

        return apiResponse.successResponse(res, "New lodge has been added.");
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.updateLodge = async (req, res) => {
    try {
        const { id } = req.params;

        const lodge = await Lodge.findByIdAndUpdate(id, req.body);
        if (!lodge) return apiResponse.notFoundResponse(res, "Lodge not found");

        return apiResponse.successResponseWithData(res, "Lodge updated successfully.", lodge);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.deleteLodge = async (req, res) => {
    try {
        const { id } = req.params;

        const lodge = await Lodge.findByIdAndDelete(id, req.body);
        if (!lodge) return apiResponse.notFoundResponse(res, "Lodge not found");

        return apiResponse.successResponseWithData(res, "Lodge deleted successfully.", lodge);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};