Meteor.startup(function () {

    if (Patients.find().count() == 0) {
        Patients.insert({

            _id: 'andy',

            profile: {
                first_name: 'Andrew',
                middle_name: 'Maxwell',
                surname: 'Dwyer',
                sex: 'Male',
                age: 32,
                dob: moment(new Date(1984, 11, 17).toISOString()).format("Do MMM YYYY"),
                dateAdded: moment().format("Do MMM YYYY, h:mm:ss a")
            },

            contacts: {
                mobile: '0728019238',
                phone: [
                    '0209832743',
                    '0207463524'
                ],
                email: 'johnnykarate@gmail.com',
                physical_location: 'Pawnee',
                postal_address: 'P.O Box 73423-00100 G.P.O, <br>Pawnee, Indiana'
            },

            work: {
                company_id: 'acme',
                staff_number: 98473
            },

            insurance: {
                insurance_id: 'cic',
                cover_balance: 47000
            },

            next_of_kin: {
                name: 'April Ludgate',
                phone: [
                    '0727483746',
                    '0209483723'
                ],
                physical_location: 'Parklands'
            },

            medical_history: {
                significant_illnesses: [
                    'Type 1 Diabetes',
                    'Borderline Personality Disorder',
                    'Asthma'
                ],
                significant_surgeries: [
                    'Broken bone repair',
                    'Gall bladder removal',
                    'Tooth extraction',
                    'ECT'
                ],
                allergies: [
                    'Penicillin',
                    'Dust',
                    'Pollen',
                    'Strong scents'
                ],
                current_medication: [
                    'Effexor Veniz 15mg'
                ]
            }
        });

        Patients.insert({

            _id: 'jenna',

            profile: {
                first_name: 'Jenna',
                middle_name: 'Meredith',
                surname: 'Maroney',
                sex: 'Female',
                age: 35,
                dob: moment(new Date(1981, 11, 17).toISOString()).format("Do MMM YYYY"),
                dateAdded: moment().format("Do MMM YYYY, h:mm:ss a")
            },

            contacts: {
                mobile: '0722773645',
                phone: [
                    '0209832743',
                    '0207463524'
                ],
                email: 'jenna.maroney@gmail.com',
                physical_location: 'Scranton',
                postal_address: 'P.O Box 73423-00100 G.P.O, <br>Nairobi, Kenya'
            },

            work: {
                company_id: 'equity',
                staff_number: 94753
            },

            insurance: {
                insurance_id: 'aar',
                cover_balance: 9000
            },

            next_of_kin: {
                name: 'Elizabeth Lemon',
                phone: [
                    '0727483746',
                    '0209483723'
                ],
                physical_location: 'Spring Valley'
            },

            medical_history: {
                significant_illnesses: [
                    'Type 1 Diabetes',
                    'Borderline Personality Disorder',
                    'Asthma'
                ],
                significant_surgeries: [
                    'Broken bone repair',
                    'Gall bladder removal',
                    'Tooth extraction',
                    'ECT'
                ],
                allergies: [
                    'Penicillin',
                    'Dust',
                    'Pollen',
                    'Strong scents'
                ],
                present_conditions: [
                    'Pregnant'
                ],
                current_medication: [
                    'Effexor Veniz 15mg'
                ]
            }
        });

        Patients.insert({

            _id: 'liz',

            profile: {
                first_name: 'Elizabeth',
                middle_name: 'Miervaldis',
                surname: 'Lemon',
                sex: 'Female',
                age: 45,
                dob: moment(new Date(1971, 11, 17).toISOString()).format("Do MMM YYYY"),
                dateAdded: moment().format("Do MMM YYYY, h:mm:ss a")
            },

            contacts: {
                mobile: '0738237438',
                phone: [
                    '0209832743',
                    '0207463524'
                ],
                email: 'liz.lemon@gmail.com',
                physical_location: 'Nairobi',
                postal_address: 'P.O Box 73423-00100 G.P.O, <br>Nairobi, Kenya'
            },

            work: {
                company_id: 'fahari',
                staff_number: 39485
            },

            insurance: {
                insurance_id: 'acme',
                cover_balance: 78000
            },

            next_of_kin: {
                name: 'Jack Donaghy',
                phone: [
                    '0727483746',
                    '0209483723'
                ],
                physical_location: 'Westlands'
            },

            medical_history: {
                significant_illnesses: [
                    'Asthma',
                    'Jazz Hands'
                ],
                present_conditions: [
                    'Pregnant'
                ]
            }
        });

        Patients.insert({

            _id: 'james',

            profile: {
                first_name: 'James',
                middle_name: '',
                surname: 'Franco',
                sex: 'Male',
                age: 38,
                dob: moment(new Date(1978, 11, 17).toISOString()).format("Do MMM YYYY"),
                dateAdded: moment().format("Do MMM YYYY, h:mm:ss a")
            },

            contacts: {
                mobile: '0736374638',
                phone: [
                    '0207367635'
                ],
                email: 'james.franco@gmail.com',
                physical_location: 'Mombasa',
                postal_address: 'P.O Box 73423-00100 G.P.O, <br>Mombasa, Kenya'
            },

            work: {
                company_id: 'okhi',
                staff_number: 39485
            },

            insurance: {
                insurance_id: 'jubilee',
                cover_balance: 78000
            },

            next_of_kin: {
                name: 'Jack Donaghy',
                phone: [
                    '0727483746',
                    '0209483723'
                ],
                physical_location: 'Westlands'
            },

            medical_history: {
                significant_illnesses: [
                    'Asthma',
                    'Jazz Hands'
                ],
                present_conditions: [
                    'Pregnant'
                ]
            }
        });

        Patients.insert({

            _id: 'greg',

            profile: {
                first_name: 'Greg',
                middle_name: 'Andrew',
                surname: 'Laswell',
                sex: 'Male',
                age: 42,
                dob: moment(new Date(1974, 11, 17).toISOString()).format("Do MMM YYYY"),
                dateAdded: moment().format("Do MMM YYYY, h:mm:ss a")
            },

            contacts: {
                mobile: '0736374638',
                phone: [
                    '0207367635'
                ],
                email: 'greg.laswell@laswell.com',
                physical_location: 'Nairobi',
                postal_address: 'P.O Box 73423-00100 G.P.O, <br>Nairobi, Kenya'
            },

            work: {
                company_id: 'TGS',
                staff_number: 39485
            },

            insurance: {
                insurance_id: 'uap',
                cover_balance: 78000
            },

            next_of_kin: {
                name: 'Jack Donaghy',
                phone: [
                    '0727483746',
                    '0209483723'
                ],
                physical_location: 'Westlands'
            },

            medical_history: {
                significant_illnesses: [
                    'Asthma',
                    'Jazz Hands'
                ],
                present_conditions: [
                    'Pregnant'
                ]
            }
        });
    }

    if (Appointments.find().count() == 0) {
        Appointments.insert({
            _id: 'andy_appt',
            patient_id: 'andy',
            status: 'Waiting',
            booked: true,
            date_created: moment().format("Do MMM YYYY, h:mm a")
        });

        Appointments.insert({
            _id: 'james_appt',
            patient_id: 'james',
            status: 'Waiting',
            booked: false,
            date_created: moment().format("Do MMM YYYY, h:mm a")
        });

        Appointments.insert({
            _id: 'greg_appt',
            patient_id: 'greg',
            status: 'Waiting',
            booked: true,
            date_created: moment().format("Do MMM YYYY, h:mm a")
        });

        Appointments.insert({
            _id: 'jenna_appt',
            patient_id: 'jenna',
            status: 'In-Session',
            booked: false,
            date_created: moment().format("Do MMM YYYY, h:mm a")
        });

        Appointments.insert({
            _id: 'liz_appt',
            patient_id: 'liz',
            status: 'Completed',
            booked: true,
            date_created: moment().format("Do MMM YYYY, h:mm a")
        });
    }

});