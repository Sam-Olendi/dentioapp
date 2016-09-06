Meteor.methods({
    'AddTreatment': function (data) {
        check(data, {
            patient_id: String,
            service_id: String,
            amount: Number,
            tooth_number: Number,
            tooth_part: String,
            description: String,
            date_performed: String,
            regex: String
        });

        var appointmentId = Appointments.find({patient_id: data.patient_id, status: { $regex: /(Waiting)|(In-Session)/ }, date_created: { $regex: data.regex }}).fetch()[0]._id;

        return Treatments.insert({
            patient_id: data.patient_id,
            appointment_id: appointmentId,
            service_id: data.service_id,
            amount: data.amount,
            tooth_number: data.tooth_number,
            tooth_part: data.tooth_part,
            description: data.description,
            date_performed: data.date_performed
        });
    },

    'UpdateTreatment': function (data) {

        check (data, {
            _id: String,
            patient_id: String,
            service_id: String,
            amount: Number,
            description: String
        });

        return Treatments.update(data._id, {
            $set: {
                service_id: data.service_id,
                amount: data.amount,
                description: data.description
            }
        });

    },

    'AddGeneratedTreatment': function (data) {

        check (data, {
            patient_id: String,
            generation_no: Number,
            service_id: String,
            quantity: Number,
            price: Number,
            amount: Number,
            description: String,
            date_performed: String
        });

        return Treatments.insert(data);

    },

    'UpdateGeneratedTreatment': function (data) {

        check (data, {
            treatment_id: String,
            service_id: String,
            quantity: Number,
            price: Number,
            amount: Number
        });

        return Treatments.update(data.treatment_id, {
            $set: {
                service_id: data.service_id,
                quantity: data.quantity,
                price: data.price,
                amount: data.amount
            }
        });

    },

    'DeleteGeneratedTreatment': function (treatment_id) {
        check (treatment_id, String);
        return Treatments.remove(treatment_id);
    }
});