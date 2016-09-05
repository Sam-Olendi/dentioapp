var showInput = function (triggerClass, inputClass) {
    var inputItem = $(inputClass),
        triggerItem = $(triggerClass);
    inputItem.show();
    triggerItem.hide();
};

Template.singlePatientSex.events({
    'click .js-patient-add-sex': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-sex-input'),
            inputValue = input.val().trim(),
            patientId = input.data('id'),
            regex = /[A-Za-z]+/gm;

        showInput('.js-patient-add-sex', '.js-patient-add-sex-input');

        input.change(function () {
            Meteor.call('AddPatientSex', {
                patient_id: Session.get('currentPatient'),
                sex: input.val()
            });

            input.hide();
        });
    },

    'dblclick .js-single-patient-dblclick-sex': function () {
        var input = $('.js-patient-add-sex-input');

        $(event.target).hide();
        input.show().select();

        input.change(function () {
            Meteor.call('AddPatientAge', {
                patient_id: Session.get('currentPatient'),
                sex: input.val()
            });

            input.hide();
            $('.js-single-patient-dblclick-sex').show();
        });
    }
});

Template.singlePatientAge.events({
    'click .js-patient-add-age': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-age-input');

        showInput('.js-patient-add-age', '.js-patient-add-age-input');

        input.change(function () {
            Meteor.call('AddPatientAge', {
                patient_id: Session.get('currentPatient'),
                age: parseInt(input.val())
            });

            input.hide();
        });
    },

    'dblclick .js-single-patient-dblclick-age': function () {
        var input = $('.js-patient-add-age-input');

        $(event.target).hide();
        input.show().select();

        input.change(function () {
            Meteor.call('AddPatientAge', {
                patient_id: Session.get('currentPatient'),
                age: parseInt(input.val())
            });

            input.hide();
            $('.js-single-patient-dblclick-age').show();
        });
    }
});

Template.singlePatientDOB.events({
    'click .js-patient-add-dob': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-dob-input').datepicker({dateFormat: 'yy mm dd', maxDate: 0});

        showInput('.js-patient-add-dob', '.js-patient-add-dob-input');

        input.change(function () {
            Meteor.call('AddPatientDOB', {
                patient_id: Session.get('currentPatient'),
                dob: moment(new Date(input.val()).toISOString()).format('Do MMM YYYY')
            });

            input.hide();
        });
    },

    'dblclick .js-single-patient-dblclick-dob': function () {
        var input = $('.js-patient-add-dob-input').datepicker({dateFormat: 'yy mm dd', maxDate: 0});

        $(event.target).hide();
        input.show().select();

        input.change(function () {
            Meteor.call('AddPatientDOB', {
                patient_id: Session.get('currentPatient'),
                dob: moment(new Date(input.val()).toISOString()).format('Do MMM YYYY')
            });

            input.hide();
            $('.js-single-patient-dblclick-dob').show();
        });
    }
});

Template.singlePatientMobile.events({
    'click .js-patient-add-mobile': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-mobile-input');

        showInput('.js-patient-add-mobile', '.js-patient-add-mobile-input');

        input.change(function () {
            Meteor.call('AddPatientMobile', {
                patient_id: Session.get('currentPatient'),
                mobile: input.val()
            });

            input.hide();
        });
    },

    'dblclick .js-single-patient-dblclick-mobile': function () {
        var input = $('.js-patient-add-mobile-input');

        $(event.target).hide();
        input.show().select();

        input.change(function () {
            Meteor.call('AddPatientMobile', {
                patient_id: Session.get('currentPatient'),
                mobile: input.val()
            });

            input.hide();
            $('.js-single-patient-dblclick-mobile').show();
        });
    }
});

Template.singlePatientPhone.events({
    'click .js-patient-add-phone': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-phone-input');

        showInput('.js-patient-add-phone', '.js-patient-add-phone-input');

        input.change(function () {
            Meteor.call('AddPatientPhone', {
                patient_id: Session.get('currentPatient'),
                phone: input.val()
            });

            input.hide();
        });
    },

    'dblclick .js-single-patient-dblclick-phone': function () {
        var input = $('.js-patient-add-phone-input');

        $(event.target).hide();
        input.show().select();

        input.change(function () {
            Meteor.call('AddPatientPhone', {
                patient_id: Session.get('currentPatient'),
                phone: input.val()
            });

            input.hide();
            $('.js-single-patient-dblclick-phone').show();
        });
    }
});

