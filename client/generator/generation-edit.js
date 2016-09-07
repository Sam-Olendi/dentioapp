function openCloseModal (modalClass, modalContentClass, modalCloseClass) {
    // this function provides the ability to open and close modals
    $(modalClass).addClass('modal-is-active');
    $(modalContentClass).addClass('modal-content-is-active');

    $('.modal-close,' + modalCloseClass).click(function () {
        $('.body-error').hide();

        $(modalClass).removeClass('modal-is-active');
        $(modalContentClass).removeClass('modal-content-is-active');
    });
}

function closeModal (modalClass, modalContentClass) {
    $('.body-error').hide();
    $(modalClass).removeClass('modal-is-active');
    $(modalContentClass).removeClass('modal-content-is-active');
}



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
            amount = parseInt(rowWrapper.find('.generator-generation-input-amount').val()),
            generationId = $('.generator-generation-table-head').data('id')

        Meteor.call('UpdateGeneratedTreatment', {
            treatment_id: treatmentId,
            service_id: serviceId,
            quantity: quantity,
            price: price,
            amount: amount,
            total_amount: Session.get('totalAmount'),
            generation_id: generationId
        });
    },

    'click .generator-generation-row-delete': function () {
        $(event.target).parent().parent().parent().remove();

        var amountFields = $('.generator-generation-input-amount'), // an array of all the amount fields (to collect totals)
            subtotalAmount = 0,
            vat = parseInt($('.generator-generation-input-vat').val());

        if (amountFields.length) {
            for (var i = 0; i < amountFields.length; i++) {
                if ($(amountFields[i]).val() !== '') {
                    subtotalAmount += parseInt($(amountFields[i]).val(), 10);
                }
            }

            Session.set('subtotalAmount', subtotalAmount); // and set the subtotal to a session
            Session.set('totalAmount', subtotalAmount + (subtotalAmount * (vat/100))); // set the total (after tax) to a session

        } else {
            Session.set('subtotalAmount', subtotalAmount); // if there are no rows, set the subtotal and total to 0
            Session.set('totalAmount', 0);
        }

        // Delete treatment from the database
        Meteor.call('DeleteGeneratedTreatment',$(event.target).parent().parent().parent().data('id') );

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



Template.generationEditControls.events({
    'click .js-add-new-treatment': function () {
        openCloseModal('.generation-new-treatment-modal', '.generation-new-treatment-modal-content', '.js-cancel-generation-new-treatment');
    }
});



Template.generationNewTreatmentModal.onCreated(function () {
    this.subscribe('services.list');
});

Template.generationNewTreatmentModal.helpers({
    services: function () {
        return Services.find();
    }
});

Template.generationNewTreatmentModal.events({
    'change #generation-new-treatment-select': function () {
        var serviceId = $(event.target).val(), // id of the service
            service = Services.findOne({_id: serviceId}), // service in the DB
            rowWrapper = $(event.target).parent().parent(); // the row that contains all the service info

        rowWrapper.find('#generation-new-treatment-description').val(service.service_description);
        rowWrapper.find('#generation-new-treatment-price').val(parseInt(service.service_price, 10));
        rowWrapper.find('#generation-new-treatment-amount').val(parseInt(service.service_price, 10));
    },

    'change #generation-new-treatment-quantity': function () {
        var quantity = $(event.target).val(),
            rowWrapper = $(event.target).parent().parent().parent(),
            priceInput = rowWrapper.find('#generation-new-treatment-price'),
            amountInput = rowWrapper.find('#generation-new-treatment-amount');

        amountInput.val(parseInt(quantity, 10) * parseInt(priceInput.val(), 10));
    },

    'change #generation-new-treatment-price': function () {
        var price = $(event.target).val(),
            rowWrapper = $(event.target).parent().parent().parent(),
            quantityInput = rowWrapper.find('#generation-new-treatment-quantity'),
            amountInput = rowWrapper.find('#generation-new-treatment-amount');

        amountInput.val(parseInt(price) * parseInt(quantityInput.val()));
    },

    'change #generation-new-treatment-amount': function () {
        var amount = $(event.target).val(),
            rowWrapper = $(event.target).parent().parent().parent(),
            quantityInput = rowWrapper.find('#generation-new-treatment-quantity'),
            priceInput = rowWrapper.find('#generation-new-treatment-price');

        priceInput.val(parseInt(amount)/parseInt(quantityInput.val()));
    },

    'submit #generation-new-treatment-form': function (event) {
        event.preventDefault();

        var generation = Generations.findOne({_id: this._id});

        if (generation) {

            var patientId = generation.patient_id,
                generationNo = generation.generation_no,
                serviceId = $('#generation-new-treatment-select').val(),
                quantity = parseInt($('#generation-new-treatment-quantity').val()),
                price = parseInt($('#generation-new-treatment-price').val()),
                amount = parseInt($('#generation-new-treatment-amount').val()),
                description = $('#generation-new-treatment-description').val();

            Meteor.call('AddGeneratedTreatment', {
                patient_id: patientId,
                generation_no: generationNo,
                service_id: serviceId,
                quantity: quantity,
                price: price,
                amount: amount,
                description: description,
                date_performed: moment().format('Do MMM YYYY, h:mm:ss a')
            });

            var amountFields = $('.generator-generation-input-amount'),
                subtotalAmount = 0,
                vat = parseInt($('.generator-generation-input-vat').val());

            // add up the subtotal (before tax) of all the amount fields
            for (var i = 0; i < amountFields.length; i++) {
                if ($(amountFields[i]).val() !== '') {
                    subtotalAmount += parseInt($(amountFields[i]).val(), 10);
                }
            }

            Session.set('subtotalAmount', subtotalAmount); // and set the subtotal to a session
            Session.set('totalAmount', subtotalAmount + (subtotalAmount * (vat/100))); // set the total (after tax) to a session

            closeModal('.generation-new-treatment-modal', '.generation-new-treatment-modal-content');
        }


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
        openCloseModal('.generation-delete-modal', '.generation-delete-modal-content', '.js-cancel-generation-delete');
    },

    'click .js-save-generation-confirmation': function (event) {
        event.preventDefault();
        openCloseModal('.generation-save-modal', '.generation-save-modal-content', '.js-cancel-generation-save');
    }
});

Template.generationSaveModal.onCreated(function () {
    this.subscribe('generations.compare');
    this.subscribe('patients.generations');
    this.subscribe('companies.all');
});

Template.generationSaveModal.events({
    'click .js-generation-save': function () {
        // check if the invoice number, date and name are empty
        // if they are, prompt the user to fill them

        closeModal('.generation-save-modal', '.generation-save-modal-content');

        var invoiceNo = parseInt($('#generator-invoice-edit-invoice-no').val()),
            invoiceDate = $('#generator-invoice-edit-date').val(),
            patientName = $('#generator-invoice-edit-patient-name').val();

        if ( !invoiceNo || !invoiceDate || !patientName ) {
            alert('Please make sure that you have entered an invoice number, a date and a patient\'s name!');
        }

        // check if generation number exists
        var generationExists = Generations.find({generation_no: invoiceNo}),
            generationNo = Generations.findOne({_id: this._id}).generation_no,
            patientId = Generations.findOne({_id: this._id}).patient_id;

        if ( generationExists.fetch().length && generationNo !== invoiceNo ) {
            alert('The invoice number already exists. Please refrain from changing the generated number.');
        } else {
            if ( patientName )
            {
                // check if the company entered exists
                // if not, add it to the DB
                var companyName = $('#generator-invoice-edit-company').val(),
                    companyRegex = new RegExp(companyName, 'i'),
                    companyId = '';

                if ( companyName != '' ) {
                    var companyExists = Companies.find({ company_name: { $regex: companyRegex } }).fetch().length,
                        patient = Patients.findOne({_id: patientId});

                    if ( !companyExists ) {
                        Meteor.call('AddGeneratedCompanies', companyName);
                        companyId = Companies.findOne({company_name: companyName})._id;
                    } else {
                        companyId = Companies.findOne({company_name: companyName})._id;
                    }

                    // check if the patient has their work details entered
                    // if not, enter them
                    if ( !patient.work ) {
                        Meteor.call('UpdateWorkDetails', {
                            patient_id: patientId,
                            company_id: companyId,
                            staff_number: $('#generator-invoice-edit-staff-number').val()
                        });
                    }

                } else {
                    Meteor.call('UpdateWorkDetails', {
                        patient_id: patientId,
                        company_id: '',
                        staff_number: ''
                    });
                }

                // call the method to save the generation
                var postalAddress = $('#generator-invoice-edit-address').val(),
                    vatRate = parseInt($('.generator-generation-input-vat').val()),
                    amountFields = $('.generator-generation-input-amount'),
                    subtotalAmount = 0;

                // add up the subtotal (before tax) of all the amount fields
                for (var i = 0; i < amountFields.length; i++) {
                    if ($(amountFields[i]).val() !== '') {
                        subtotalAmount += parseInt($(amountFields[i]).val(), 10);
                    }
                }

                Session.set('subtotalAmount', subtotalAmount); // and set the subtotal to a session
                Session.set('totalAmount', subtotalAmount + (subtotalAmount * (vatRate/100))); // set the total (after tax) to a session

                if ( invoiceDate && patientName ) {
                    Meteor.call('UpdateGeneration', {
                        generation_id: this._id,
                        generation_no: invoiceNo,
                        patient_id: patientId,
                        company_id: companyId,
                        postal_address: postalAddress,
                        vat: vatRate,
                        final_amount: parseInt(Session.get('totalAmount')),
                        date_generated: invoiceDate
                    });

                    if ( Generations.find({generation_no: invoiceNo}).fetch().length ) {
                        alert('Saved!');
                    }

                    Router.go('/generator');
                }
            }
        }
    }
});

Template.generationDeleteModal.events({
    'click .js-generation-delete': function (event) {
        var generationId = $(event.target).data('id');
        Router.go('/generator');

        Meteor.call('DeleteGeneration', generationId);
    }
});