Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({}, {sort: {text: 0}});
    }
  });

  Template.body.events({
    "submit .new-task": function (event) {
      var text = event.target.text.value;
      Tasks.insert({
        text: text,
        createdAt: new Date() //current time
      });

      event.target.text.value = "";

      return false;
    }
  });

  Template.task.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {$set: {checked: !this.checked}});
  },
  "click .delete": function () {
    Tasks.remove(this._id);
  }
});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
