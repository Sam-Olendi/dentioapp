/*==========================================
            Defaults + Functions
  ==========================================*/

Session.setDefault('currentPatient', undefined);

function openCloseModal (modalClass, modalContentClass, modalCloseClass) {
    // this function provides the ability to open and close modals
    $(modalClass).addClass('modal-is-active');
    $(modalContentClass).addClass('modal-content-is-active');

    $('.modal-close,' + modalCloseClass).click(function () {
        $('.body-error').hide();
        $('.patient-treatments-previous').hide();
        $('.js-patient-treatments-show-previous').show();

        $(modalClass).removeClass('modal-is-active');
        $(modalContentClass).removeClass('modal-content-is-active');
    });
}

function closeModal (modalClass, modalContentClass) {
    // close the modal
    $('.body-error').hide();
    $('.patient-treatments-previous').hide();
    $('.js-patient-treatments-show-previous').show();

    $(modalClass).removeClass('modal-is-active');
}

function showTooltip (event, toothNumber) {
    var tooltip = $('.svg-tooltip-' + toothNumber), // tooth number
        shape = $('.' + toothNumber + ' > .tooth'), // tooth svg
        toothPart = $(event.target).data('title'); // tooth part

    tooltip.text(toothPart); // set text of tooltip to show the part

    // Show and/or hide tooltip
    shape.mouseover(function () {
        tooltip.show();
    });

    shape.mouseout(function () {
        tooltip.hide();
    });
}


/*==========================================
 patientContentTreatment - Diagram
 ==========================================*/

Template.patientContentTreatment.onRendered(function () {
    // get the last part of the URI (patient's _id) and set it to a session
    // the session is used for easy access in this template
    var patientURI = window.location.pathname.split('/');
    Session.set('currentPatient', patientURI[patientURI.length - 1]);
});

Template.patientContentTreatment.onCreated(function () {
    // subscribe to publications
    var self = this;

    if ( Session.get('currentPatient') ) {
        self.autorun(function () {
            self.subscribe('treatments.patient', Session.get('currentPatient')); // patient's treatments
            self.subscribe('findings.patient', Session.get('currentPatient')); // patient's findings
            self.subscribe('generations.compare');
            self.subscribe('discoveries.all'); // list of all possible discoveries/findings
        });
    }
});

Template.patientContentTreatment.helpers({
    findings: function () {
        var pendingTeeth = $('.svg-tooth-pending > .tooth'),
            currentNumber, currentPart, currentDiscovery, findingsCursor;

        var discoveriesList = Discoveries.find().fetch(),
            discoveryResult;

        Tracker.autorun(function () {

            for ( var j = 0; j < pendingTeeth.length; j++ ) {
                currentNumber  = $(pendingTeeth[j]).closest('.svg-tooth-pending').data('id');
                currentPart = $(pendingTeeth[j]).data('title');
                findingsCursor = Findings.find({patient_id: Session.get('currentPatient'), tooth_number: currentNumber, tooth_part: currentPart}).fetch();

                if( findingsCursor.length ) {
                    currentDiscovery = findingsCursor[findingsCursor.length - 1].finding_type;
                    discoveryResult = $.grep( discoveriesList, function (e) { return e.discovery_name == currentDiscovery } );

                    if( discoveryResult ) {
                        $( pendingTeeth[j] ).css({ 'fill': discoveryResult[0].discovery_color, 'fillOpacity': .8 });
                    }

                }
            }

        });

        return Findings.find({patient_id: Session.get('currentPatient')});
    },

    treatments: function () {
        /*
         loop through all completed teeth
         find if any of them have any treatments attached to them in the database
         if so, change the fill color
         */

        var completedTeeth = $('.svg-tooth-completed > .tooth'),
            currentNumber, currentPart, currentService, treatmentsResult;

        var treatmentsList = [],
            servicesColorCode = [];

        Tracker.autorun(function () {

            treatmentsList = Treatments.find( { patient_id: Session.get('currentPatient') } ).fetch();

            for (var counter = 0; counter < treatmentsList.length; counter++) {
                servicesColorCode.push({
                    service_id: treatmentsList[counter].service._id,
                    service_color: treatmentsList[counter].service.service_color
                });
            }

            for ( var i = 0; i < completedTeeth.length; i++ ) {
                currentNumber = $(completedTeeth[i]).closest('.svg-tooth-completed').data('id');
                currentPart = $(completedTeeth[i]).data('title');

                var treatmentsCursor = Treatments.find({ patient_id: Session.get('currentPatient'), tooth_number: currentNumber, tooth_part: currentPart }).fetch();

                // Search through an array of objects
                // http://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects

                if ( treatmentsCursor.length ) {
                    currentService = treatmentsCursor[treatmentsCursor.length - 1].service._id;
                    treatmentsResult = $.grep( servicesColorCode, function (e) { return e.service_id === currentService } );

                    $(completedTeeth[i]).css({'fill': treatmentsResult[0].service_color, 'fillOpacity': .8});
                }
            }

        });

        return Treatments.find({patient_id: Session.get('currentPatient')});
    }
});

