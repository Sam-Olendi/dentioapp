Meteor.publish('appointments.waiting', function () {
    // Transforming data in a collection
    // More details: https://forums.meteor.com/t/sort-by-a-custom-property-after-transform-a-collection-in-publish/25486

    var self = this;
    var observer = Appointments.find({status: 'Waiting'}).observe({
        added: function (document) {
            self.added('appointments', document._id, transformAppointments (document));
        },
        changed: function (newDocument, oldDocument) {
            self.changed('appointments', oldDocument._id, transformAppointments (newDocument));
        },
        removed: function (oldDocument) {
            self.removed('appointments', oldDocument._id);
        }
    });

    self.onStop(function () {
        observer.stop();
    });

    self.ready();
});

Meteor.publish('appointments.inSession', function () {
    var self = this;
    var observer = Appointments.find({status: 'In-Session'}).observe({
        added: function (document) {
            self.added('appointments', document._id, transformAppointments (document));
        },
        changed: function (newDocument, oldDocument) {
            self.changed('appointments', oldDocument._id, transformAppointments (newDocument));
        },
        removed: function (oldDocument) {
            self.removed('appointments', oldDocument._id);
        }
    });

    self.onStop(function () {
        observer.stop();
    });

    self.ready();
});

Meteor.publish('appointments.completed', function () {
    var self = this;
    var observer = Appointments.find({status: 'Completed'}).observe({
        added: function (document) {
            self.added('appointments', document._id, transformAppointments (document));
        },
        changed: function (newDocument, oldDocument) {
            self.changed('appointments', oldDocument._id, transformAppointments (newDocument));
        },
        removed: function (oldDocument) {
            self.removed('appointments', oldDocument._id);
        }
    });

    self.onStop(function () {
        observer.stop();
    });

    self.ready();
});

Meteor.publish('appointments.check', function () {
   return Appointments.find({}, { fields: { patient_id: 1, status: 1, date_created: 1 } }) ;
});

Meteor.publish('appointments.day.patients', function () {

    var todaysDate = new RegExp(moment().format('Do MMM YYYY'));

    return Appointments.find({
        date_created: { $regex: todaysDate }
    }, { fields: { date_created: 1 } });
});

function transformAppointments (doc) {
    doc.patient = Patients.findOne({_id: doc.patient_id});
    return doc;
}