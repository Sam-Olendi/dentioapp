Findings = new Mongo.Collection('findings');

if (Meteor.isServer) {
    Findings._ensureIndex({_id: 1});
}

/*
 nullify all allow/deny rules
 (use Meteor.methods() instead)
 */

Findings.allow({
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

Findings.deny({
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