Companies = new Mongo.Collection("companies");

if (Meteor.isServer) {
    Companies._ensureIndex({_id: 1});
}

/*
 nullify all allow/deny rules
 (use Meteor.methods() instead)
 */

Companies.allow({
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

Companies.deny({
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