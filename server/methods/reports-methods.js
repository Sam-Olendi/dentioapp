Meteor.methods({
    getTotal: function (theDay) {

        check( theDay, Match.OneOf( Object, Array ) );

        var invoices = [], totals = [];

        for ( var i = 0; i < theDay.length; i++) {
            invoices[i] = Invoices.aggregate(
                { $match: { date_issued: { $regex: theDay[i] } } },
                { $group: { _id: theDay[i], total: { $sum: '$amount' } } }
            );
        }

        for( var j = 0; j < invoices.length; j++) {
            if ( invoices[j][0] )
                totals.push(invoices[j][0].total);
            else
                totals.push(0);
        }

        return totals;
    },

    getTreatments: function () {
        var query = Treatments.aggregate({
            $group: {
                _id: { 'appointment_id': '$appointment_id', 'patient_id': '$patient_id', 'date_performed': '$date_performed', 'insurance_id': '$insurance_id' }, total: { $sum: '$amount' }
            }
        });
        var treatments = [], invoice;

        for ( var i = 0; i < query.length; i++ ) {

            invoice = Invoices.findOne({ appointment_id: query[i]._id.appointment_id });

            if ( invoice.company_id ) {

                if ( Insurances.findOne(invoice.insurance_id) ) {
                    treatments.push({
                        patient: Patients.findOne({_id: query[i]._id.patient_id}, { fields: { 'profile.first_name': 1, 'profile.middle_name': 1, 'profile.surname': 1 } }),
                        date_performed: query[i]._id.date_performed,
                        total: query[i].total,
                        invoice_no: Invoices.findOne({ appointment_id: query[i]._id.appointment_id }, { fields: { invoice_no: 1 } }),
                        company: Companies.findOne(invoice.company_id).company_name,
                        insurance: Insurances.findOne(invoice.insurance_id).insurance_name
                    });
                } else {
                    treatments.push({
                        patient: Patients.findOne({_id: query[i]._id.patient_id}, { fields: { 'profile.first_name': 1, 'profile.middle_name': 1, 'profile.surname': 1 } }),
                        date_performed: query[i]._id.date_performed,
                        total: query[i].total,
                        invoice_no: Invoices.findOne({ appointment_id: query[i]._id.appointment_id }, { fields: { invoice_no: 1 } }),
                        company: Companies.findOne(invoice.company_id).company_name
                    });
                }

            } else {

                if ( Insurances.findOne(invoice.insurance_id) ) {
                    treatments.push({
                        patient: Patients.findOne({_id: query[i]._id.patient_id}, { fields: { 'profile.first_name': 1, 'profile.middle_name': 1, 'profile.surname': 1 } }),
                        date_performed: query[i]._id.date_performed,
                        total: query[i].total,
                        invoice_no: Invoices.findOne({ appointment_id: query[i]._id.appointment_id }, { fields: { invoice_no: 1 } }),
                        insurance: Insurances.findOne(invoice.insurance_id).insurance_name
                    });
                } else {
                    treatments.push({
                        patient: Patients.findOne({_id: query[i]._id.patient_id}, { fields: { 'profile.first_name': 1, 'profile.middle_name': 1, 'profile.surname': 1 } }),
                        date_performed: query[i]._id.date_performed,
                        total: query[i].total,
                        invoice_no: Invoices.findOne({ appointment_id: query[i]._id.appointment_id }, { fields: { invoice_no: 1 } })
                    });
                }

            }

            //console.log( treatments );

        }

        //console.log(treatments);

        return treatments;

    }
});