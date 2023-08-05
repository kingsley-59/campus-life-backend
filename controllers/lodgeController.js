const apiResponse = require('../helpers/apiResponse');
const Lodge = require('../models/lodgeModel');
const { body } = require('express-validator');
const { deleteImagesFromCloudinaryStorage } = require('../helpers/cloudinaryHelpers');
const User = require('../models/userModel');
const LodgeSuggestion = require('../models/lodgeSuggestion');

// lodges with auxiliary power & overall

exports.getAllLodges = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const lodges = await Lodge.find({})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: 'desc' });

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

exports.getAllAvailableLodges = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const lodges = await Lodge.find({ isAvailable: true })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: 'desc' });

        // get total documents in the Lodges collection 
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

exports.getAllPoweredUpLodges = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const lodges = await Lodge.find({ hasAuxiliarypower: true })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: 'desc' });

        // get total documents in the Lodges collection 
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
        const lodges = await Lodge.find({ lodgetown: { $regex: town, $options: 'i' } })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: 'desc' });

        // get total documents in the Lodges collection 
        const count = await Lodge.countDocuments({ lodgetown: { $regex: town, $options: 'i' } });
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

exports.getAvailableLodgesByTown = async (req, res) => {
    try {
        const { town, page = 1, limit = 10 } = req.query;
        const lodges = await Lodge.find({ lodgetown: { $regex: town, $options: 'i' }, isAvailable: true })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: 'desc' });

        // get total documents in the Lodges collection 
        const count = await Lodge.countDocuments({ lodgetown: { $regex: town, $options: 'i' } });
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

exports.getPoweredUpLodgesByTown = async (req, res) => {
    try {
        const { town, page = 1, limit = 10 } = req.query;
        const lodges = await Lodge.find({ lodgetown: { $regex: town, $options: 'i' }, hasAuxiliarypower: true })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: 'desc' });

        // get total documents in the Lodges collection 
        const count = await Lodge.countDocuments({ lodgetown: { $regex: town, $options: 'i' } });
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
        const lodges = await Lodge.find({ lodgetown: { $regex: town, $options: 'i' }, lodgetype: type, institution })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: 'desc' });

        // get total documents in the Lodges collection 
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
    body('waterrating'),
    body('hasAuxiliarypower'),
    body('auxiliarypowertype'),
    body('isAvailable'),
    body('availablespace'),
];

exports.createLodge = async (req, res) => {
    try {
        const {
            address, caretakernumber, institution, lat, lng, specifications,
            lodgedescription, lodgename, lodgeprice, lodgetown, lodgetype,
            waterrating, hasAuxiliarypower, auxiliarypowertype, isAvailable, availablespace,
        } = req.body;
        const { lodgepicture, lodgemultiplepicture } = req.files;

        const lodgePictureUrl = lodgepicture[0].path;
        const imagesPaths = lodgemultiplepicture.map(image => image.path);

        const lodgeAlreadyExists = await Lodge.findOne({ lodgename });
        if (lodgeAlreadyExists) return apiResponse.badRequestResponse(res, "Lodge with this name already exists");

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
            waterrating,
            hasAuxiliarypower,
            auxiliarypowertype,
            isAvailable,
            availablespace,
        });
        await newSuggestion.save();

        return apiResponse.successResponseWithData(res, "New lodge has been added.", { data: newSuggestion.toObject() });
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

exports.updateLodgeImages = async (req, res) => {
    try {
        const { id } = req.params;
        const { lodgepicture, lodgemultiplepicture } = req.files;

        const lodgePictureUrl = lodgepicture[0].path;
        const imagesPaths = lodgemultiplepicture.map(image => image.path);

        // get old lodge urls
        const urls = [];
        (async () => {
            let lodge = await Lodge.findById(id);
            urls.push(lodge.lodgepicture);
            lodge.lodgemultiplepicture.forEach(url => urls.push(url));
        })();

        const lodge = await Lodge.findByIdAndUpdate(id, { $set: { lodgepicture: lodgePictureUrl, lodgemultiplepicture: imagesPaths } }, { new: true });
        await deleteImagesFromCloudinaryStorage(urls).catch(error => console.log(error));

        return apiResponse.successResponseWithData(res, 'Lodge images updated successfully', lodge.toObject());
    } catch (error) {
        console.log(error);
        return apiResponse.ErrorResponse(res, error.message);
    }
};

