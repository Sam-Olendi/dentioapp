// subscribe first

Template.generationEdit.helpers({
    treatments: function () {
        // get treatments that correspond to the appointment_id
        return Treatments.find({appointment_id: 'GiveMeTheId'});
    }
});