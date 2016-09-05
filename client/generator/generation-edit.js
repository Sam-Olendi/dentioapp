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
        var rowWrapper = $(event.target).parent().parent().parent();

        rowWrapper.find('.generator-generation-input, .generator-generation-select').show();
        rowWrapper.find('.generator-generation-row-save, .icon-checkmark').show();

        rowWrapper.find('.generator-generation-cell-edit-text').hide();
        rowWrapper.find('.generator-generation-row-delete').hide();
        $(event.target).hide();
    },

    'click .generator-generation-row-save': function () {
        var rowWrapper = $(event.target).parent().parent().parent();

        rowWrapper.find('.generator-generation-row-edit, .icon-write').show();
        rowWrapper.find('.generator-generation-row-delete').show();
        rowWrapper.find('.generator-generation-cell-edit-text').show();

        rowWrapper.find('.generator-generation-input, .generator-generation-select').hide();
        rowWrapper.find('.generator-generation-row-save, .icon-checkmark').hide();
    },

    'click .generator-generation-row-delete': function () {
        $(event.target).parent().parent().remove();
    },

    'change .generator-generation-select': function () {
        var serviceId = $(event.target).val(), // id of the service
            service = Services.findOne({_id: serviceId}), // service in the DB
            rowWrapper = $(event.target).parent().parent(), // the row that contains all the service info
            amountFields = $('.generator-generation-input-amount'), // an array of all the amount fields (to collect totals)
            subtotalAmount = 0,
            vat = parseInt($('#generator-generation-input-vat').val());

        rowWrapper.find('.generator-generation-input-description').val(service.service_description);
        rowWrapper.find('.generator-generation-input-price').val(parseInt(service.service_price, 10));
        rowWrapper.find('.generator-generation-input-amount').val(parseInt(service.service_price, 10));
    }
});