import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // code to run on server at startup
  Cloudinary.config = {
    cloud_name: Meteor.settings.CLOUDINARY_CLOUD_NAME,
    api_key: Meteor.settings.CLOUDINARY_API_KEY,
    api_secret: Meteor.settings.CLOUDINARY_API_SECRET
  };

  Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('reset-password/' + token);
  };
});
