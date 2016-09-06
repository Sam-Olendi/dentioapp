Template.generationEdit.rendered = function () {
    var generationURI = window.location.pathname.split('/'),
        generationId = generationURI[generationURI.length - 1],
        generation = Generations.findOne({_id: generationId});
};

Template.generationEdit.rendered = function () {
    var amountFields = $('.generator-generation-input-amount'),
        subtotalAmount = 0,
        vat = parseInt($('.generator-generation-input-vat').val());

    for (var i = 0; i < amountFields.length; i++) {
        if ($(amountFields[i]).val() !== '') {
            subtotalAmount += parseInt($(amountFields[i]).val(), 10);
        }
    }

    Session.set('subtotalAmount', subtotalAmount); // and set the subtotal to a session
    Session.set('totalAmount', subtotalAmount + (subtotalAmount * (vat/100))); // set the total (after tax) to a session
};

Template.generationEdit.events({
    'click .generator-generation-row-edit': function () {
        var rowWrapper = $(event.target).parent().parent().parent();

        rowWrapper.find('.generator-generation-input, .generator-generation-select').show();
        rowWrapper.find('.generator-generation-row-save, .icon-checkmark').show();

        rowWrapper.find('.generator-generation-cell-edit-text').hide();
        rowWrapper.find('.generator-generation-row-delete').hide();
        $(event.target).hide();
    },

    'change .generator-generation-select': function () {

        var serviceId = $(event.target).val(), // id of the service
            service = Services.findOne({_id: serviceId}), // service in the DB
            rowWrapper = $(event.target).parent().parent(), // the row that contains all the service info
            amountFields = $('.generator-generation-input-amount'), // an array of all the amount fields (to collect totals)
            subtotalAmount = 0,
            vat = parseInt($('.generator-generation-input-vat').val());

        rowWrapper.find('.generator-generation-input-description').val(service.service_description);
        rowWrapper.find('.generator-generation-input-price').val(parseInt(service.service_price, 10));
        rowWrapper.find('.generator-generation-input-amount').val(parseInt(service.service_price, 10));

        // add up the subtotal (before tax) of all the amount fields
        for (var i = 0; i < amountFields.length; i++) {
            if ($(amountFields[i]).val() !== '') {
                subtotalAmount += parseInt($(amountFields[i]).val(), 10);
            }
        }

        Session.set('subtotalAmount', subtotalAmount); // and set the subtotal to a session
        Session.set('totalAmount', subtotalAmount + (subtotalAmount * (vat/100))); // set the total (after tax) to a session
    },

    'change .generator-generation-input-quantity': function () {

        //change the value of the amount field when the user changes the quantity
        var quantity = $(event.target).val(),
            rowWrapper = $(event.target).parent().parent(),
            priceInput = rowWrapper.find('.generator-generation-input-price'),
            amountInput = rowWrapper.find('.generator-generation-input-amount'),
            amountFields = $('.generator-generation-input-amount'),
            subtotalAmount = 0,
            vat = parseInt($('.generator-generation-input-vat').val());

        amountInput.val(parseInt(quantity, 10) * parseInt(priceInput.val(), 10));

        // add up the subtotal (before tax) of all the amount fields
        for (var i = 0; i < amountFields.length; i++) {
            if ($(amountFields[i]).val() !== '') {
                subtotalAmount += parseInt($(amountFields[i]).val(), 10);
            }
        }

        Session.set('subtotalAmount', subtotalAmount); // and set the subtotal to a session
        Session.set('totalAmount', subtotalAmount + (subtotalAmount * (vat/100))); // set the total (after tax) to a session

    },

    'change .generator-generation-input-price': function () {

        var price = $(event.target).val(),
            rowWrapper = $(event.target).parent().parent(),
            quantityInput = rowWrapper.find('.generator-generation-input-quantity'),
            amountInput = rowWrapper.find('.generator-generation-input-amount'),
            amountFields = $('.generator-generation-input-amount'),
            subtotalAmount = 0,
            vat = parseInt($('.generator-generation-input-vat').val());

        amountInput.val(parseInt(price) * parseInt(quantityInput.val()));

        // add up the subtotal (before tax) of all the amount fields
        for (var i = 0; i < amountFields.length; i++) {
            if ($(amountFields[i]).val() !== '') {
                subtotalAmount += parseInt($(amountFields[i]).val(), 10);
            }
        }

        Session.set('subtotalAmount', subtotalAmount); // and set the subtotal to a session
        Session.set('totalAmount', subtotalAmount + (subtotalAmount * (vat/100))); // set the total (after tax) to a session

    },

    'change .generator-generation-input-amount': function () {

        var amount = $(event.target).val(),
            rowWrapper = $(event.target).parent().parent(),
            quantityInput = rowWrapper.find('.generator-generation-input-quantity'),
            priceInput = rowWrapper.find('.generator-generation-input-price'),
            amountFields = $('.generator-generation-input-amount'),
            subtotalAmount = 0,
            vat = parseInt($('.generator-generation-input-vat').val());

        priceInput.val(parseInt(amount)/parseInt(quantityInput.val()));

        // add up the subtotal (before tax) of all the amount fields
        for (var i = 0; i < amountFields.length; i++) {
            if ($(amountFields[i]).val() !== '') {
                subtotalAmount += parseInt($(amountFields[i]).val(), 10);
            }
        }

        Session.set('subtotalAmount', subtotalAmount); // and set the subtotal to a session
        Session.set('totalAmount', subtotalAmount + (subtotalAmount * (vat/100))); // set the total (after tax) to a session

    },

    'change .generator-generation-input-vat': function () {
        var vatRate = parseInt($(event.target).val()),
            newTotal = Session.get('subtotalAmount') + (Session.get('subtotalAmount') * (vatRate/100));

        Session.set('totalAmount', newTotal);
    },

    'click .generator-generation-row-save': function () {
        var rowWrapper;

        // fix for inconsistent event.target
        if ( $(event.target).hasClass('icon-checkmark') ) {
            // if the user clicks on exactly the check-mark
            rowWrapper = $(event.target).parent().parent().parent()
        } else {
            // the user clicks outside the checkmark
            rowWrapper = $(event.target).parent().parent()
        }

        var treatmentId = rowWrapper.data('id');

        rowWrapper.find('.generator-generation-row-edit, .icon-write').show();
        rowWrapper.find('.generator-generation-row-delete').show();
        rowWrapper.find('.generator-generation-cell-edit-text').show();

        rowWrapper.find('.generator-generation-input, .generator-generation-select').hide();
        rowWrapper.find('.generator-generation-row-save, .icon-checkmark').hide();

        var serviceId = rowWrapper.find('.generator-generation-select').val(),
            description = rowWrapper.find('.generator-generation-input-description').val(),
            quantity = parseInt(rowWrapper.find('.generator-generation-input-quantity').val()),
            price = parseInt(rowWrapper.find('.generator-generation-input-price').val()),
            amount = parseInt(rowWrapper.find('.generator-generation-input-amount').val());

        Meteor.call('UpdateGeneratedTreatment', {
            treatment_id: treatmentId,
            service_id: serviceId,
            quantity: quantity,
            price: price,
            amount: amount
        });
    }
});


Template.generationEditHeader.rendered = function () {
    $('.generator-generation-datepicker').datepicker({ dateFormat: 'yy mm dd', maxDate: 0 });
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



Template.generationEditCalculator.helpers({
    subtotal: function () {
        return Session.get('subtotalAmount');
    },

    total: function () {
        return Session.get('totalAmount');
    }
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