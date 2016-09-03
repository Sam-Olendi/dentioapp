Meteor.publish('generations.all', function (limit) {

    check (limit, Number);

    var self = this;
    var observer = Generations.find({}, { sort: { generation_no: -1 }, limit: limit}).observe({
        added: function (document) {
            self.added('generations', document._id, transformGenerations (document));
        },
        changed: function (newDocument, oldDocument) {
            self.changed('generations', oldDocument._id, transformGenerations (newDocument));
        },
        removed: function (oldDocument) {
            self.removed('generations', oldDocument._id);
        }
    });

    self.onStop(function () {
        observer.stop();
    });

    self.ready();

});

Meteor.publish('generations.single', function (generationId) {

    check(generationId, String);

    var self = this;
    var observer = Generations.find({_id: generationId}).observe({
        added: function (document) {
            self.added('generations', document._id, transformGenerations (document));
        },
        changed: function (newDocument, oldDocument) {
            self.changed('generations', oldDocument._id, transformGenerations (newDocument));
        },
        removed: function (oldDocument) {
            self.removed('generations', oldDocument._id);
        }
    });

    self.onStop(function () {
        observer.stop();
    });

    self.ready();
});

Meteor.publish('generations.check', function () {
   return Generations.find({}, { limit: 1, sort: { generation_no: -1 }, fields: { generation_no: 1, date_generated: 1 }});
});

Meteor.publish('generations.compare', function () {
    return Generations.find({}, { sort: { generation_no: 1 }, fields: { generation_no: 1, date_generated: 1 }});
});

function transformGenerations (doc) {
    doc.invoice = Invoices.findOne({_id: doc.invoice_id});
    doc.patient = Patients.findOne({_id: doc.patient_id});
    doc.appointment = Appointments.findOne({_id: doc.appointment_id});
    doc.company = Companies.findOne({_id: doc.company_id});
    doc.insurance = Insurances.findOne({_id: doc.insurance_id});
    return doc;
}