Template.patientContentTreatment.events({
    'mouseenter': function ( event ) {

        // Show a tooltip for the currently hovered-on tooth part
        for ( var i = 11; i < 19; i++ ) {
            showTooltip( event, i );
        }

        for ( var j = 21; j < 29; j++ ) {
            showTooltip( event, j );
        }

        for ( var k = 31; k < 39; k++ ) {
            showTooltip( event, k );
        }

        for ( var l = 41; l < 49; l++ ) {
            showTooltip( event, l );
        }

    },

    'click .svg-tooth': function ( event ) {

        var currentToothNumber = $(event.target).closest('.svg-tooth').attr('data-id'); // get tooth number from data-id of the parent
        $(event.target).attr('data-tooth', currentToothNumber); // set the tooth number as an attribute for the selected part

        // set sessions for the tooth part (e.g. buccal, distal) and tooth number (e.g. 12, 48)
        Session.set('currentToothPart', $(event.target).data('title'));
        Session.set('currentToothNumber', $(event.target).data('tooth'));

    },

    'click .svg-tooth-pending': function () {
        // attach the modal functionality (findings modal)
        openCloseModal( '.patient-findings-modal', '.patient-findings-modal-content', '.js-close-patient-findings' );
    },

    'click .svg-tooth-completed': function () {
        // attach the modal functionality (treatments modal)
        openCloseModal('.patient-treatments-modal', '.patient-treatments-modal-content', '.js-close-patient-treatments');
    }
});



/*==========================================
 Findings Modal
 ==========================================*/


Template.patientContentFindingsModal.onCreated(function () {
    this.subscribe('findings.patient'); // all patient's previous findings
    this.subscribe('appointments.check'); // confirm appointment exists
    this.subscribe('discoveries.all'); // all discovery (or findings) options
});

Template.patientContentFindingsModal.helpers({
    toothNumber: function () {
        // return the number of the selected tooth (e.g. 12, 48)
        return Session.get('currentToothNumber');
    },

    toothPart: function () {
        // return the part of the selected tooth (e.g. Distal, Palatal)
        return Session.get('currentToothPart');
    },

    discoveries: function () {
        // return discoveries (or findings) list
        return Discoveries.find();
    },

    oldFindingsLength: function () {
        // previous findings length
        return Findings.find({
            patient_id: Session.get('currentPatient'),
            tooth_number: Session.get('currentToothNumber'),
            tooth_part: Session.get('currentToothPart')
        }).fetch().length;
    },

    oldFindings: function () {
        // return previous findings
        return Findings.find({
            patient_id: Session.get('currentPatient'),
            tooth_number: Session.get('currentToothNumber'),
            tooth_part: Session.get('currentToothPart')
        });
    }
});

