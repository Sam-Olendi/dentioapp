Patients = new Mongo.Collection('patients');

PatientsIndex = new EasySearch.Index({
    collection: Patients,
    fields: ['profile.first_name', 'profile.middle_name', 'profile.surname'],
    engine: new EasySearch.Minimongo()
});

if (Meteor.isServer) {
    // ensures the support the efficient execution of queries in MongoDB
    Patients._ensureIndex({'profile.first_name': 1, 'profile.middle_name': 1, 'profile_surname': 1});
}

/*
 nullify all allow/deny rules
 (use Meteor.methods() instead)
 */

Patients.allow({
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

Patients.deny({
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