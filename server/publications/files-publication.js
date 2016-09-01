Meteor.publish('files.all', function () {
   return Images.find().cursor();
});