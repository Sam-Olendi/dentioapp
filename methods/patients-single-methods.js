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

    },

    'AddPatientSex': function (data) {

        check (data, {
            patient_id: String,
            sex: String
        });

        return Patients.update(data.patient_id, {
            $set: {
                'profile.sex': data.sex
            }
        });

    },

    'AddPatientAge': function (data) {

        check (data, {
            patient_id: String,
            age: Number
        });

        return Patients.update(data.patient_id, {
            $set: {
                'profile.age': data.age
            }
        });

    },

    'AddPatientDOB': function (data) {

        check (data, {
            patient_id: String,
            dob: String
        });

        return Patients.update(data.patient_id, {
            $set: {
                'profile.dob': data.dob
            }
        });

    },

    'AddPatientMobile': function (data) {

        check (data, {
            patient_id: String,
            mobile: String
        });

        return Patients.update(data.patient_id, {
            $set: {
                'contacts.mobile': data.mobile
            }
        });

    },

    'AddPatientPhone': function (data) {

        check (data, {
            patient_id: String,
            phone: String
        });

        return Patients.update(data.patient_id, {
            $set: {
                'contacts.phone': [data.phone]
            }
        });
    },

    'AddPatientEmail': function (data) {

        check (data, {
            patient_id: String,
            email: String
        });

        return Patients.update(data.patient_id, {
            $set: {
                'contacts.email': data.email
            }
        });
    },

    'AddPatientLocation': function (data) {

        check (data, {
            patient_id: String,
            location: String
        });

        return Patients.update(data.patient_id, {
            $set: {
                'contacts.physical_location': data.location
            }
        });
    },

    'AddPatientPostal': function (data) {

        check (data, {
            patient_id: String,
            postal: String
        });

        return Patients.update(data.patient_id, {
            $set: {
                'contacts.postal_address': data.postal
            }
        });
    },

    'AddPatientWorkplace': function (data) {

        check (data, {
            patient_id: String,
            workplace: String
        });

        if ( Companies.find({'company_name': data.workplace}).count() ) {
            var company_id = Companies.find({ 'company_name': data.workplace }, { limit: 1 }).fetch()[0]._id;
            return Patients.update(data.patient_id, {
                $set: {
                    'work.company_id': company_id
                }
            });
        } else {
            return Patients.update(data.patient_id, {
                $set: {
                    'work.company_id': Companies.insert({company_name: data.workplace})
                }
            });
        }

    },

    'AddPatientStaffNumber': function (data) {

        check (data, {
            patient_id: String,
            staff_number: Match.OneOf(String, Number)
        });

        return Patients.update(data.patient_id, {
            $set: {
                'work.staff_number': data.staff_number
            }
        });
    },

    'AddPatientInsurance': function (data) {

        check (data, {
            patient_id: String,
            insurance: String
        });

        if (Insurances.find({'insurance_name': data.insurance }, {limit: 1}).count()) {
            var result = Insurances.find({'insurance_name': data.insurance}, {limit: 1}).fetch()[0];
            return Patients.update(data.patient_id, {
                $set: {
                    "insurance.insurance_id": result._id
                }
            });
        } else {
            return Patients.update(data.patient_id, {
                $set: {
                    "insurance.insurance_id": Insurances.insert({insurance_name: data.insurance})
                }
            });
        }
    },

    'AddPatientCover': function (data) {

        check (data, {
            patient_id: String,
            cover: Number
        });

        return Patients.update(data.patient_id, {
            $set: {
                'insurance.cover_balance': data.cover
            }
        });
    },

    'AddPatientKinName': function (data) {

        check (data, {
            patient_id: String,
            name: String
        });

        return Patients.update(data.patient_id, {
            $set: {
                'next_of_kin.name': data.name
            }
        });
    },

    'AddPatientKinPhone': function (data) {

        check (data, {
            patient_id: String,
            phone: String
        });

        return Patients.update(data.patient_id, {
            $set: {
                'next_of_kin.phone': [data.phone]
            }
        });
    },

    'AddPatientKinLocation': function (data) {

        check (data, {
            patient_id: String,
            location: String
        });

        return Patients.update(data.patient_id, {
            $set: {
                'next_of_kin.physical_location': data.location
            }
        });
    },

    'AddPatientIllness': function (data) {

        check (data, {
            patient_id: String,
            significant_illnesses: String
        });

        return Patients.update(data.patient_id, {
            $push: {
                'medical_history.significant_illnesses' : data.significant_illnesses
            }
        });
    },

    'AddPatientSurgery': function (data) {

        check (data, {
            patient_id: String,
            significant_surgeries: String
        });

        return Patients.update(data.patient_id, {
            $push: {
                "medical_history.significant_surgeries" : data.significant_surgeries
            }
        });
    },

    'AddPatientAllergy': function (data) {

        check (data, {
            patient_id: String,
            allergies: String
        });

        return Patients.update(data.patient_id, {
            $push: {
                "medical_history.allergies" : data.allergies
            }
        });
    },

    'AddPatientCondition': function (data) {

        check (data, {
            patient_id: String,
            present_conditions: String
        });

        return Patients.update(data.patient_id, {
            $push: {
                "medical_history.present_conditions" : data.present_conditions
            }
        });
    },

    'AddPatientMedication': function (data) {

        check (data, {
            patient_id: String,
            current_medication: String
        });

        return Patients.update(data.patient_id, {
            $push: {
                "medical_history.current_medication" : data.current_medication
            }
        });
    }
});