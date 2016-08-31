// set session default
// used as a limit for the record set find()
Session.setDefault('patientsLimit', 10);


function openCloseModal (modalClass, modalContentClass, modalCloseClass) {
    // this function provides the ability to open and close modals
    $(modalClass).addClass('modal-is-active');
    $(modalContentClass).addClass('modal-content-is-active');

    $('.modal-close,' + modalCloseClass).click(function () {
        $('.body-error').hide();
        Session.set('selectedPatientId', undefined);

        $(modalClass).removeClass('modal-is-active');
        $(modalContentClass).removeClass('modal-content-is-active');
    });
}

function openModal (modalClass, modalContentClass) {
    $(modalClass).addClass('modal-is-active');
    $(modalContentClass).addClass('modal-content-is-active');
}

function closeModal (modalClass, modalContentClass) {
    $('.body-error').hide();
    Session.set('selectedPatientId', undefined);
    $(modalClass).removeClass('modal-is-active');
    $(modalContentClass).removeClass('modal-content-is-active');
}

function validateRequired (inputSelector, regex, errorSelector) {
    // validate a required field
    if ( !$(inputSelector).val().trim().match(regex) ) {
        $(errorSelector).show(); // show error icon
        $(inputSelector).css({ 'padding-left': '25px' }); // allow space for error icon
        return false; // fails validation
    } else {
        $(errorSelector).hide(); // hide error icon
        $(inputSelector).css({ 'padding-left': '15px' }); // return to previous padding
        return true; // passes validation
    }
}

function validateOptional (inputSelector, regex, errorSelector) {
    // validate an optional field
    if ( !$(inputSelector).val().trim().match(regex) ) {
        if ( $(inputSelector).val().trim() !== '') {
            $(errorSelector).show();
            $(inputSelector).css({ 'padding-left': '25px' });
            return false; // fails validation
        }
        return true; // passes validation (if '' that's alright. not a compulsory field)
    } else {
        $(errorSelector).hide();
        $(inputSelector).css({ 'padding-left': '15px' });
        return true; // passes validation
    }
}

Template.patientsNewButton.events({
   'click .js-patient-new-trigger': function () {
       // attach the modal functionality to the 'Add new patient' modal
       openCloseModal('.patient-new-modal', '.patient-new-modal-content', '.js-cancel-patient-new');
   }
});

Template.patientsNewModal.events({
    'submit #patient-new-form': function (event) {
        // submit form to add new patient
        event.preventDefault();

        var nameRegex = /[A-Za-z]+/gm,
            emailRegex = /([\w\.]+)@([\w\.]+)\.(\w+)/i,
            mobileRegex = /^(\+\d{0,2})?([\s]?(\(0\))[\s]?)?((\d)+([\s]? | [\-]?)?\d)+\d*$/m;

        // results from the validation
        var validateFirstName = validateRequired('#patient-form-first-name', nameRegex, '.js-error-fname');
        var validateMiddleName =validateOptional('#patient-form-middle-name', nameRegex, '.js-error-mname');
        var validateSurname = validateRequired('#patient-form-surname', nameRegex, '.js-error-sname');
        var validateEmail = validateOptional('#patient-form-email', emailRegex, '.js-error-email');
        var validateMobile = validateOptional('#patient-form-mobile', mobileRegex, '.js-error-mobile');

        if ( validateFirstName && validateMiddleName && validateSurname && validateEmail && validateMobile ) {
            // call the AppPatient method (check methods/patients-methods.js
            Meteor.call('AddPatient', {
                profile: {
                    first_name: $('#patient-form-first-name').val().trim(),
                    middle_name: $('#patient-form-middle-name').val().trim(),
                    surname: $('#patient-form-surname').val().trim(),
                    date_added: moment().format('Do MMM YYYY, h:mm:ss a')
                },
                contacts: {
                    email: $('#patient-form-email').val().trim(),
                    mobile: $('#patient-form-mobile').val().trim()
                }
            });

            closeModal('.patient-new-modal', '.patient-new-modal-content');
        } else {
            alert('Oh no. Seems like your form isn\'t filled correctly. Please correct the errors');
        }

    }
});

Template.patientsContent.onCreated(function () {

    var self = Template.instance();
    // autorun ensures the limit is up to date with the session changes
    Tracker.autorun(function () {
        self.subscribe('patients.all', Session.get('patientsLimit'));
    });
});

Template.patientsContent.helpers({
    patientsFound: function () {
        // return patients with the set limit
        return Patients.find({}, {limit: Session.get('patientsLimit'), sort: { 'profile.surname': 1 }}).fetch().length;
    }
});

Template.patientsContent.events({
    'click .js-show-more-patients': function () {
        // change the session value
        // used to implement an infinite scroll
        Session.set('patientsLimit', Session.get('patientsLimit') + 10);
    }
});

Template.patientsTableRow.helpers({
    patients: function () {
        // return all patients
       return Patients.find({}, {limit: Session.get('patientsLimit')});
    }
});

Template.patientsTableRow.events({
    /*
     UX Addition: Convert the rows on the patient table into faux-links
     */
   'mouseenter tr': function () {
       // show a cursor when user hovers over a row on the patients table (for UX)
       $(event.target).css({'cursor': 'pointer'});
       Session.setPersistent('currentPatient', this._id);
   },

    'click tr': function () {
        // make the rows on the patient table clickable rather than just the patient name (for UX)
        Router.go('/patients/' + Session.get('currentPatient'));
    }
});