Template.patientContentFindingsModal.events({
    'click .js-patient-findings-show-previous': function () {
        event.preventDefault();
        $('.patient-findings-previous').show();
        $(event.target).hide();
    },

    'click .js-patient-findings-hide-previous': function (event) {
        event.preventDefault();
        $('.patient-findings-previous').hide();
        $('.js-patient-findings-show-previous').show();
    },

    'click .js-patient-findings-add-service': function () {

        // add a select box whenever the user commands it
        var selectWrapper = $(event.target).prev('.js-patient-findings-form'),
            randomNumber = Math.floor(Math.random() * 100) + 1,
            findings = Discoveries.find().fetch();

        // add the select box to the div
        selectWrapper.append(
            '<div class="patient-findings-form-group">' +
                '<select class="patient-findings-form-select" id="patient-findings-form-select-' + randomNumber + '" data-id="'+ randomNumber +'"></select>' +
                '<input type="text" placeholder="Description" class="patient-findings-form-description" id="patient-findings-form-description-' + randomNumber + '" data-id="' + randomNumber + '">' +
                '<a href="#" class="patient-findings-form-select-remove js-patient-findings-form-select-remove"><span class="icon-cancel"></span></a>' +
            '</div>');

        var newSelect = $('#patient-findings-form-select-' + randomNumber); // newly generated select box selector
        newSelect.append('<option class="patient-findings-form-option" value="None">-- Select another finding --</option>'); // add the first option

        // loop through all findings and populate the select
        for ( var i = 0; i < findings.length; i++) {
            newSelect.append('<option class="patient-findings-form-option" value="'+ findings[i]._id+ '">' + findings[i].discovery_name + '</option>');
        }

    },

    'click .patient-findings-form-select-remove': function (event) {
        // delete the newly-generated select box row
        $(event.target).parent().parent().remove();
    },

    'submit #patient-findings-form': function (event) {
        event.preventDefault();

        var regex = new RegExp(moment().format('Do MMM YYYY')),
            appointmentExists = Appointments.find(
                {patient_id: Session.get('currentPatient'),
                    status: { $regex: /(Waiting)|(In-Session)/ },
                    date_created: { $regex: regex }},
                { fields: { patient_id: 1, status: 1, date_created: 1 } }).fetch().length; // check if appointment exists in the day's appointments

        if ( appointmentExists ) {
            // Findings should only be added if an appointment exists.

            var selectBoxes = $('.patient-findings-form-select'), // get all select boxes and store them in an array
                descriptionFields = $('.patient-findings-form-description'),
                dataIds = [];

            for (var i = 0; i < selectBoxes.length; i++) {
                // save all the id's of the select boxes generated from the randomNumber
                dataIds[i] = $(selectBoxes[i]).data('id');
            }


            for (var j = 0; j < dataIds.length; j++) {

                Meteor.call('AddFinding', {
                    patient_id: Session.get('currentPatient'),
                    finding_type: $('#patient-findings-form-select-' + dataIds[j]).val(),
                    tooth_number: Session.get('currentToothNumber'),
                    tooth_part: Session.get('currentToothPart'),
                    description: $('#patient-findings-form-description-' + dataIds[j]).val(),
                    date_added: moment().format('Do MMM YYYY, h:mm:ss a'),
                    regex: moment().format('Do MMM YYYY')
                });
            }

            for (var k = 0; k < selectBoxes.length; k++) {
                // clear all select box values
                $(selectBoxes[k]).val('None');
                $(descriptionFields[k]).val('');
            }

            closeModal('.patient-findings-modal', 'patient-findings-modal-content');

        } else {

            alert('Uh oh. Seems like you didn\'t set their appointment. Return to the main page an add an appointment first');

        }
    }
});


/*==========================================
  Findings Modal - Upload files
 ==========================================*/

Template.patientContentFindingsUpload.onCreated(function () {
    this.currentFindingsUpload = new ReactiveVar(false);
});

