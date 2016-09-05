Generations = new Mongo.Collection('generations');

GenerationsIndex = new EasySearch.Index({
    collection: Generations,
    fields: ['generation_no', 'patient.profile.first_name', 'patient.profile.middle_name', 'patient.profile.surname', 'date_generated'],
    engine: new EasySearch.Minimongo()
});

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