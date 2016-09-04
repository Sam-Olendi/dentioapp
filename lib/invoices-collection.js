Invoices = new Mongo.Collection("invoices");

InvoicesIndex = new EasySearch.Index({
    collection: Invoices,
    fields: ['invoice_no', 'patient.profile.first_name', 'patient.profile.middle_name', 'patient.profile.surname', 'date_issued'],
    engine: new EasySearch.Minimongo()
});

if (Meteor.isServer) {
    Invoices._ensureIndex({_id: 1});
}

/*
 nullify all allow/deny rules
 (use Meteor.methods() instead)
 */

Invoices.allow({
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

Invoices.deny({
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