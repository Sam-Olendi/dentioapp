Template.generationPreviewRows.onCreated(function () {
    if (this.data) {
        var generation = Generations.findOne({_id: this.data._id});

        if (generation) {
            this.subscribe('treatments.patient', generation.patient_id);
            this.subscribe('services.list');
        }
    }
});

Template.generationPreviewRows.helpers({
    treatments: function () {
        if (this._id) {
            var generation  = Generations.findOne({_id: this._id}); // find the selected generation

            if (generation) {
                // get the patient id, appointment id and generation number
                var patientId = generation.patient_id,
                    appointmentId = generation.appointment_id,
                    generationNo = generation.generation_no;

                if (appointmentId) {
                    // if there's an appointment id, return the treatments with the given appointment id
                    return Treatments.find({patient_id: patientId, appointment_id: appointmentId});
                } else {
                    // if appointmentId is falsey, return the treatments that have the same generation number
                    return Treatments.find({patient_id: patientId, appointment_id: appointmentId, generation_no: generationNo});
                }
            }
        }
    }
});

Template.generationPreviewPrint.events({
    'click .js-generation-print-button': function () {
        window.print();
    }
});