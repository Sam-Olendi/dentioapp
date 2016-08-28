/*
 ====================================
 Appointments Template
 (helpers and events)
 ====================================
 */

Tracker.autorun(function () {
    // set the default date (to today)
    var momentDate = moment().format('Do MMM YYYY'),
        momentDay = moment().format('dddd');
    Session.set('momentDate', momentDate);
    Session.set('momentDay', momentDay);
});

Session.setDefault('selectedPatientId', undefined);
Session.setDefault('searchedPatientId', undefined);
Session.setDefault('selectedAppointmentId', undefined);


function openCloseModal (modalClass, modalContentClass, modalCloseClass) {
    // this function provides the ability to open and close modals
    $(modalClass).addClass('modal-is-active');
    $(modalContentClass).addClass('modal-content-is-active');

    $('.modal-close,' + modalCloseClass).click(function () {
        $('.body-error').hide();
        Session.set('selectedPatientId', undefined);
        $('input').val('');

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
    $('input').val('');
    $(modalClass).removeClass('modal-is-active');
    $(modalContentClass).removeClass('modal-content-is-active');
}

Template.appointmentHeaderTitle.rendered = function () {
    $('.js-appointment-calendar').datepicker({
        // show the calendar when the user clicks the 'View Calendar' button
        showOn: 'button',
        buttonText: '<span class="appointment-calendar-icon icon-calendar"></span> View calendar',
        dateFormat: 'yy mm dd',
        maxDate: 0
    })
};

Template.appointmentHeaderTitle.helpers({
    selectedDate: function () {
        return Session.get('momentDate');
    },
    selectedDay: function () {
        return Session.get('momentDay');
    }
});

Template.appointmentHeaderTitle.events({
    'change .js-appointment-calendar': function () {
        // change the value of the momentDate session.
        // this allows users to view the appointments according to the date they select
        var selectedDate = $('.js-appointment-calendar').datepicker().val(),
            momentDate = moment(new Date(selectedDate).toISOString()).format('Do MMM YYYY'),
            momentDay = moment(new Date(selectedDate).toISOString()).format('dddd');

        Session.set('momentDate', momentDate);
        Session.set('momentDay', momentDay);
    }
});

Template.appointmentNewButton.events({
   'click .js-appointment-new-trigger': function () {
       // open modal that allows user to add a new appointment
       openCloseModal('.appointment-new-modal', '.appointment-new-modal-content', '.js-cancel-appointment-new');
   }
});

Template.appointmentContent.events({
    'click .appointment-tabs': function () {
        /*
         Tab functionality
         More details: https://codyhouse.co/gem/responsive-tabbed-navigation/
         */

        var tabs = $('.body-flesh');

        tabs.each(function () {
            var tab = $(this),
                tabItems = tab.find('.appointment-tabs'),
                tabContentWrapper = tab.children('.appointment-tabs-content');

            tab.on('click', '.appointment-tabs-link', function (event) {
                event.preventDefault();
                var selectedItem = $(this);

                if ( !selectedItem.hasClass('appointment-tabs-link-is-selected') ) {
                    var selectedTab = selectedItem.data('content'),
                        selectedContent = tabContentWrapper.find('li[data-content="'+ selectedTab +'"]'),
                        selectedContentHeight = selectedContent.innerHeight();

                    tabItems.find('.appointment-tabs-link-is-selected').removeClass('appointment-tabs-link-is-selected');
                    selectedItem.addClass('appointment-tabs-link-is-selected');
                    selectedContent.addClass('appointment-tabs-content-section-is-selected').siblings('li').removeClass('appointment-tabs-content-section-is-selected');
                    tabContentWrapper.animate({
                        'height': selectedContentHeight
                    }, 200);
                }
            });

        });
    }
});

Template.appointmentNewModal.events({
    'keyup .js-show-patient-results': function () {
        // show the results when the user starts typing
        $('.appointment-search-results').show();
    },

    'click': function () {
        // hide the results when user clicks on anywhere on the page
        $('.appointment-search-results').hide();

    },

    'submit #appointment-new-form': function (event) {
        // submit the form to add a new appointment
        event.preventDefault();
        var patientId = Session.get('searchedPatientId'),
            status = $('.js-appointment-new-radio:checked').val(),
            booked = !$('.appointment-new-booked-checkbox').prop("checked"),
            date = moment().format("Do MMM YYYY, h:mm a");

        // show error text if the user submits without filling these fields
        if (!patientId) {
            $('.js-patient-status').show().text('Please select a patient first');
        }
        if (!status) {
            $('.js-error-status').show().text('Please select a status first');
        }

        // iff they have selected a patient and a status, call the AddAppointment method
        // which should enter the data into DB
        if (patientId && status) {
            Meteor.call('AddAppointment', {
                patient_id: patientId,
                status: status,
                booked: booked,
                date_created: date
            }, function (error, result) {
                if (error) return alert('Error: ' + error.error);
            });

            closeModal('.appointment-new-modal, .appointment-new-modal-content');
        }

    }
});

Template.appointmentNewPatientSearch.onCreated(function () {
    // attach a reactive var to the template instance
    var template = Template.instance();

    template.searchQuery = new ReactiveVar();
    template.searching = new ReactiveVar(false);

    /*
     UX Addition: wait for 300ms before showing the results
     */
    template.autorun(function () {
        // subscribe to the right publication and send the search query
        template.subscribe('patients.appointments.search', template.searchQuery.get(), function () {
            setTimeout(function () {
                template.searching.set(false);
            }, 300);
        });
    });
});

Template.appointmentNewPatientSearch.helpers({
    searching: function () {
        // return the searching reactive var
        return Template.instance().searching.get();
    },
    query: function () {
        // return the searchQuery reactive var
        return Template.instance().searchQuery.get()
    },
    patients: function () {
        // return the results
        var patients = Patients.find();
        if ( patients ) return patients;
    }
});

Template.appointmentNewPatientSearch.events({
    'keyup #appointment-new-search-box': function () {
        // get value of the search box
        var value = $(event.target).val().trim();

        // if value is not blank and the user presses enter (return on Mac)
        if (value !== '' && event.keyCode === 13) {
            Template.instance().searchQuery.set(value);
            Template.instance().searching.set(true);
        }

        if (value === '') {
            Template.instance().searchQuery.set(value);
        }
    },

    'click .js-get-appointment-patient': function () {
        // when the user clicks on a result, set the session to the id of the patient.
        // will be accessed to show the selected patient.
        $('.appointment-search-results').hide();
        Session.set('searchedPatientId', $(event.target).data('id'));
    }
});

Template.appointmentNewPatientName.onCreated(function () {
    // subscribe to the right publication.
    // set the query to the selected (searched for) patient.
    this.subscribe('patients.appointments', Session.get('searchedPatientId'));
});

Template.appointmentNewPatientName.helpers({
    selectedPatient: function () {
        // return the query to find the patient.
        // the query should match that made in the publication.
        // more details: http://stackoverflow.com/a/21853298/4616010
        var patientId = Session.get('searchedPatientId');
        return Patients.findOne({_id: patientId}, { fields: {'profile.first_name': 1, 'profile.middle_name': 1, 'profile.surname': 1} });
    }
});

Template.appointmentNewPatientName.events({
   'click .js-appointment-new-patient-remove': function () {
       //when the user clicks on the 'x' next to the selected patient's name ...
       $('#appointment-new-search-box').val(''); // clear the search box if it had any text
       Session.set('searchedPatientId', undefined); // set the session back to undefined
   }
});

Template.appointmentContentTabSections.events({
    'mouseenter .appointment-content-row': function () {
        // set the session to show selected patient
        // set it when the user hovers over on the table
        var patientId = $(event.target).data('id'),
            appointmentId = $(event.target).data('appointment');
        Session.set('selectedPatientId', patientId);
        Session.set('selectedAppointmentId', appointmentId);
    },
    'click .js-appointment-content-table-status': function () {
        // open and close modal functionality
        openCloseModal('.change-status-modal', '.change-status-modal-content', '.js-cancel-change-status');
    }
});

Template.appointmentStatusModal.helpers({
   patient: function () {
       var patient = Patients.findOne({_id: Session.get('selectedPatientId')});
       return patient ? patient : false;
   }
});

Template.appointmentStatusModal.events({
    'submit #appointment-change-status-form': function (event) {
        event.preventDefault();

        var appointmentId = Session.get('selectedAppointmentId'),
            patientId = Session.get('selectedPatientId'),
            status = $('.js-appointment-change-status-radio:checked').val(),
            booked = !$('.js-appointment-change-status-booked-checkbox').prop("checked");

        // show error text if the user submits without filling this field
        // else, call the UpdateAppointment method
        if (!status) {
            $('.js-error-status').show().text('Please select a status first');
        } else {
            Meteor.call('UpdateAppointment', {
                _id: appointmentId,
                patient_id: patientId,
                status: status,
                booked: booked
            }, function (error, result) {
                if (error) return alert('Error: ' + error.error);
            });

             closeModal('.change-status-modal', '.change-status-modal-content');
        }
    },

    'click .js-appointment-delete': function (event) {
        event.preventDefault();
        closeModal('.change-status-modal', '.change-status-modal-content');
        openCloseModal('.confirm-delete-appointment-modal', '.confirm-delete-appointment-modal-content');
    }
});

Template.confirmDeleteAppointmentModal.events({
   'click .js-appointment-delete-confirmed': function (event) {
       event.preventDefault();
       var appointmentId = Session.get('selectedAppointmentId');

       if (appointmentId) {
           Meteor.call('DeleteAppointment', appointmentId);
           closeModal('.confirm-delete-appointment-modal', '.confirm-delete-appointment-modal');
       } else {
           closeModal('.confirm-delete-appointment-modal', '.confirm-delete-appointment-modal');
           alert('Oops. Something went wrong. Please try again later');
       }
   },

    'click .js-appointment-delete-cancelled': function (event) {
        event.preventDefault();
        closeModal('.confirm-delete-appointment-modal', '.confirm-delete-appointment-modal');
    }
});

Template.appointmentWaitingRow.onCreated(function () {
    // subscribe to appointments.waiting
    this.subscribe('appointments.waiting');
});

Template.appointmentWaitingRow.helpers({
    'appointments': function () {
        // display the selected day's waiting appointments
        var momentDate = new RegExp(Session.get("momentDate"));
        return Appointments.find({
            status: 'Waiting',
            date_created: { $regex: momentDate }
        });
    }
});

Template.appointmentInSessionRow.onCreated(function () {
    // subscribe to appointments.inSession
    this.subscribe('appointments.inSession');
});

Template.appointmentInSessionRow.helpers({
    'appointments': function () {
        // display the selected day's appointments that are in-session
        var momentDate = new RegExp(Session.get("momentDate"));
        return Appointments.find({
            status: 'In-Session',
            date_created: { $regex: momentDate }
        });
    }
});

Template.appointmentCompletedRow.onCreated(function () {
    // subscribe to appointments.completed
    this.subscribe('appointments.completed');
});

Template.appointmentCompletedRow.helpers({
    'appointments': function () {
        // display the selected day's completed appointments
        var momentDate = new RegExp(Session.get("momentDate"));
        return Appointments.find({
            status: 'Completed',
            date_created: { $regex: momentDate }
        });
    }
});
