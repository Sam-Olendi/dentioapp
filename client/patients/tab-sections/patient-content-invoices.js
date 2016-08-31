Session.setDefault('patientInvoicesLimit', 10);

Template.singlePatientInvoices.onCreated(function () {

    var self = this;
    self.autorun(function () {
        self.subscribe('invoices.patient', { patientId: Session.get('currentPatient'), limit: Session.get('patientInvoicesLimit') });
    });

});

Template.singlePatientInvoices.rendered = function () {
    // get the last part of the URI (patient's _id) and set it to a session
    // it'll be used for easy access in this template
    var patientURI = window.location.pathname.split('/');
    Session.set('currentPatient', patientURI[patientURI.length - 1]);
};

Template.singlePatientInvoices.helpers({
    patientInvoicesFound: function () {
        return Invoices.find({patient_id: Session.get('currentPatient')}, { sort: { date_issued: 1 }, limit: Session.get('patientInvoicesLimit') }).fetch().length;
    }
});

Template.singlePatientInvoices.events({
    'click .js-show-more-patient-invoices': function () {
        Session.set('patientInvoicesLimit', Session.get('patientInvoicesLimit') + 10);
    }
});

Template.singlePatientInvoicesRow.helpers({
    patientInvoices: function () {
        return Invoices.find({patient_id: Session.get('currentPatient')}, { sort: { date_issued: 1 }, limit: Session.get('patientInvoicesLimit') });
    }
});