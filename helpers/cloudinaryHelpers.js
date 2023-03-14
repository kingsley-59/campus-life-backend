const cloudinary = require('cloudinary');

const getPublicIdFromUrl = (url = '') => {
    const filename = url.split('/').at(-1);
    const publicId = filename.split('.')[0];

    return publicId;
};

const deleteImagesFromCloudinaryStorage = async (imageUrls = []) => {
    const { destroy } = cloudinary.v2.uploader;

    for (let url of imageUrls) {
        const publidId = getPublicIdFromUrl(url);
        await destroy(publidId);
    }
};

module.exports = {
    getPublicIdFromUrl,
    deleteImagesFromCloudinaryStorage,
};