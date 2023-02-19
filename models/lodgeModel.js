const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const geojson = require('mongoose-geojson-schema');

const contactSchema = new mongoose.Schema({
    name: {
        type: String
    },

    email: {
        type: String,
    },

    phone: {
        type: String,
        required: true
    }
});


const LodgeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },

        displayTitle: {
            type: String,
        },

        type: {
            type: String,
        },

        locationText: {
            type: String
        },

        town: {
            type: String
        },

        location: mongoose.Schema.Types.Point,

        specifications: [String],

        pricePerYear: {
            type: Number
        },

        isAvailable: {
            type: Boolean,
            default: false
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        description: {
            type: String
        },

        summary: {
            type: String
        },

        displayImage: {
            type: String
        },

        images: [String],

        contactInfo: contactSchema,

        likes: {
            type: Number,
            default: 0
        },
        dislikes: {
            type: Number,
            default: 0
        },

        reviews: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Comment",
            },
        ],
    },
    { timestamps: true }
);



const Lodge = mongoose.model('Lodge', LodgeSchema);
module.exports = Lodge;





// const user = new User({
//     name: 'John Doe',
//     email: 'johndoe@example.com',
//     password: 'password',
//     location: new mongoose.Types.Point({
//       type: 'Point',
//       coordinates: [longitude, latitude]
//     })
//   });
  
//   user.save()
//     .then(user => console.log(user))
//     .catch(err => console.error(err));