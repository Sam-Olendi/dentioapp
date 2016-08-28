Meteor.publish('appointments.waiting', function () {
    // Transforming data in a collection
    // More details: https://forums.meteor.com/t/sort-by-a-custom-property-after-transform-a-collection-in-publish/25486

    var self = this;
    var observer = Appointments.find({status: 'Waiting'}).observe({
        added: function (document) {
            self.added('appointments', document._id, transformAppointments (document));
        },
        changed: function (newDocument, oldDocument) {
            self.changed('appointments', oldDocument._id, transform(newDocument));
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
            self.changed('appointments', oldDocument._id, transform(newDocument));
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
            self.changed('appointments', oldDocument._id, transform(newDocument));
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

function transformAppointments (doc) {
    doc.patient = Patients.findOne({_id: doc.patient_id});
    return doc;
}