Meteor.methods({
    'UpdateWorkDetails': function (data) {

        check (data, {
            patient_id: String,
            company_id: String,
            staff_number: Match.OneOf(String, Number, null, undefined)
        });

        return Patients.update(data.patient_id, {
            $set: {
                'work.company_id': data.company_id,
                'work.staff_number': data.staff_number
            }
        });

    }
});