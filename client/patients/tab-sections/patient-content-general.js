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
            //if (inputValue.match(regex)) {
            //    Meteor.call('singlePatientAddSex', {
            //        _id: patientId,
            //        profile: {
            //            sex: inputValue }
            //    });
            //}
        });
    },

    'dblclick .js-single-patient-dblclick-sex': function () {
        var input = $('.js-patient-add-sex-input');

        $(event.target).hide();
        input.show().select();
    }
});

Template.singlePatientAge.events({
    'click .js-patient-add-age': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-age-input');

        showInput('.js-patient-add-age', '.js-patient-add-age-input');
    },

    'dblclick .js-single-patient-dblclick-age': function () {
        var input = $('.js-patient-add-age-input');

        $(event.target).hide();
        input.show().select();
    }
});

Template.singlePatientDOB.events({
    'click .js-patient-add-dob': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-dob-input').datepicker({dateFormat: 'yy mm dd', maxDate: 0});

        showInput('.js-patient-add-dob', '.js-patient-add-dob-input');
    },

    'dblclick .js-single-patient-dblclick-dob': function () {
        var input = $('.js-patient-add-dob-input').datepicker({dateFormat: 'yy mm dd', maxDate: 0});

        $(event.target).hide();
        input.show().select();
    }
});

Template.singlePatientMobile.events({
    'click .js-patient-add-mobile': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-mobile-input');

        showInput('.js-patient-add-mobile', '.js-patient-add-mobile-input');
    },

    'dblclick .js-single-patient-dblclick-mobile': function () {
        var input = $('.js-patient-add-mobile-input');

        $(event.target).hide();
        input.show().select();
    }
});

Template.singlePatientPhone.events({
    'click .js-patient-add-phone': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-phone-input');

        showInput('.js-patient-add-phone', '.js-patient-add-phone-input');
    },

    'dblclick .js-single-patient-dblclick-phone': function () {
        var input = $('.js-patient-add-phone-input');

        $(event.target).hide();
        input.show().select();
    }
});

Template.singlePatientEmail.events({
    'click .js-patient-add-email': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-email-input');

        showInput('.js-patient-add-email', '.js-patient-add-email-input');
    },

    'dblclick .js-single-patient-dblclick-email': function () {
        var input = $('.js-patient-add-email-input');

        $(event.target).hide();
        input.show().select();
    }
});

Template.singlePatientPhysicalAddress.events({
    'click .js-patient-add-address': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-address-input');

        showInput('.js-patient-add-address', '.js-patient-add-address-input');
    },

    'dblclick .js-single-patient-dblclick-address': function () {
        var input = $('.js-patient-add-address-input');

        $(event.target).hide();
        input.show().select();
    }
});

Template.singlePatientPostalAddress.events({
    'click .js-patient-add-postal': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-postal-input');

        showInput('.js-patient-add-postal', '.js-patient-add-postal-input');
    },

    'dblclick .js-single-patient-dblclick-postal': function () {
        var input = $('.js-patient-add-postal-input');

        $(event.target).hide();
        input.show().select();
    }
});

Template.singlePatientCompany.events({
    'click .js-patient-add-workplace': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-workplace-input');

        showInput('.js-patient-add-workplace', '.js-patient-add-workplace-input');
    },

    'dblclick .js-single-patient-dblclick-workplace': function () {
        var input = $('.js-patient-add-workplace-input');

        $(event.target).hide();
        input.show().select();
    }
});

Template.singlePatientStaffNumber.events({
    'click .js-patient-add-staffno': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-staffno-input');

        showInput('.js-patient-add-staffno', '.js-patient-add-staffno-input');
    },

    'dblclick .js-single-patient-dblclick-staffno': function () {
        var input = $('.js-patient-add-staffno-input');

        $(event.target).hide();
        input.show().select();
    }
});

Template.singlePatientInsurance.events({
    'click .js-patient-add-insurance': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-insurance-input');

        showInput('.js-patient-add-insurance', '.js-patient-add-insurance-input');
    },

    'dblclick .js-single-patient-dblclick-insurance': function () {
        var input = $('.js-patient-add-insurance-input');

        $(event.target).hide();
        input.show().select();
    }
});

Template.singlePatientInsuranceCover.events({
    'click .js-patient-add-cover': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-cover-input');

        showInput('.js-patient-add-cover', '.js-patient-add-cover-input');
    },

    'dblclick .js-single-patient-dblclick-cover': function () {
        var input = $('.js-patient-add-cover-input');

        $(event.target).hide();
        input.show().select();
    }
});

Template.singlePatientKinName.events({
    'click .js-patient-add-kin-name': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-kin-name-input');

        showInput('.js-patient-add-kin-name', '.js-patient-add-kin-name-input');
    },

    'dblclick .js-single-patient-dblclick-kin-name': function () {
        var input = $('.js-patient-add-kin-name-input');

        $(event.target).hide();
        input.show().select();
    }
});

Template.singlePatientKinPhone.events({
    'click .js-patient-add-kin-phone': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-kin-phone-input');

        showInput('.js-patient-add-kin-phone', '.js-patient-add-kin-phone-input');
    },

    'dblclick .js-single-patient-dblclick-kin-phone': function () {
        var input = $('.js-patient-add-kin-phone-input');

        $(event.target).hide();
        input.show().select();
    }
});

Template.singlePatientKinLocation.events({
    'click .js-patient-add-kin-location': function (event) {
        event.preventDefault();
        var input = $('.js-patient-add-kin-location-input');

        showInput('.js-patient-add-kin-location', '.js-patient-add-kin-location-input');
    },

    'dblclick .js-single-patient-dblclick-kin-location': function () {
        var input = $('.js-patient-add-kin-location-input');

        $(event.target).hide();
        input.show().select();
    }
});