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

    getTreatments: function ( data ) {

        check( data, Object );

        var query = Treatments.aggregate({
            $group: {
                _id: { 'appointment_id': '$appointment_id', 'patient_id': '$patient_id', 'date_performed': '$date_performed', 'insurance_id': '$insurance_id' }, total: { $sum: '$amount' }
            }
        });

        var treatments = [], invoice;

        if ( data.company_id && data.insurance_id ) {
            console.log('has a company & insurance');
        } else if ( data.company_id && !data.insurance_id ) {

            for ( var b = 0; b < query.length; b++ ) {
                invoice = Invoices.findOne({ appointment_id: query[b]._id.appointment_id });

                if (invoice.company_id == data.company_id) {
                    treatments.push({
                        patient: Patients.findOne({_id: query[b]._id.patient_id}, { fields: { 'profile.first_name': 1, 'profile.middle_name': 1, 'profile.surname': 1 } }),
                        date_performed: query[b]._id.date_performed,
                        total: query[b].total,
                        invoice_no: Invoices.findOne({ appointment_id: query[b]._id.appointment_id }, { fields: { invoice_no: 1 } }),
                        company: Companies.findOne(invoice.company_id).company_name,
                        insurance: Insurances.findOne(invoice.insurance_id).insurance_name
                    });
                }

            }

        } else if ( !data.company_id && data.insurance_id ) {

            for ( var c = 0; c < query.length; c++ ) {
                invoice = Invoices.findOne({ appointment_id: query[c]._id.appointment_id });

                if ( invoice.insurance_id == data.insurance_id ) {
                    treatments.push({
                        patient: Patients.findOne({_id: query[c]._id.patient_id}, { fields: { 'profile.first_name': 1, 'profile.middle_name': 1, 'profile.surname': 1 } }),
                        date_performed: query[c]._id.date_performed,
                        total: query[c].total,
                        invoice_no: Invoices.findOne({ appointment_id: query[c]._id.appointment_id }, { fields: { invoice_no: 1 } }),
                        company: Companies.findOne(invoice.company_id).company_name,
                        insurance: Insurances.findOne(invoice.insurance_id).insurance_name
                    });
                }

            }

        } else if ( !data.company_id && !data.insurance_id ) {

            for ( var d = 0; d < query.length; d++ ) {
                invoice = Invoices.findOne({ appointment_id: query[d]._id.appointment_id });

                if ( invoice.company_id ) {
                    treatments.push({
                        patient: Patients.findOne({_id: query[d]._id.patient_id}, { fields: { 'profile.first_name': 1, 'profile.middle_name': 1, 'profile.surname': 1 } }),
                        date_performed: query[d]._id.date_performed,
                        total: query[d].total,
                        invoice_no: Invoices.findOne({ appointment_id: query[d]._id.appointment_id }, { fields: { invoice_no: 1 } }),
                        company: Companies.findOne(invoice.company_id).company_name,
                        insurance: Insurances.findOne(invoice.insurance_id).insurance_name
                    });
                } else {
                    treatments.push({
                        patient: Patients.findOne({_id: query[d]._id.patient_id}, { fields: { 'profile.first_name': 1, 'profile.middle_name': 1, 'profile.surname': 1 } }),
                        date_performed: query[d]._id.date_performed,
                        total: query[d].total,
                        invoice_no: Invoices.findOne({ appointment_id: query[d]._id.appointment_id }, { fields: { invoice_no: 1 } }),
                        insurance: Insurances.findOne(invoice.insurance_id).insurance_name
                    });
                }
            }

        } else {
            console.log(data);
        }

        //console.log(treatments);
        return treatments;

    }
});