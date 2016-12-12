Discoveries = new Mongo.Collection('discoveries');

if (Meteor.isServer) {
    Discoveries._ensureIndex({_id: 1});
}

/*
 nullify all allow/deny rules
 (use Meteor.methods() instead)
 */

Discoveries.allow({
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

Discoveries.deny({
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