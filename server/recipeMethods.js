import Request from 'superagent';
import imageFunctions from './imageServer';

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${Meteor.settings.CLOUDINARY_CLOUD_NAME}/image/upload`;

Meteor.methods({
  addRecipe(title) {
    Recipes.insert({
      user: this.userId,
      title: title
    });
  },
  renameRecipe(recipe_id, title) {
    Recipes.update(
      { user: this.userId, _id: recipe_id },
      { $set: { title: title } }
    );
  },
  deleteRecipe(id) {
    Recipes.remove({ user: this.userId, _id: id });
  },
  updateServingSize(recipe_id, servingSize) {
    Recipes.update(
      { user: this.userId, _id: recipe_id },
      { $set: { servingSize: servingSize } }
    );
  },
  completedIngredient(recipe_id, ingredientName, isCompleted) {
    Recipes.update(
      { user: this.userId, _id: recipe_id, 'ingredients.name': ingredientName },
      { $set: { 'ingredients.$.isCompleted': isCompleted } }
    );
  },
  updateIngredientsInRecipe(recipe_id, ingredients) {
    Recipes.update(
      { user: this.userId, _id: recipe_id },
      { $set: { ingredients: ingredients } }
    );
  },
  updateFootnotesInRecipe(recipe_id, footnotes) {
    Recipes.update(
      { user: this.userId, _id: recipe_id },
      { $set: { footnotes: footnotes } }
    );
  },
  updateSectionsInRecipe(recipe_id, sections) {
    Recipes.update(
      { user: this.userId, _id: recipe_id },
      { $set: { sections: sections } }
    );
  },
  updateStepsInRecipe(recipe_id, section, steps) {
    Recipes.update(
      { user: this.userId, _id: recipe_id, 'sections.name': section },
      { $set: { 'sections.$.steps': steps } }
    );
  },
  changePrepTimeForRecipe(recipe_id, time) {
    Recipes.update(
      { user: this.userId, _id: recipe_id },
      { $set: { prepTime: time } }
    );
  },
  changeCookTimeForRecipe(recipe_id, time) {
    Recipes.update(
      { user: this.userId, _id: recipe_id },
      { $set: { cookTime: time } }
    );
  },
  uploadFile(recipe_id, file) {
    if (file) {
      let timestamp = Date.now();
      let signature = imageFunctions.generateSignature(recipe_id, timestamp);
      let upload = Request.post(CLOUDINARY_UPLOAD_URL)
        .field('timestamp', timestamp)
        .field('public_id', recipe_id)
        .field('api_key', Meteor.settings.CLOUDINARY_API_KEY)
        .field('signature', signature)
        .field('file', file);

      upload.end(
        Meteor.bindEnvironment((err, response) => {
          if (err) {
            console.error(err);
          } else {
            console.log('public route');
            Recipes.update(
              { user: this.userId, _id: recipe_id },
              {
                $set: {
                  image: response.body.secure_url
                }
              }
            );
          }
        })
      );
    }
  }
});
