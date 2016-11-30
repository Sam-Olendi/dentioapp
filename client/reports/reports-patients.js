Template.reportsPatientsTable.onCreated(function () {
    this.subscribe('patients.reports');
});

Template.reportsPatientsTable.helpers({
    patients: function () {
        return Patients.find();
    }
});

