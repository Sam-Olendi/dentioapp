Meteor.methods({
    'AddAppointment': function (data) {
        check(data, {
            patient_id: String,
            status: String,
            booked: Boolean,
            date_created: String
        });

        return Appointments.insert(data);
    },

    'UpdateAppointment': function (data) {
        check(data, {
            _id: String,
            patient_id: String,
            status: String,
            booked: Boolean
        });

        return Appointments.update(data._id, {
            $set: {
                patient_id: data.patient_id,
                status: data.status,
                booked: data.booked
            }
        });
    },

    'DeleteAppointment': function (appointmentId) {
        check(appointmentId, String);

        return Appointments.remove(appointmentId);
    }
});