module.exports = {
  generateSignature(public_id, timestamp) {
    const signature = `public_id=${public_id}&timestamp=${timestamp}${Meteor.settings.CLOUDINARY_API_SECRET}`;
    return CryptoJS.SHA1(signature).toString();
  }
};
