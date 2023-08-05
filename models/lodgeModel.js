const mongoose = require('mongoose');

const lodgeSchema = new mongoose.Schema({
    address: {
        type: String,
    },
    caretakernumber: {
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
    isFeatured: {
        type: Boolean,
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

lodgeSchema.statics.immutableProperties = [
    'isFeatured', 'createdAt', 'updatedAt',
];

const Lodge = mongoose.model('lodge', lodgeSchema);

module.exports = Lodge;