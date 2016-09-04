Session.setDefault('generationEditPatientId', undefined);

Template.generationEdit.onCreated(function () {
    var self = this;
    self.autorun(function () {
        self.subscribe('treatments.patient', Session.get('generationEditPatientId'));
    });

    self.subscribe('services.list');
});

Template.generationEdit.helpers({
    treatments: function () {
        // get treatments that correspond to the appointment_id

        if (Generations.findOne({_id: this._id})) {
            var patientId = Generations.findOne({_id: this._id}).patient_id,
                appointmentId = Generations.findOne({_id: this._id}).appointment_id,
                generationNo = Generations.findOne({_id: this._id}).generation_no;
        }

        Session.set('generationEditPatientId', patientId);

        // if appointmentId !== null,
        // return the treatments that correspond to the appointmentId,
        // else return the treatments that correspond to the generation_no

        if (appointmentId) {
            //console.log(Treatments.find({patient_id: Session.get('generationEditPatientId'), appointment_id: appointmentId}).fetch());
            return Treatments.find({appointment_id: appointmentId});
        } else {
            //console.log(Treatments.find({patient_id: Session.get('generationEditPatientId'), generation_no: generationNo}).fetch());
            return Treatments.find({generation_no: generationNo}).fetch();
        }
    },

    services: function () {
        return Services.find();
    },

    subtotal: function () {

    }
});

Template.generationEdit.events({
    'click .generator-generation-row-edit': function () {
        var rowWrapper = $(event.target).parent().parent();
        rowWrapper.find('.generator-generation-input, .generator-generation-select').toggle();
        rowWrapper.find('.generator-generation-cell-edit-text').toggle();
    },

    'click .generator-generation-row-delete': function () {
        $(event.target).parent().parent().remove();
    }
});