Meteor.methods({
    'AddPatient': function (data) {
        check(data, {
            profile: {
                first_name: String,
                middle_name: Match.OneOf(String, null, undefined),
                surname: String,
                date_added: String
            },
            contacts: {
                email: Match.OneOf(String, null, undefined),
                mobile: Match.OneOf(String, null, undefined)
            }
        });

        return Patients.insert(data);
    },

    'DeletePatient': function (data) {
        check(data, String);

        Appointments.remove({patient_id: data});
        Findings.remove({patient_id: data});
        Treatments.remove({patient_id: data});
        Invoices.remove({patient_id: data});
        Generations.remove({patient_id: data});

        return Patients.remove(data);
    }
});