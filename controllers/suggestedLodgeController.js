const apiResponse = require('../helpers/apiResponse');
const SuggestedLodge = require('../models/suggestedLodgeModel');
const { body } = require('express-validator');
// const User = require('../models/userModel');

// const getPagination = (page, size) => {
//     const limit = size ? +size : 10;
//     const offset = page ? page * limit : 0;

//     return { limit, offset };
// };

exports.getSuggestedLodges = async (req, res) => {
    try {
        // const { page, size } = req.query;
        // const { limit, offset } = getPagination(page, size);, {select: "-", offset, limit}
        const lodges = await SuggestedLodge.find({});

        return apiResponse.successResponseWithData(res, "success", lodges);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.getSuggestedLodge = async (req, res) => {
    try {
        let { id } = req.params;
        const lodge = await SuggestedLodge.findById(id);

        if (!lodge) return apiResponse.notFoundResponse(res, "No lodge was found with that id.");
        return apiResponse.successResponseWithData(res, "SuggestedLodge found successfully", lodge);
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

exports.suggestLodge = async (req, res) => {
    try {
        const { 
            address, caretakernumber, email, fullname, institution, lat, lng,
            lodgedescription, lodgename, lodgeprice, lodgetown, lodgetype, phonenumber, 
        } = req.body;
        const lodgepicture = req.file;
        const lodgePictureUrl = lodgepicture.path;

        const newSuggestion = new SuggestedLodge({ 
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
        });
        await newSuggestion.save();

        return apiResponse.successResponse(res, "New suggestion has been added.");
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.updateSuggestedLodge = async (req, res) => {
    try {
        const { id } = req.params;

        const lodge = await SuggestedLodge.findByIdAndUpdate(id, req.body);
        if (!lodge) return apiResponse.notFoundResponse(res, "SuggestedLodge not found");

        return apiResponse.successResponseWithData(res, "SuggestedLodge updated successfully.", lodge);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.deleteSuggestedLodge = async (req, res) => {
    try {
        const { id } = req.params;

        const lodge = await SuggestedLodge.findByIdAndDelete(id, req.body);
        if (!lodge) return apiResponse.notFoundResponse(res, "SuggestedLodge not found");

        return apiResponse.successResponseWithData(res, "SuggestedLodge deleted successfully.", lodge);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};