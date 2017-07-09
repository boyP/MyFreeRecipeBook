Meteor.methods({
  getUserSecurityQuestion(email) {
    let user = Accounts.findUserByEmail(email);
    console.log(user);
    return user.question;
  }
});