Template.patientContentFindingsUpload.helpers({
    currentUpload: function () {
        return Template.instance().currentFindingsUpload.get();
    }
});

Template.patientContentFindingsUpload.events({
    'change #patients-findings-upload-file': function (event, template) {

        var file = event.currentTarget.files;

        if ( file && file[0] ) {

            var upload = Images.insert({
                file: file[0],
                meta: {
                    patient_id: Session.get('currentPatient'),
                    tooth_number: Session.get('currentToothNumber'),
                    tooth_part: Session.get('currentToothPart'),
                    date_uploaded: new Date().toISOString()
                },
                streams: 'dynamic'
            }, false);

            upload.on('start', function () {
                template.currentFindingsUpload.set(this);
            });

            upload.on('end', function (error, fileObj) {
                if (error) {
                    $('.modal-content-uploading-text-error').text(error);
                    $('.modal-content-error').show().delay(7000).fadeOut();
                } else {
                    $('.modal-content-uploading-text-success').html('<span class="modal-content-uploading-filename">' + fileObj.name + '</span> has successfully been uploaded');
                    $('.modal-content-success').show().delay(5000).fadeOut();
                }
                template.currentFindingsUpload.set(false);
            });

            upload.start();
        }
    }
});



/*==========================================
 Treatments Modal
 ==========================================*/

Template.patientContentTreatmentModal.onCreated(function () {
    this.subscribe('services.all'); // show all services
    this.subscribe('appointments.check'); // confirm appointment exists
});

Template.patientContentTreatmentModal.helpers({
    toothNumber: function () {
        // return the number of the selected tooth (e.g. 12, 48)
        return Session.get('currentToothNumber');
    },

    toothPart: function () {
        // return the part of the selected tooth (e.g. Distal, Palatal)
        return Session.get('currentToothPart');
    },

    oldTreatmentsLength: function () {
        // return the length of the services
        return Treatments.find({
            'patient_id': Session.get('currentPatient'),
            'service_id': {$ne: 'consultation'},
            tooth_number: Session.get('currentToothNumber'),
            tooth_part: Session.get('currentToothPart')
        }).fetch().length;

    },

    oldTreatments: function () {
        // show the older services when user selects the 'View all previous procedures' link
        // exclude consultations from the list
        return Treatments.find({
            patient_id: Session.get('currentPatient'),
            service_id: {$ne: 'consultation'},
            tooth_number: Session.get('currentToothNumber'),
            tooth_part: Session.get('currentToothPart')
        });
    },

    services: function () {
        // select all services except Consultation.
        // more details: https://docs.mongodb.com/manual/reference/operator/query/ne/#op._S_ne
        // (consultation should be added automatically to the list of services performed at the end of an appointment)
        return Services.find({'service_name': {$ne: 'Consultation'}});
    }
});

