Meteor.methods({
    'SaveInvoice': function (patientId) {

        check (patientId, String);

        var lastInvoiceNo = Invoices.find({}, { sort: { invoice_no: -1 }, limit: 1 }).fetch()[0].invoice_no,
            lastGenerationNo =  Generations.find({}, { sort: { generation_no: -1 }, fields: { generation_no: 1, date_generated: 1 }}).fetch()[0].generation_no,
            newInvoiceNo,
            dateRegex = new RegExp(moment().format('Do MMM YYYY')),
            appointmentId = Appointments.find({patient_id: patientId, status: { $regex: /(Waiting)|(In-Session)/ }, date_created: { $regex: dateRegex }}).fetch()[0]._id,
            patient = Patients.findOne({_id: patientId}),
            consultation = Services.findOne({service_name: { $regex: /(Consultation)/ }}),
            companyId, insuranceId;

        if (patient.work) {
            companyId = patient.work.company_id;
        } else {
            companyId = '';
        }

        if (patient.insurance) {
            insuranceId = patient.insurance.insurance_id
        } else {
            insuranceId = '';
        }

        Treatments.insert({
            patient_id: patientId,
            appointment_id: appointmentId,
            service_id: consultation._id,
            amount: consultation.service_price,
            date_performed: moment().format('Do MMM YYYY, h:mm:ss a')
        });

        var treatments = Treatments.find({appointment_id: appointmentId}).fetch(),
            amount = 0;

        for (var i = 0; i < treatments.length; i++) {
            amount += treatments[i].amount;
        }

        Appointments.update(appointmentId, {
            $set: {
                status: 'Completed'
            }
        });

        if ( lastInvoiceNo >= lastGenerationNo ) {
            newInvoiceNo = lastInvoiceNo + 1;
        } else {
            newInvoiceNo = lastGenerationNo + 1;
        }

        var invoiceId =  Invoices.insert({
            invoice_no: newInvoiceNo,
            patient_id: patientId,
            appointment_id: appointmentId,
            insurance_id: insuranceId,
            company_id: companyId,
            amount: amount,
            date_issued: moment().format('Do MMM YYYY'),
            timestamp: new Date().toISOString()
        });

        return Generations.insert({
            invoice_id: invoiceId,
            generation_no: newInvoiceNo,
            patient_id: patientId,
            appointment_id: appointmentId,
            insurance_id: insuranceId,
            company_id: companyId,
            vat: 0,
            final_amount: amount,
            date_generated: moment().format('Do MMM YYYY')
        });

    }
});
