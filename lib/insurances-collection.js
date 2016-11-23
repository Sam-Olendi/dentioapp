Insurances = new Mongo.Collection("insurances");

if (Meteor.isServer) {
    Insurances._ensureIndex({_id: 1, insurance_name: 1});
}

/*
 nullify all allow/deny rules
 (use Meteor.methods() instead)
 */

Insurances.allow({
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

Insurances.deny({
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