Services = new Mongo.Collection('services');

ServicesIndex = new EasySearch.Index({
    collection: Services,
    fields: ['service_name'],
    engine: new EasySearch.Minimongo()
});

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