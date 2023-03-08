const apiResponse = require('../helpers/apiResponse');
const Lodge = require('../models/lodgeModel');
const { body } = require('express-validator');

exports.getAllLodges = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const lodges = await Lodge.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit);

        // get total documents in the Posts collection 
        const count = await Lodge.estimatedDocumentCount();
        const data = {
            lodges,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalLodges: count
        };

        return apiResponse.successResponseWithData(res, "success", data);
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
        const { town, page = 1, limit = 10 } = req.query;
        const lodges = await Lodge.find({ lodgetown: town })
        .limit(limit * 1)
        .skip((page - 1) * limit);

        // get total documents in the Posts collection 
        const count = await Lodge.countDocuments({ lodgetown: town });
        const data = {
            lodges,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalLodgesByTown: count
        };

        if (!lodges) return apiResponse.notFoundResponse(res, "Lodges in that town are not available.");
        return apiResponse.successResponseWithData(res, `Lodges in ${town}`, data);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.getLodgesByTypeTownAndInstitution = async (req, res) => {
    try {
        let { town, type, institution, page = 1, limit = 10 } = req.query;
        const lodges = await Lodge.find({ lodgetown: town, lodgetype: type, institution })
        .limit(limit * 1)
        .skip((page - 1) * limit);

        // get total documents in the Posts collection 
        const count = await Lodge.countDocuments();
        const data = {
            lodges,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        };        

        if (!lodges) return apiResponse.notFoundResponse(res, "Lodges in that town are not available.");
        return apiResponse.successResponseWithData(res, `${type} Lodges in ${town}, ${institution}`, data);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.validations = [
    body('address'),
    body('caretakernumber'),
    body('institution'),
    body('lodgedescription'),
    body('lodgemultiplepicture'),
    body('lodgename'),
    body('lodgepicture'),
    body('lodgeprice'),
    body('lodgetown'),
    body('lodgetype'),
    body('lat'),
    body('lng'),
    body('location'),
];

exports.createLodge = async (req, res) => {
    try {
        const { 
            address, caretakernumber, institution, lat, lng, specifications,
            lodgedescription, lodgename, lodgeprice, lodgetown, lodgetype,
        } = req.body;
        const { lodgepicture, lodgemultiplepicture } = req.files;

        const lodgePictureUrl = lodgepicture[0].path;
        const imagesPaths = lodgemultiplepicture.map(image => image.path);

        const newSuggestion = new Lodge({ 
            address,
            caretakernumber,
            institution,
            lat,
            lng,
            specifications,
            lodgedescription,
            lodgename,
            lodgeprice,
            lodgetown,
            lodgetype,
            lodgepicture: lodgePictureUrl,
            lodgemultiplepicture: imagesPaths,
        });
        await newSuggestion.save();

        return apiResponse.successResponse(res, "New lodge has been added.");
    } catch (error) {
        console.log(error);
        return apiResponse.ErrorResponse(res, error.message);
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