Meteor.publish('invoices', function (limit) {

    check (limit, Number);

    var self = this;
    var observer = Invoices.find({}, {limit: limit, sort: { invoice_no: -1 }}).observe({
        added: function (document) {
            self.added('invoices', document._id, transformInvoices (document));
        },
        changed: function (newDocument, oldDocument) {
            self.changed('invoices', oldDocument._id, transformInvoices (newDocument));
        },
        removed: function (oldDocument) {
            self.removed('invoices', oldDocument._id);
        }
    });

    self.onStop(function () {
        observer.stop();
    });

    self.ready();
});

Meteor.publish('invoices.patient', function (data) {

    check (data, {
        patientId: String,
        limit: Number
    });

    var self = this;
    var observer = Invoices.find({patient_id: data.patientId}, { sort: { date_issued: 1 }, limit: data.limit}).observe({
        added: function (document) {
            self.added('invoices', document._id, transformInvoices (document));
        },
        changed: function (newDocument, oldDocument) {
            self.changed('invoices', oldDocument._id, transformInvoices (newDocument));
        },
        removed: function (oldDocument) {
            self.removed('invoices', oldDocument._id);
        }
    });

    self.onStop(function () {
        observer.stop();
    });

    self.ready();

});

Meteor.publish('invoices.check', function () {
    return Invoices.find({}, { limit: 1, sort: { invoice_no: -1 }, fields: { invoice_no: 1 }});
});

Meteor.publish( 'invoices.reports.total', function () {
    var todaysDate = new RegExp( moment().format('Do MMM YYYY') );

    return Invoices.find({
        date_issued: { $regex: todaysDate }
    }, { fields: { amount: 1, date_issued: 1 } });
} );

function transformInvoices (doc) {
    doc.patient = Patients.findOne({_id: doc.patient_id});
    doc.appointment = Appointments.findOne({_id: doc.appointment_id});
    doc.insurance = Insurances.findOne({_id: doc.insurance_id});
    doc.company = Companies.findOne({_id: doc.company_id});
    return doc;
}