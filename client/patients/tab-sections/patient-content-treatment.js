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
                    discoveryResult = $.grep( discoveriesList, function (e) { return e.discovery_name === currentDiscovery } );

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
        for ( var i = 11; i < 19; i++ ) {
            showTooltip(event, i);
        }

        for ( var j = 21; j < 29; j++ ) {
            showTooltip(event, j);
        }

        for ( var k = 31; k < 39; k++ ) {
            showTooltip(event, k);
        }

        for ( var l = 41; l < 49; l++ ) {
            showTooltip(event, l);
        }
    }
});