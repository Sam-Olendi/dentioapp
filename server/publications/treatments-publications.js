Meteor.publish('treatments.patient', function (patientId) {
    check(patientId, Match.OneOf(String, undefined));

    var self = this;
    var observer = Treatments.find({patient_id: patientId}).observe({
        added: function (document) {
            self.added('treatments', document._id, transformTreatments (document));
        },
        changed: function (newDocument, oldDocument) {
            self.changed('treatments', oldDocument._id, transformTreatments (newDocument));
        },
        removed: function (oldDocument) {
            self.removed('treatments', oldDocument._id);
        }
    });

    self.onStop(function () {
        observer.stop();
    });

    self.ready();

    //return Treatments.find({patient_id: patientId});
});


function transformTreatments (doc) {
    doc.patient = Patients.findOne(doc.patient_id);
    doc.service = Services.findOne(doc.service_id);
    doc.appointment = Appointments.findOne(doc.appointment_id);
    return doc;
}