Template.singlePatientEmail.events({
    'click .js-patient-add-email': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-email-input');

        showInput('.js-patient-add-email', '.js-patient-add-email-input');

        input.change(function () {
            Meteor.call('AddPatientEmail', {
                patient_id: Session.get('currentPatient'),
                email: input.val()
            });

            input.hide();
        });
    },

    'dblclick .js-single-patient-dblclick-email': function () {
        var input = $('.js-patient-add-email-input');

        $(event.target).hide();
        input.show().select();

        input.change(function () {
            Meteor.call('AddPatientEmail', {
                patient_id: Session.get('currentPatient'),
                email: input.val()
            });

            input.hide();
            $('.js-single-patient-dblclick-email').show();
        });
    }
});

Template.singlePatientPhysicalAddress.events({
    'click .js-patient-add-address': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-address-input');

        showInput('.js-patient-add-address', '.js-patient-add-address-input');

        input.change(function () {
            Meteor.call('AddPatientLocation', {
                patient_id: Session.get('currentPatient'),
                location: input.val()
            });

            input.hide();
        });
    },

    'dblclick .js-single-patient-dblclick-address': function () {
        var input = $('.js-patient-add-address-input');

        $(event.target).hide();
        input.show().select();

        input.change(function () {
            Meteor.call('AddPatientLocation', {
                patient_id: Session.get('currentPatient'),
                location: input.val()
            });

            input.hide();
            $('.js-single-patient-dblclick-address').show();
        });
    }
});

Template.singlePatientPostalAddress.events({
    'click .js-patient-add-postal': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-postal-input');

        showInput('.js-patient-add-postal', '.js-patient-add-postal-input');

        input.change(function () {
            Meteor.call('AddPatientPostal', {
                patient_id: Session.get('currentPatient'),
                postal: input.val()
            });

            input.hide();
        });
    },

    'dblclick .js-single-patient-dblclick-postal': function () {
        var input = $('.js-patient-add-postal-input');

        $(event.target).hide();
        input.show().select();

        input.change(function () {
            Meteor.call('AddPatientPostal', {
                patient_id: Session.get('currentPatient'),
                postal: input.val()
            });

            input.hide();
            $('.js-single-patient-dblclick-postal').show();
        });
    }
});

Template.singlePatientCompany.events({
    'click .js-patient-add-workplace': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-workplace-input');

        showInput('.js-patient-add-workplace', '.js-patient-add-workplace-input');

        input.change(function () {
            Meteor.call('AddPatientWorkplace', {
                patient_id: Session.get('currentPatient'),
                workplace: input.val()
            });

            input.hide();
        });
    },

    'dblclick .js-single-patient-dblclick-workplace': function () {
        var input = $('.js-patient-add-workplace-input');

        $(event.target).hide();
        input.show().select();

        input.change(function () {
            Meteor.call('AddPatientWorkplace', {
                patient_id: Session.get('currentPatient'),
                workplace: input.val()
            });

            input.hide();
            $('.js-single-patient-dblclick-workplace').show();
        });
    }
});

Template.singlePatientStaffNumber.events({
    'click .js-patient-add-staffno': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-staffno-input');

        showInput('.js-patient-add-staffno', '.js-patient-add-staffno-input');

        input.change(function () {
            Meteor.call('AddPatientStaffNumber', {
                patient_id: Session.get('currentPatient'),
                staff_number: input.val()
            });

            input.hide();
        });
    },

    'dblclick .js-single-patient-dblclick-staffno': function () {
        var input = $('.js-patient-add-staffno-input');

        $(event.target).hide();
        input.show().select();

        input.change(function () {
            Meteor.call('AddPatientStaffNumber', {
                patient_id: Session.get('currentPatient'),
                staff_number: input.val()
            });

            input.hide();
            $('.js-single-patient-dblclick-staffno').show();
        });
    }
});