exports.deleteLodge = async (req, res) => {
    try {
        const { id } = req.params;

        const lodge = await Lodge.findByIdAndDelete(id, req.body);
        if (!lodge) return apiResponse.notFoundResponse(res, "Lodge not found");

        // delete unused pictures from storage
        const urls = [];
        urls.push(lodge.lodgepicture);
        lodge.lodgemultiplepicture.forEach(url => urls.push(url));
        await deleteImagesFromCloudinaryStorage(urls).catch(error => console.log(error));

        return apiResponse.successResponseWithData(res, "Lodge deleted successfully.", lodge);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};


// New Controllers for platform OS
exports.getLodgeSuggestions = async (req, res) => {
    const { page = 1, limit = 10, flag } = req.query;
    try {
        const query = flag ? {flag: flag} : {};
        const suggestions = await LodgeSuggestion.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: 'desc' });

        // get total documents in the Posts collection 
        const count = await LodgeSuggestion.estimatedDocumentCount();
        const data = {
            suggestions,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalSuggestion: count
        };

        return apiResponse.successResponseWithData(res, "success", data);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.createSuggestion = async (req, res) => {
    const userId = req.user;
    let { lodgeId, feature, newValue } = req.body;
    const { lodgepicture, lodgemultiplepicture } = req.files;

    try {
        const user = await User.findById(userId);
        if (!user) return apiResponse.unauthorizedResponse(res, "User no longer exist");

        const lodge = await Lodge.findById(lodgeId);
        if (!lodge) return apiResponse.notFoundResponse(res, "Lodge was not found.");

        // check if feature is among the valid properties
        if (Array(Lodge.immutableProperties).includes(feature)) {
            return apiResponse.badRequestResponse(res, `You cannot suggest an update for lodge feature: ${feature}`);
        }

        if (lodgepicture) {
            newValue = lodgepicture[0].path;
        }

        if (lodgemultiplepicture) {
            newValue = lodgemultiplepicture.map(image => image.path).join('|');
        }

        const newSuggestion = new LodgeSuggestion({
            lodge: lodgeId,
            suggestedBy: userId,
            feature, newValue
        });
        await newSuggestion.save();

        return apiResponse.successResponseWithData(res, "Suggestion has need noted.", newSuggestion.toObject());
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.mergeSuggestion = async (req, res) => {
    const { suggestionId } = req.params;
    try {
        const suggestion = await LodgeSuggestion.findById(suggestionId);
        if (!suggestion) return apiResponse.notFoundResponse(res, "Lodge suggestion no longer exists");

        const lodge = await Lodge.findById(suggestion.lodge);
        if (!lodge) return apiResponse.notFoundResponse(res, "Lodge to be updated no longer exists");

        let images = [];
        if (suggestion.feature == 'lodgemultiplepicture') {
            let urls = suggestion.newValue.split('|');
            images.concat(urls);
            lodge.lodgemultiplepicture = images;
            await lodge.save();

            return apiResponse.successResponse(res, "Suggestion has been merged");
        }

        lodge[suggestion.feature] = suggestion.newValue;
        await lodge.save();

        suggestion.isMerged = true;
        suggestion.flag = 'merged';
        await suggestion.save();

        return apiResponse.successResponse(res, "Suggestion has been merged");
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.flagSuggestion = async (req, res) => {
    const { suggestionId, flag } = req.params;
    try {
        const suggestion = await LodgeSuggestion.findById(suggestionId);
        if (!suggestion) return apiResponse.notFoundResponse(res, "Lodge suggestion no longer exists");

        suggestion.flag = flag;
        await suggestion.save();

        return apiResponse.successResponseWithData(res, "Suggestion has been flagged", suggestion.toObject());
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};