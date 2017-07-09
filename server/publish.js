Meteor.publish('allRecipes', function() {
  return Recipes.find({ user: this.userId });
});

Meteor.publish('allMeals', function() {
  return MealCalendar.find({ user: this.userId });
});
