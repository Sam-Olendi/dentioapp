Treatments = new Mongo.Collection('treatments');

if (Meteor.isServer) {
    Treatments._ensureIndex({_id: 1});
}

/*
 nullify all allow/deny rules
 (use Meteor.methods() instead)
 */

Treatments.allow({
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

Treatments.deny({
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