Template.patientContentTreatmentModal.events({
    'click .js-patient-treatments-show-previous': function (event) {
        event.preventDefault();
        $('.patient-treatments-previous').show();
        $(event.target).hide();
    },

    'click .js-patient-treatments-hide-previous': function (event) {
        event.preventDefault();
        $('.patient-treatments-previous').hide();
        $('.js-patient-treatments-show-previous').show();
    },

    'click .js-patient-treatments-add-service': function (event) {
        event.preventDefault();

        var selectWrapper = $(event.target).prev('.js-patient-treatments-form'),
            services = Services.find({'service_name': {$ne: 'Consultation'}}).fetch(),
            randomNumber = Math.floor(Math.random() * 100) + 1;

        selectWrapper.append(
            '<div class="patient-treatments-form-group">' +
                '<select class="patient-treatments-form-select" id="patient-treatments-form-select-' + randomNumber + '" data-id="'+ randomNumber +'">' +
                    '<option value="None" class="patient-treatments-form">Select another service</option>' +
                '</select>' +
                '<input type="text" placeholder="Description" class="patient-treatments-form-description" id="patient-treatments-form-description-' + randomNumber + '" data-id="' + randomNumber + '">' +
                '<a href="#" class="patient-treatments-form-select-remove js-patient-treatments-form-select-remove"><span class="icon-cancel"></span></a>' +
            '</div>');

        for (var i = 1; i < services.length; i++) {
            $('#patient-treatments-form-select-' + randomNumber).append('<option class="patient-treatments-form-option" value="'+ services[i]._id +'">' + services[i].service_name + '</option>')
        }
    },

    'click .patient-treatments-form-select-remove': function () {
        // delete the newly-generated select box row
        $(event.target).parent().siblings().remove();
        $(event.target).parent().remove();
    },

    'submit #patient-treatments-form': function (event) {
        event.preventDefault();

        var regex = new RegExp(moment().format('Do MMM YYYY')),
            appointmentExists = Appointments.find(
                {patient_id: Session.get('currentPatient'),
                    status: { $regex: /(Waiting)|(In-Session)/ },
                    date_created: { $regex: regex }},
                { fields: { patient_id: 1, status: 1, date_created: 1 } }).fetch().length; // check if appointment exists in the day's appointments

        if (appointmentExists) {
            var selectBoxes = $('.patient-treatments-form-select'), // get all select boxes and store them in an array
                descriptionFields = $('.patient-treatments-form-description'),
                dataIds = [];


            for (var i = 0; i < selectBoxes.length; i++) {
                // save all the id's of the select boxes generated from the randomNumber
                dataIds[i] = $(selectBoxes[i]).data('id');
                dataIds[i] = $(selectBoxes[i]).data('id');
            }

            for (var j = 0; j < dataIds.length; j++) {

                var servicePrice = Services.find({_id: $('#patient-treatments-form-select-' + dataIds[j]).val()}).fetch()[0].service_price;

                Meteor.call('AddTreatment', {
                    patient_id: Session.get('currentPatient'),
                    service_id: $('#patient-treatments-form-select-' + dataIds[j]).val(),
                    amount: servicePrice,
                    tooth_number: Session.get('currentToothNumber'),
                    tooth_part: Session.get('currentToothPart'),
                    description: $('#patient-treatments-form-description-' + dataIds[j]).val(),
                    date_performed: moment().format('Do MMM YYYY, h:mm:ss a'),
                    regex: moment().format('Do MMM YYYY')
                });
            }

            for (var k = 0; k < selectBoxes.length; k++) {
                // clear all select box values
                $(selectBoxes[k]).val('None');
                $(descriptionFields).val('');
            }
            closeModal('.patient-treatments-modal', 'patient-treatments-modal-content');

        } else {
            alert('Uh oh. Seems like you didn\'t set their appointment. Return to the main page an add an appointment first');
        }


    }
});


/*==========================================
 Treatments Modal - Upload files
 ==========================================*/

Template.patientContentTreatmentsUpload.onCreated(function () {
    this.currentTreatmentsUpload = new ReactiveVar(false);
});

Template.patientContentTreatmentsUpload.helpers({
    currentUpload: function () {
        return Template.instance().currentTreatmentsUpload.get();
    }
});

Template.patientContentTreatmentsUpload.events({
    'change #patients-treatment-upload-file': function (event, template) {

        var file = event.currentTarget.files;

        if ( file && file[0] ) {

            var upload = Images.insert({
                file: file[0],
                meta: {
                    patient_id: Session.get('currentPatient'),
                    tooth_number: Session.get('currentToothNumber'),
                    tooth_part: Session.get('currentToothPart'),
                    date_uploaded: new Date().toISOString()
                },
                streams: 'dynamic'
            }, false);

            upload.on('start', function () {
                template.currentTreatmentsUpload.set(this);
            });

            upload.on('end', function (error, fileObj) {
                if (error) {
                    $('.modal-content-uploading-text-error').text(error);
                    $('.modal-content-error').show().delay(7000).fadeOut();
                } else {
                    $('.modal-content-uploading-text-success').html('<span class="modal-content-uploading-filename">'+ fileObj.name +'</span> has successfully been uploaded');
                    $('.modal-content-success').show().delay(5000).fadeOut();
                }
                template.currentTreatmentsUpload.set(false);
            });

            upload.start();

        }
    }
});


