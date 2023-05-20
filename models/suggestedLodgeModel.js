const mongoose = require('mongoose');

const suggestedLodgeSchema = new mongoose.Schema({
    address: {
        type: String,
    },
    caretakernumber: {
        type: String,
    },
    email: {
        type: String,
    },
    fullname: {
        type: String,
    },
    institution: {
        type: String,
    },
    lodgedescription: {
        type: String,
    },
    lodgemultiplepicture: [{
        type: String,
    }],
    specifications: [{
        type: String,
    }],
    lodgename: {
        type: String,
    },
    lodgepicture: {
        type: String,
    },
    lodgeprice: {
        type: String,
    },
    lodgetown: {
        type: String,
    },
    lodgetype: {
        type: String,
    },
    phonenumber: {
        type: String,
    },
    lat: {
        type: Number,
    },
    lng: {
        type: Number,
    },
    location: {
        type: String,
        coordinates: Array,
    },
    waterrating: {
        type: Number,
    },
    hasAuxiliarypower: {
        type: Boolean,
    },
    auxiliarypowertype: {
        type: String
    },
    isAvailable: {
        type: Boolean
    },
    availablespace: {
        type: String,
    },
},
    { timestamps: true }
);

const SuggestedLodge = mongoose.model('suggestedLodge', suggestedLodgeSchema);

module.exports = SuggestedLodge;