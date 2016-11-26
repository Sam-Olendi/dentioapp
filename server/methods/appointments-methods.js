Meteor.methods({
    'AddAppointment': function (data) {
        // add new appointment

        // use check to verify data type
        check(data, {
            patient_id: String,
            status: String,
            booked: Boolean,
            date_created: String
        });

        return Appointments.insert(data);
    },

    'UpdateAppointment': function (data) {
        // edit appointment

        // use check to verify data type
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

    'UpdateAppointmentOnStart': function (data) {
        // update appointment when the user chooses to begin the appointment

        check (data, {
            _id: String,
            status: String
        });

        return Appointments.update(data._id, {
            $set: {
                status: data.status
            }
        });
    },

    'DeleteAppointment': function (appointmentId) {
        // delete appointment

        // use check to verify data type
        check(appointmentId, String);

        return Appointments.remove(appointmentId);
    }
});