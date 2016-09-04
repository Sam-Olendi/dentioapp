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
                date_added: moment().format("Do MMM YYYY, h:mm:ss a")
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
                date_added: moment().format("Do MMM YYYY, h:mm:ss a")
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
                date_added: moment().format("Do MMM YYYY, h:mm:ss a")
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
                date_added: moment().format("Do MMM YYYY, h:mm:ss a")
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
                date_added: moment().format("Do MMM YYYY, h:mm:ss a")
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

        Patients.insert({
            _id: 'vanessa',

            profile: {
                first_name: 'Vanessa',
                middle_name: 'Alexis',
                surname: 'Carlton',
                date_added: moment().format("Do MMM YYYY, h:mm:ss a")
            },
            contacts: {

            }
        });

        Patients.insert({
            _id: 'brooke',

            profile: {
                first_name: 'Brooke',
                middle_name: '',
                surname: 'Waggoner',
                date_added: moment().format("Do MMM YYYY, h:mm:ss a")
            },
            contacts: {

            }
        });

        Patients.insert({
            _id: 'regina',

            profile: {
                first_name: 'Regina',
                middle_name: 'Stamtomovic',
                surname: 'Spektor',
                date_added: moment().format("Do MMM YYYY, h:mm:ss a")
            },
            contacts: {

            }
        });

        Patients.insert({
            _id: 'sophia',

            profile: {
                first_name: 'Sophia',
                middle_name: 'Penelope',
                surname: 'Bush',
                date_added: moment().format("Do MMM YYYY, h:mm:ss a")
            },
            contacts: {

            }
        });

        Patients.insert({
            _id: 'hilarie',

            profile: {
                first_name: 'Hilarie',
                middle_name: 'Scott',
                surname: 'Burton',
                date_added: moment().format("Do MMM YYYY, h:mm:ss a")
            },
            contacts: {

            }
        });

        Patients.insert({
            _id: 'bethany',

            profile: {
                first_name: 'Bethany',
                middle_name: 'Joy',
                surname: 'Lenz',
                date_added: moment().format("Do MMM YYYY, h:mm:ss a")
            },
            contacts: {

            }
        });

        Patients.insert({
            _id: 'alexis',

            profile: {
                first_name: 'Alexis',
                middle_name: 'Gilmore',
                surname: 'Bledel',
                date_added: moment().format("Do MMM YYYY, h:mm:ss a")
            },
            contacts: {

            }
        });

        Patients.insert({
            _id: 'lauren',

            profile: {
                first_name: 'Lauren',
                middle_name: 'Danes',
                surname: 'Graham',
                date_added: moment().format("Do MMM YYYY, h:mm:ss a")
            },
            contacts: {

            }
        });

        Patients.insert({
            _id: 'scott',

            profile: {
                first_name: 'Scott',
                middle_name: 'Lucas',
                surname: 'Patterson',
                date_added: moment().format("Do MMM YYYY, h:mm:ss a")
            },
            contacts: {

            }
        });

        Patients.insert({
            _id: 'timmy',

            profile: {
                first_name: 'Timothy',
                middle_name: 'Gregory',
                surname: 'Smith',
                date_added: moment().format("Do MMM YYYY, h:mm:ss a")
            },
            contacts: {

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
            _id: 'greg_appt_2',
            patient_id: 'greg',
            status: 'Completed',
            booked: true,
            date_created: '30th Aug 2016, 3:01:25 pm'
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

    if (Companies.find().count() == 0) {
        Companies.insert({
            _id: 'acme',
            company_name: 'Acme Corp'
        });

        Companies.insert({
            _id: 'equity',
            company_name: 'Equity Bank'
        });

        Companies.insert({
            _id: 'TGS',
            company_name: 'TGS'
        });

        Companies.insert({
            _id: 'fahari',
            company_name: 'Fahari Technologies'
        });

        Companies.insert({
            _id: 'okhi',
            company_name: 'OkHi'
        });
    }

    if (Insurances.find().count() == 0) {
        Insurances.insert({
            _id: 'uap',
            insurance_name: 'UAP Insurance'
        });

        Insurances.insert({
            _id: 'jubilee',
            insurance_name: 'Jubilee Insurance'
        });

        Insurances.insert({
            _id: 'cic',
            insurance_name: 'CIC Insurance'
        });

        Insurances.insert({
            _id: 'aar',
            insurance_name: 'AAR'
        });

        Insurances.insert({
            _id: 'acme',
            insurance_name: 'Acme Insurance'
        });
    }

    if (Services.find().count() == 0) {
        Services.insert({
            _id: 'consultation',
            service_name: 'Consultation',
            service_description: 'They don\'t allow you to have bees in here.',
            service_price: 3500
        });

        Services.insert({
            _id: 'composite',
            service_name: 'All White Composite Filling',
            service_description: 'I like to look in the mirror.',
            service_price: 12000
        });

        Services.insert({
            _id: 'scaling',
            service_name: 'Full Mouth Scaling and Polishing',
            service_description: 'Excuse me, do these effectively hide my thunder?',
            service_price: 3500
        });

        Services.insert({
            _id: 'rct',
            service_name: 'Root Canal Therapy',
            service_description: 'We never had the chance to.',
            service_price: 12000
        });

        Services.insert({
            _id: 'rcf',
            service_name: 'Root Canal Finishing',
            service_description: 'Yeah. Mom\'s awesome. Tobias is Queen Mary.',
            service_price: 3500
        });

        Services.insert({
            _id: 'filling',
            service_name: 'Temporary Filling',
            service_description: 'Cup-A-Soup…baby, I got a stew goin\'',
            service_price: 12000
        });
    }

    if (Findings.find().count() == 0) {

        Findings.insert({
            _id: 'andy_findings',
            patient_id: 'andy',
            appointment_id: 'andy_appt',
            finding_type: 'Extractions',
            tooth_number: 14,
            tooth_part: 'Distal',
            description: 'I figured out a way to make money while I\'m working!',
            date_added: moment().format("Do MMM YYYY, h:mm:ss a")
        });

        Findings.insert({
            _id: 'jenna_findings',
            patient_id: 'jenna',
            appointment_id: 'jenna_appt',
            finding_type: 'Restorations',
            tooth_number: 44,
            tooth_part: 'Buccal',
            description: 'Heyyyyyy, Uncle Father Oscar.',
            date_added: moment().format("Do MMM YYYY, h:mm:ss a")
        });

        Findings.insert({
            _id: 'liz_findings',
            patient_id: 'liz',
            appointment_id: 'liz_appt',
            finding_type: 'Dentures (Full)',
            tooth_number: 28,
            tooth_part: 'Palatal',
            description: 'You can\'t just comb that out and reset it?',
            date_added: moment().format("Do MMM YYYY, h:mm:ss a")
        });

        Findings.insert({
            _id: 'james_findings',
            patient_id: 'james',
            appointment_id: 'james_appt',
            finding_type: 'Crowns and Bridges',
            tooth_number: 18,
            tooth_part: 'Mesial',
            description: 'Te quiero. English, please.',
            date_added: moment().format("Do MMM YYYY, h:mm:ss a")
        });

        Findings.insert({
            _id: 'greg_findings',
            patient_id: 'greg',
            appointment_id: 'greg_appt',
            finding_type: 'Extractions',
            tooth_number: 32,
            tooth_part: 'Lingual',
            description: 'Great, now I\'m late.',
            date_added: moment().format("Do MMM YYYY, h:mm:ss a")
        });
    }

    if (Treatments.find().count() == 0) {

        Treatments.insert({
            _id: 'andy_treatment',
            patient_id: 'andy',
            appointment_id: 'andy_appt',
            service_id: 'consultation',
            amount: 3500,
            date_performed: moment().format("Do MMM YYYY, h:mm:ss a")
        });

        Treatments.insert({
            _id: 'andy_treatment_2',
            patient_id: 'andy',
            appointment_id: 'andy_appt',
            service_id: 'rct',
            amount: 12000,
            tooth_number: 14,
            tooth_part: 'Buccal',
            description: 'What about macaroni – let me finish – salad?',
            notes: 'This is the best free scrapbooking class I\'ve ever taken! No one was making fun of Andy Griffith. I can\'t emphasize that enough. No one\'s called him Baby Buster since high school.',
            date_performed: moment().format("Do MMM YYYY, h:mm:ss a")
        });

        Treatments.insert({
            _id: 'andy_treatment_3',
            patient_id: 'andy',
            appointment_id: 'andy_appt',
            service_id: 'rcf',
            amount: 3500,
            tooth_number: 44,
            tooth_part: 'Mesial',
            description: 'What about macaroni – let me finish – salad?',
            notes: 'This is the best free scrapbooking class I\'ve ever taken! No one was making fun of Andy Griffith. I can\'t emphasize that enough. No one\'s called him Baby Buster since high school.',
            date_performed: moment().format("Do MMM YYYY, h:mm:ss a")
        });

        Treatments.insert({
            _id: 'andy_treatment_4',
            patient_id: 'andy',
            appointment_id: 'andy_appt',
            service_id: 'rct',
            amount: 12000,
            tooth_number: 14,
            tooth_part: 'Buccal',
            description: 'What about macaroni – let me finish – salad?',
            notes: 'This is the best free scrapbooking class I\'ve ever taken! No one was making fun of Andy Griffith. I can\'t emphasize that enough. No one\'s called him Baby Buster since high school.',
            date_performed: moment().format("Do MMM YYYY, h:mm:ss a")
        });

        Treatments.insert({
            _id: 'jenna_treatment',
            patient_id: 'jenna',
            appointment_id: 'jenna_appt',
            service_id: 'rct',
            amount: 12000,
            tooth_number: 17,
            tooth_part: 'Buccal',
            description: 'I want to cry so bad, but I don\'t think I can spare the moisture.',
            notes: 'Don\'t worry, these young beauties have been nowhere near the bananas.',
            date_performed: moment().format("Do MMM YYYY, h:mm:ss a")
        });

        Treatments.insert({
            _id: 'liz_treatment',
            patient_id: 'liz',
            appointment_id: 'liz_appt',
            service_id: 'rct',
            amount: 12000,
            tooth_number: 48,
            tooth_part: 'Distal',
            description: 'Do the right thing here.',
            notes: 'String this blind girl along so that dad doesn\'t have to pay his debt to society. Caw ca caw, caw ca caw, caw ca caw, caw ca caw.',
            date_performed: moment().format("Do MMM YYYY, h:mm:ss a")
        });

        Treatments.insert({
            _id: 'james_treatment',
            patient_id: 'james',
            appointment_id: 'james_appt',
            service_id: 'rct',
            amount: 12000,
            tooth_number: 35,
            tooth_part: 'Occlusal',
            description: 'Family Love Michael.',
            notes: 'George Bush doesn\'t care about black puppets.',
            date_performed: moment().format("Do MMM YYYY, h:mm:ss a")
        });

        Treatments.insert({
            _id: 'greg_treatment',
            patient_id: 'greg',
            appointment_id: 'greg_appt',
            service_id: 'rct',
            amount: 12000,
            tooth_number: 24,
            tooth_part: 'Mesial',
            description: 'It\'s so watery',
            notes: 'For the same reason you should believe a hundred dollar bill is no more than a hundred pennies!',
            date_performed: moment().format("Do MMM YYYY, h:mm:ss a")
        });

        Treatments.insert({
            _id: 'greg_treatment_2',
            patient_id: 'greg',
            appointment_id: 'greg_appt',
            service_id: 'rcf',
            amount: 3500,
            tooth_number: 35,
            tooth_part: 'Occlusal',
            description: 'It\'s so watery',
            notes: 'For the same reason you should believe a hundred dollar bill is no more than a hundred pennies!',
            date_performed: moment().format("Do MMM YYYY, h:mm:ss a")
        });

        Treatments.insert({
            _id: 'greg_treatment_3',
            patient_id: 'greg',
            appointment_id: 'greg_appt_2',
            service_id: 'rcf',
            amount: 3500,
            tooth_number: 35,
            tooth_part: 'Occlusal',
            description: 'It\'s so watery',
            notes: 'For the same reason you should believe a hundred dollar bill is no more than a hundred pennies!',
            date_performed: '30th Aug 2016, 3:20:25 pm'
        });

    }

    if (Invoices.find().count() == 0) {

        Invoices.insert({
            _id: 'andy_invoice',
            invoice_no: 20021,
            patient_id: 'andy',
            appointment_id: 'andy_appt',
            insurance_id: 'cic',
            company_id: 'acme',
            amount: 31000,
            date_issued: new Date().toISOString()
        });

        Invoices.insert({
            _id: 'jenna_invoice',
            invoice_no: 20022,
            patient_id: 'jenna',
            appointment_id: 'jenna_appt',
            insurance_id: 'aar',
            company_id: 'equity',
            amount: 12000,
            date_issued: new Date().toISOString()
        });

        Invoices.insert({
            _id: 'liz_invoice',
            invoice_no: 20023,
            patient_id: 'liz',
            appointment_id: 'liz_appt',
            insurance_id: 'acme',
            company_id: 'fahari',
            amount: 12000,
            date_issued: new Date().toISOString()
        });

        Invoices.insert({
            _id: 'james_invoice',
            invoice_no: 20024,
            patient_id: 'james',
            appointment_id: 'james_appt',
            insurance_id: 'jubilee',
            company_id: 'okhi',
            amount: 12000,
            date_issued: new Date().toISOString()
        });

        Invoices.insert({
            _id: 'greg_invoice',
            invoice_no: 20025,
            patient_id: 'greg',
            appointment_id: 'greg_appt',
            insurance_id: 'uap',
            company_id: 'TGS',
            amount: 15500,
            date_issued: new Date().toISOString()
        });

    }

    if (Generations.find().count() == 0) {

        Generations.insert({
            _id: 'andy_generation',
            invoice_id: 'andy_invoice',
            generation_no: 20021,
            patient_id: 'andy',
            insurance_id: 'cic',
            company_id: 'acme',
            vat: 0,
            appointment_id: 'andy_appt',
            final_amount: 31000,
            date_generated: new Date().toISOString()
        });

        Generations.insert({
            _id: 'jenna_generation',
            invoice_id: 'jenna_invoice',
            generation_no: 20022,
            patient_id: 'jenna',
            insurance_id: 'aar',
            company_id: 'equity',
            vat: 0,
            appointment_id: 'jenna_appt',
            final_amount: 12000,
            date_generated: new Date().toISOString()
        });

        Generations.insert({
            _id: 'liz_generation',
            invoice_id: 'liz_invoice',
            generation_no: 20023,
            patient_id: 'liz',
            appointment_id: 'liz_appt',
            insurance_id: 'acme',
            company_id: 'fahari',
            vat: 0,
            final_amount: 12000,
            date_generated: new Date().toISOString()
        });

        Generations.insert({
            _id: 'james_generation',
            invoice_id: 'james_invoice',
            generation_no: 20024,
            patient_id: 'james',
            insurance_id: 'jubilee',
            company_id: 'okhi',
            vat: 0,
            appointment_id: 'james_appt',
            final_amount: 12000,
            date_generated: new Date().toISOString()
        });

        Generations.insert({
            _id: 'greg_generation',
            invoice_id: 'greg_invoice',
            generation_no: 20025,
            patient_id: 'greg',
            insurance_id: 'uap',
            company_id: 'TGS',
            vat: 0,
            appointment_id: 'greg_appt',
            final_amount: 15500,
            date_generated: new Date().toISOString()
        });
    }
});