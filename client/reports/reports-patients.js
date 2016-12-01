Template.reportsPatients.events({
    'click .icon-arrow_drop_down': function ( event ) {
        $(event.target).parent().find('.reports-patients-filter-results').toggle();
    }
});


Template.reportsPatientsCompany.events({
    'focus #reports-patients-filter-company': function () {
        var results = $(event.target).parent().find('.reports-patients-filter-results');
        results.show();
    }
});

Template.reportsPatientsInsurance.events({
    'focus #reports-patients-filter-insurance': function () {
        var results = $(event.target).parent().find('.reports-patients-filter-results');
        results.show();
    }
});



Template.reportsPatientsTable.onCreated(function () {
    this.subscribe('patients.reports');
});

Template.reportsPatientsTable.helpers({
    patients: function () {
        return Patients.find();
    }
});

