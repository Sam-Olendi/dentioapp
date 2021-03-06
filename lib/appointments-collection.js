Appointments = new Mongo.Collection('appointments');

if ( Meteor.isServer ) {
    // ensures the support the efficient execution of queries in MongoDB
    Appointments._ensureIndex({ patient_id: 1, status: 1, date_created: 1 });
}

/*
 nullify all allow/deny rules
 (use Meteor.methods() instead)
 */

Appointments.allow({
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

Appointments.deny({
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