Generations = new Mongo.Collection('generations');

if (Meteor.isServer) {
    Generations._ensureIndex({ _id: 1 })
}

/*
 nullify all allow/deny rules
 (use Meteor.methods() instead)
 */

Generations.allow({
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

Generations.deny({
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