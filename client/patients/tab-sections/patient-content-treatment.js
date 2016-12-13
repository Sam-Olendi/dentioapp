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
                    currentDiscovery = findingsCursor[0].finding_type;
                    discoveryResult = $.grep( discoveriesList, function (e) { return e.discovery_name == currentDiscovery } );

                    if( discoveryResult ) {
                        $( pendingTeeth[j] ).css({ 'fill': discoveryResult[0].discovery_color, 'fillOpacity': .8 });
                    }

                }
            }

        });

        return Findings.find({patient_id: Session.get('currentPatient')});
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
    }
});



Template.patientContentFindingsModal.onCreated(function () {
    this.subscribe('findings.patient');
    this.subscribe('appointments.check');
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