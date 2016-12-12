Meteor.publish('discoveries.all', function () {
    return Discoveries.find();
});