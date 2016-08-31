Services = new Mongo.Collection('services');

if (Meteor.isServer) {
    Services._ensureIndex({_id: 1});
}

/*
 nullify all allow/deny rules
 (use Meteor.methods() instead)
 */

Services.allow({
    insert: function () {
        return false;
    },
    update: function () {
        return false;
    },
    remove: function () {
        return false;
    }
});

Services.deny({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});