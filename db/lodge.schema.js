const mongoose = require('mongoose')
const geojson = require('mongoose-geojson-schema')

const contactSchema = mongoose.Schema({
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
})

const LodgeSchema = mongoose.Schema(
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

        locationtext: {
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

        isAvailable: Boolean,

        isVerified: Boolean,

        summary: {
            type: String
        },

        displayImage: {
            type: String
        },

        images: [String],

        contactInfo: contactSchema,

        likes: {
            type: Number
        },
        dislikes: {
            type: Number
        }

    },
    { timestamps: true }
)


module.exports = mongoose.Model('Lodge', LodgeSchema)





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