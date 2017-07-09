Meteor.methods({
  planMeal(date, mealType, meal) {
    let obj = {};
    obj[mealType] = meal;
    MealCalendar.update(
      { user: this.userId, date: date },
      { $push: obj },
      { upsert: true }
    );
  },
  removeMeal(date, mealType, meal_id) {
    let obj = {};
    obj[mealType] = { guid: meal_id };
    MealCalendar.update({ user: this.userId, date: date }, { $pull: obj });
  },
  updateMealStatus(date, mealType, meal_id, isCompleted) {
    MealCalendar.update(
      { user: this.userId, date: date, [mealType + '.guid']: meal_id },
      {
        $set: { [mealType + '.$.completed']: isCompleted }
      }
    );
  }
});