Template.singlePatientInsurance.events({
    'click .js-patient-add-insurance': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-insurance-input');

        showInput('.js-patient-add-insurance', '.js-patient-add-insurance-input');

        input.change(function () {
            Meteor.call('AddPatientInsurance', {
                patient_id: Session.get('currentPatient'),
                insurance: input.val()
            });

            input.hide();
        });
    },

    'dblclick .js-single-patient-dblclick-insurance': function () {
        var input = $('.js-patient-add-insurance-input');

        $(event.target).hide();
        input.show().select();

        input.change(function () {
            Meteor.call('AddPatientInsurance', {
                patient_id: Session.get('currentPatient'),
                insurance: input.val()
            });

            input.hide();
            $('.js-single-patient-dblclick-insurance').show();
        });
    }
});

Template.singlePatientInsuranceCover.events({
    'click .js-patient-add-cover': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-cover-input');

        showInput('.js-patient-add-cover', '.js-patient-add-cover-input');

        input.change(function () {
            Meteor.call('AddPatientCover', {
                patient_id: Session.get('currentPatient'),
                cover: parseInt(input.val())
            });

            input.hide();
        });
    },

    'dblclick .js-single-patient-dblclick-cover': function () {
        var input = $('.js-patient-add-cover-input');

        $(event.target).hide();
        input.show().select();

        input.change(function () {
            Meteor.call('AddPatientCover', {
                patient_id: Session.get('currentPatient'),
                cover: parseInt(input.val())
            });

            input.hide();
            $('.js-single-patient-dblclick-cover').show();
        });
    }
});

Template.singlePatientKinName.events({
    'click .js-patient-add-kin-name': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-kin-name-input');

        showInput('.js-patient-add-kin-name', '.js-patient-add-kin-name-input');

        input.change(function () {
            Meteor.call('AddPatientKinName', {
                patient_id: Session.get('currentPatient'),
                name: input.val()
            });

            input.hide();
        });
    },

    'dblclick .js-single-patient-dblclick-kin-name': function () {
        var input = $('.js-patient-add-kin-name-input');

        $(event.target).hide();
        input.show().select();

        input.change(function () {
            Meteor.call('AddPatientKinName', {
                patient_id: Session.get('currentPatient'),
                name: input.val()
            });

            input.hide();
            $('.js-single-patient-dblclick-kin-name').show();
        });
    }
});

Template.singlePatientKinPhone.events({
    'click .js-patient-add-kin-phone': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-kin-phone-input');

        showInput('.js-patient-add-kin-phone', '.js-patient-add-kin-phone-input');

        input.change(function () {
            Meteor.call('AddPatientKinPhone', {
                patient_id: Session.get('currentPatient'),
                phone: input.val()
            });

            input.hide();
        });
    },

    'dblclick .js-single-patient-dblclick-kin-phone': function () {
        var input = $('.js-patient-add-kin-phone-input');

        $(event.target).hide();
        input.show().select();

        input.change(function () {
            Meteor.call('AddPatientKinPhone', {
                patient_id: Session.get('currentPatient'),
                phone: input.val()
            });

            input.hide();
            $('.js-single-patient-dblclick-kin-phone').show();
        });
    }
});

Template.singlePatientKinLocation.events({
    'click .js-patient-add-kin-location': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-kin-location-input');

        showInput('.js-patient-add-kin-location', '.js-patient-add-kin-location-input');

        input.change(function () {
            Meteor.call('AddPatientKinLocation', {
                patient_id: Session.get('currentPatient'),
                location: input.val()
            });

            input.hide();
        });
    },

    'dblclick .js-single-patient-dblclick-kin-location': function () {
        var input = $('.js-patient-add-kin-location-input');

        $(event.target).hide();
        input.show().select();

        input.change(function () {
            Meteor.call('AddPatientKinLocation', {
                patient_id: Session.get('currentPatient'),
                location: input.val()
            });

            input.hide();
            $('.js-single-patient-dblclick-kin-location').show();
        });
    }
});