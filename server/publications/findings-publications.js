Meteor.publish('findings.patient', function (patientId) {
    check(patientId, Match.OneOf(String, undefined, null));

    var self = this;
    var observer = Findings.find({patient_id: patientId}).observe({
        added: function (document) {
            self.added('findings', document._id, transformFindings (document));
        },
        changed: function (newDocument, oldDocument) {
            self.changed('findings', oldDocument._id, transformFindings (newDocument));
        },
        removed: function (oldDocument) {
            self.removed('findings', oldDocument._id);
        }
    });

    self.onStop(function () {
        observer.stop();
    });

    self.ready();
});

function transformFindings (doc) {
    doc.patient = Patients.findOne(doc.patient_id);
    return doc;
}