/*==========================================
 Complete appointment
 ==========================================*/

Template.patientContentCompleteAppointment.onCreated(function () {
    this.subscribe('appointments.check');
});

Template.patientContentCompleteAppointment.helpers({
    appointmentExists: function () {
        var regex = new RegExp(moment().format('Do MMM YYYY'));
        return Appointments.find({
                patient_id: Session.get('currentPatient'),
                status: { $regex: /(Waiting)|(In-Session)/ },
                date_created: { $regex: regex }},
            { fields: { patient_id: 1, status: 1, date_created: 1 } }).fetch().length; // check if appointment exists in the day's appointments
    }
});

Template.patientContentCompleteAppointment.events({
    'click .js-complete-appointment': function () {
        openCloseModal('.complete-appointment-modal', '.complete-appointment-modal-content', '.js-cancel-complete-appointment');
    }
});

Template.patientContentCompleteAppointmentModal.events({
    'click .js-complete-appointment-confirmation': function () {
        closeModal('.complete-appointment-modal', '.complete-appointment-modal-content');
        openCloseModal('.confirm-invoice-modal', '.confirm-invoice-modal-content', '.js-cancel-confirm-invoice');
    }
});


/*==========================================
 Confirm invoice
 ==========================================*/

Template.patientContentConfirmInvoiceModal.onCreated(function () {
    this.subscribe('services.list');
    this.subscribe('invoices.check');
});

Template.patientContentConfirmInvoiceModal.helpers({
    treatments: function () {
        var regex = new RegExp(moment().format('Do MMM YYYY')),
            appointmentId = Appointments.find({patient_id: Session.get('currentPatient'), status: { $regex: /(Waiting)|(In-Session)/ }, date_created: { $regex: regex }}).fetch()[0]._id;
        return Treatments.find({appointment_id: appointmentId});
    },

    services: function () {
        return Services.find({'service_name': {$ne: 'Consultation'}}, {sort: {service_name: 1}});
    }
});

Template.patientContentConfirmInvoiceModal.events({
    'click .js-confirm-invoice-edit': function () {
        $(event.target).parent().parent().find('.confirm-invoice-text').hide();
        $(event.target).parent().parent().find('.confirm-invoice-input').show();
        $(event.target).siblings().show();
        $(event.target).hide();
    },

    'click .js-confirm-invoice-save': function () {
        // enter save treatment code here
        var formWrapper = $(event.target).parent().parent();

        var serviceId = formWrapper.find('.confirm-invoice-select').val(),
            description = formWrapper.find('.confirm-invoice-description').val(),
            amount = parseInt(formWrapper.find('.confirm-invoice-amount').val(), 10),
            treatmentId = this._id


        if (serviceId === 'None') {
            alert('You have not selected a new service');
        } else {
            Meteor.call('UpdateTreatment', {
                _id: treatmentId,
                patient_id: Session.get('currentPatient'),
                service_id: serviceId,
                amount: amount,
                description: description
            });

            $(event.target).parent().parent().find('.confirm-invoice-input').hide();
            $(event.target).parent().parent().find('.confirm-invoice-text').show();
            $(event.target).siblings().show();
            $(event.target).hide();
        }
    },

    'change .confirm-invoice-select': function () {
        var newServiceId = $(event.target).val();
        var oldServiceAmount = $(event.target).parent().parent().find('.confirm-invoice-amount');
        var newServiceAmount = Services.find({_id: newServiceId}).fetch()[0].service_price;

        oldServiceAmount.val(newServiceAmount);
    },

    'click .js-confirm-invoice': function () {
        Meteor.call('SaveInvoice', Session.get('currentPatient'));
        Router.go('/');
    }
});