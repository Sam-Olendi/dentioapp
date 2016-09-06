Template.generationEdit.rendered = function () {
    var generationURI = window.location.pathname.split('/'),
        generationId = generationURI[generationURI.length - 1],
        generation = Generations.findOne({_id: generationId});
};

Template.generationEditHeader.rendered = function () {
    $('.generator-generation-datepicker').datepicker({ dateFormat: 'yy mm dd', maxDate: 0 });
};

Template.generationEditRows.rendered = function () {
};

Template.generationEditRows.onCreated(function () {

    if (this.data) {
        var generation = Generations.findOne({_id: this.data._id});

        if (generation) {
            this.subscribe('treatments.patient', generation.patient_id);
            this.subscribe('services.list');
        }
    }

});

Template.generationEditRows.helpers({
    treatments: function () {
        if (this._id) {
            var generation  = Generations.findOne({_id: this._id});

            if (generation) {
                var patientId = generation.patient_id,
                    appointmentId = generation.appointment_id,
                    generationNo = generation.generation_no;

                if (appointmentId) {
                    return Treatments.find({patient_id: patientId, appointment_id: appointmentId});
                } else {
                    return Treatments.find({patient_id: patientId, appointment_id: appointmentId, generation_no: generationNo});
                }
            }
        }
    },

    services: function () {
        return Services.find();
    }
});

Template.generationEditRows.events({
});


Template.generationEditButtons.events({
    'click .js-delete-generation-confirmation': function (event) {
        event.preventDefault();

        $('.generation-delete-modal').addClass('modal-is-active');
        $('.generation-delete-modal-content').addClass('modal-content-is-active');

        $('.modal-close, .js-cancel-generation-delete').click(function () {
            $('.body-error').hide();

            $('.generation-delete-modal').removeClass('modal-is-active');
                $('.generation-delete-modal-content').removeClass('modal-content-is-active');
        });
    }
});

Template.generationDeleteModal.events({
    'click .js-generation-delete': function (event) {
        var generationId = $(event.target).data('id');
        Router.go('/generator');

        Meteor.call('DeleteGeneration', generationId);
    }

});