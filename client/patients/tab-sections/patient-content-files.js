Template.patientContentFiles.helpers({
    images: function () {
        //console.log(Images.find({'meta.patient_id': Session.get('currentPatient')}).fetch());
        return Images.find({'meta.patient_id': Session.get('currentPatient')}, { sort: { name: 1 } }).fetch();
    }
});