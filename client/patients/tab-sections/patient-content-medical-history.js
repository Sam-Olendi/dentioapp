Template.patientContentMedicalHistory.events({
    'click .js-single-patient-medical-add-illness': function (event) {
        event.preventDefault();

        if ( ! $('.js-single-patient-medical-add-illness-input').length ) {
            $('.single-patient-medical-content-illness').append('<input type="text" class="single-patient-medical-input js-single-patient-medical-add-illness-input">');
        }
    },

    'change .js-single-patient-medical-add-illness-input': function (event) {
        Meteor.call('AddPatientIllness', {
            patient_id: Session.get('currentPatient'),
            significant_illnesses: $(event.target).val()
        });

        $(event.target).val('').remove();
    },

    'click .js-single-patient-medical-add-surgery': function (event) {
        event.preventDefault();

        if ( ! $('.js-single-patient-medical-add-surgery-input').length ) {
            $('.single-patient-medical-content-surgery').append('<input type="text" class="single-patient-medical-input js-single-patient-medical-add-surgery-input">');
        }
    },

    'change .js-single-patient-medical-add-surgery-input': function (event) {
        Meteor.call('AddPatientSurgery', {
            patient_id: Session.get('currentPatient'),
            significant_surgeries: $(event.target).val()
        });
        $(event.target).val('').remove();
    },

    'click .js-single-patient-medical-add-allergy': function (event) {
        event.preventDefault();

        if ( ! $('.js-single-patient-medical-add-allergy-input').length ) {
            $('.single-patient-medical-content-allergy').append('<input type="text" class="single-patient-medical-input js-single-patient-medical-add-allergy-input">');
        }
    },

    'change .js-single-patient-medical-add-allergy-input': function (event) {
        Meteor.call('AddPatientAllergy', {
            patient_id: Session.get('currentPatient'),
            allergies: $(event.target).val()
        });
        $(event.target).val('').remove();
    },

    'click .js-single-patient-medical-add-condition': function (event) {
        event.preventDefault();

        if ( ! $('.js-single-patient-medical-add-condition-input').length ) {
            $('.single-patient-medical-content-condition').append('<input type="text" class="single-patient-medical-input js-single-patient-medical-add-condition-input">');
        }
    },

    'change .js-single-patient-medical-add-condition-input': function (event) {
        Meteor.call('AddPatientCondition', {
            patient_id: Session.get('currentPatient'),
            present_conditions: $(event.target).val()
        });
        $(event.target).val('').remove();
    },

    'click .js-single-patient-medical-add-medication': function (event) {
        event.preventDefault();

        if ( ! $('.js-single-patient-medical-add-medication-input').length ) {
            $('.single-patient-medical-content-medication').append('<input type="text" class="single-patient-medical-input js-single-patient-medical-add-medication-input">');
        }
    },

    'change .js-single-patient-medical-add-medication-input': function (event) {
        Meteor.call('AddPatientMedication', {
            patient_id: Session.get('currentPatient'),
            current_medication: $(event.target).val()
        });
        $(event.target).val('').remove();
    }
});