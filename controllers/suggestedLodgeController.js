const apiResponse = require('../helpers/apiResponse');
const SuggestedLodge = require('../models/suggestedLodgeModel');
const { body } = require('express-validator');

exports.getSuggestedLodges = async (req, res) => {
    try {
        // destructure page and limit and set default values
        const { page = 1, limit = 10 } = req.query;

        const lodges = await SuggestedLodge.find({})
            .limit(limit * 1)
            .skip((page - 1) * limit);

        // get total documents in the Posts collection 
        const count = await SuggestedLodge.countDocuments();
        const data = {
            lodges,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        };

        return apiResponse.successResponseWithData(res, "success", data);
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
    body('waterrating'),
    body('hasAuxiliarypower'),
    body('auxiliarypowertype'),
    body('isAvailable'),
    body('availablespace'),
];

exports.suggestLodge = async (req, res) => {
    try {
        const {
            address, caretakernumber, email, fullname, institution, lat, lng, specifications,
            lodgedescription, lodgename, lodgeprice, lodgetown, lodgetype, phonenumber,
            waterrating, hasAuxiliarypower, auxiliarypowertype, isAvailable, availablespace,
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
            specifications,
            lodgedescription,
            lodgename,
            lodgeprice,
            lodgetown,
            lodgetype,
            phonenumber,
            lodgepicture: lodgePictureUrl,
            waterrating,
            hasAuxiliarypower,
            auxiliarypowertype,
            isAvailable,
            availablespace,
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