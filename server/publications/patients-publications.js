Meteor.publish('patients.appointments.search', function (search) {
    check(search, Match.OneOf(String, null, undefined));

    var query = {},
        projection = { limit: 10, sort: { 'profile.surname': 1 }, fields: { 'profile.first_name': 1, 'profile.middle_name': 1, 'profile.surname': 1 } };

    if (search) {
        var regex = new RegExp( search, 'i' );

        query = {
            $or: [
                {'profile.first_name': regex},
                {'profile.middle_name': regex},
                {'profile.surname': regex}
            ]
        };

        projection.limit = 20;
    }

   return Patients.find(query, projection);
});

Meteor.publish('patients.search', function (search) {
    check(search, Match.OneOf(String, null, undefined));

    console.log(search);

    var query = {},
        projection = { limit: 10, sort: { 'profile.surname': 1 } };

    if (search) {
        var regex = new RegExp( search, 'i' );

        query = {
            $or: [
                {'profile.first_name': regex},
                {'profile.middle_name': regex},
                {'profile.surname': regex}
            ]
        };

        projection.limit = 20;
    }

    return Patients.find(query, projection);
});

Meteor.publish('patients.appointments', function (entry) {
    check(entry, Match.OneOf(String, null, undefined));
    return Patients.find({_id: entry}, { fields: {'profile.first_name': 1, 'profile.middle_name': 1, 'profile.surname': 1} });
});

Meteor.publish('patients.all', function (limit) {

    check(limit, Number);

    var self = this;
    var observer = Patients.find({}, {limit: limit, sort: { 'profile.surname': 1 }}).observe({
        added: function (document) {
            self.added('patients', document._id, transformPatients (document));
        },
        changed: function (newDocument, oldDocument) {
            self.changed('patients', oldDocument._id, transformPatients (newDocument));
        },
        removed: function (oldDocument) {
            self.removed('patients', oldDocument._id);
        }
    });

    self.onStop(function () {
        observer.stop();
    });

    self.ready();

});

Meteor.publish('patients.generations', function () {


    var self = this;
    var observer = Patients.find({}, { sort: { 'profile.surname': 1 }}).observe({
        added: function (document) {
            self.added('patients', document._id, transformPatients (document));
        },
        changed: function (newDocument, oldDocument) {
            self.changed('patients', oldDocument._id, transformPatients (newDocument));
        },
        removed: function (oldDocument) {
            self.removed('patients', oldDocument._id);
        }
    });

    self.onStop(function () {
        observer.stop();
    });

    self.ready();

});

Meteor.publish('patients.single', function (patientId) {
    check(patientId, String);

    var self = this;
    var observer = Patients.find({_id: patientId}).observe({
        added: function (document) {
            self.added('patients', document._id, transformPatients (document));
        },
        changed: function (newDocument, oldDocument) {
            self.changed('patients', oldDocument._id, transformPatients (newDocument));
        },
        removed: function (oldDocument) {
            self.removed('patients', oldDocument._id);
        }
    });

    self.onStop(function () {
        observer.stop();
    });

    self.ready();
});

Meteor.publish('patients.reports', function ( data ) {

    check ( data, Object );

    var query = {},
        projection = { sort: { 'profile.surname': 1 }, fields: { profile: 1, insurance: 1, work: 1, contacts: 1 } };

    if ( data.company_id ) query['company._id'] = data.company_id;
    if ( data.insurance_id ) query['insurance.insurance_id'] = data.insurance_id;
    
    var self = this;
    var observer = Patients.find( query, projection ).observe({
        added: function (document) {
            self.added('patients', document._id, transformPatients (document));
        },
        changed: function (newDocument, oldDocument) {
            self.changed('patients', oldDocument._id, transformPatients (newDocument));
        },
        removed: function (oldDocument) {
            self.removed('patients', oldDocument._id);
        }
    });

    self.onStop(function () {
        observer.stop();
    });

    self.ready();
});

Meteor.publish('patients.reports.search', function ( search ) {

    check( search, Match.OneOf( String, null, undefined ) );

    var query = {},
        projection = { limit: 10, sort: { 'profile.surname': 1 } };

    if ( search ) {

        var regex = new RegExp( search, 'i' );

        query = {
            $or: [
                { 'profile.first_name': regex },
                { 'profile.middle_name': regex },
                { 'profile.surname': regex }
            ]
        };

        projection.limit = 100;

    }


    return Patients.find( query, projection );

});

function transformPatients (doc) {
    if (doc.work) {
        doc.company = Companies.findOne(doc.work.company_id);
    }

    if (doc.insurance) {
        doc.patient_insurance = Insurances.findOne(doc.insurance.insurance_id);
    }
    return doc;
}