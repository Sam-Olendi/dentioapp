Session.setDefault('subtotalAmount', 0);
Session.setDefault('totalAmount', Session.get('subtotalAmount'));



Template.generationNew.onCreated(function () {
    this.subscribe('services.list');
});

Template.generationNew.events({
    'change .generator-generation-select': function () {

        // when the user chooses a service from the select-box,
        var serviceId = $(event.target).val(), // id of the service
            service = Services.findOne({_id: serviceId}), // service in the DB
            rowWrapper = $(event.target).parent().parent(), // the row that contains all the service info
            amountFields = $('.generator-generation-input-amount'), // an array of all the amount fields (to collect totals)
            subtotalAmount = 0,
            vat = parseInt($('#generator-generation-input-vat').val());

        // set the values of the service description, the price and amount
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
            vat = parseInt($('#generator-generation-input-vat').val());

        amountInput.val(parseInt(quantity, 10) * parseInt(priceInput.val(), 10)); // get the new amount price

        for (var i = 0; i < amountFields.length; i++) {
            if ($(amountFields[i]).val() !== '') {
                subtotalAmount += parseInt($(amountFields[i]).val(), 10); // get the new subtotal
            }
        }

        Session.set('subtotalAmount', subtotalAmount);
        Session.set('totalAmount', subtotalAmount + (subtotalAmount * (vat/100))); // the new total price
    },

    'change .generator-generation-input-price': function () {
        var price = $(event.target).val(),
            rowWrapper = $(event.target).parent().parent(),
            quantityInput = rowWrapper.find('.generator-generation-input-quantity'),
            amountInput = rowWrapper.find('.generator-generation-input-amount'),
            amountFields = $('.generator-generation-input-amount'),
            subtotalAmount = 0,
            vat = parseInt($('#generator-generation-input-vat').val());

        amountInput.val(parseInt(price) * parseInt(quantityInput.val()));

        for (var i = 0; i < amountFields.length; i++) {
            if ($(amountFields[i]).val() !== '') {
                subtotalAmount += parseInt($(amountFields[i]).val(), 10);
            }
        }

        Session.set('subtotalAmount', subtotalAmount);
        Session.set('totalAmount', subtotalAmount + (subtotalAmount * (vat/100)));
    },

    'change .generator-generation-input-amount': function () {
        var amount = $(event.target).val(),
            rowWrapper = $(event.target).parent().parent(),
            quantityInput = rowWrapper.find('.generator-generation-input-quantity'),
            priceInput = rowWrapper.find('.generator-generation-input-price'),
            amountFields = $('.generator-generation-input-amount'),
            subtotalAmount = 0,
            vat = parseInt($('#generator-generation-input-vat').val());

        priceInput.val(parseInt(amount)/parseInt(quantityInput.val()));

        for (var i = 0; i < amountFields.length; i++) {
            if ($(amountFields[i]).val() !== '') {
                subtotalAmount += parseInt($(amountFields[i]).val(), 10);
            }
        }

        Session.set('subtotalAmount', subtotalAmount);
        Session.set('totalAmount', subtotalAmount + (subtotalAmount * (vat/100)));
    },

    'click .js-generation-new-row-delete': function () {
        $(event.target).parent().parent().remove();

        var amountFields = $('.generator-generation-input-amount'),
            subtotalAmount = 0,
            vat = parseInt($('#generator-generation-input-vat').val());

        for (var i = 0; i < amountFields.length; i++) {
            if ($(amountFields[i]).val() !== '') {
                subtotalAmount += parseInt($(amountFields[i]).val(), 10);
            }
        }

        Session.set('subtotalAmount', subtotalAmount);
        Session.set('totalAmount', subtotalAmount + (subtotalAmount * (vat/100)));
    }
});



Template.generationNewHeader.onCreated(function () {
    this.subscribe('generations.check');
    this.subscribe('invoices.check');
});

Template.generationNewHeader.rendered = function () {
    $('.generator-generation-datepicker').datepicker({dateFormat: 'yy mm dd', maxDate: 0})
};

Template.generationNewHeader.helpers({
    generationNumber: function () {

        // get the last generation and invoice numbers with the largest value
        // set the new generation number to the greatest value of the two + 1

        var lastGeneration = Generations.findOne({}, { sort: { generation_no: -1 }, fields: { generation_no: 1, date_generated: 1 } }),
            lastInvoice = Invoices.findOne({}, { sort: {invoice_no: -1}, fields: {invoice_no: 1} });

        if ( lastGeneration && lastInvoice ) {
            if ( lastGeneration.generation_no >= lastInvoice.invoice_no ) {
                return lastGeneration.generation_no + 1;
            } else {
                return lastInvoice.invoice_no + 1;
            }
        }
    }
});

Template.generationNewHeader.events({
    'change .generator-generation-datepicker': function () {
        var selectedDate = $('.generator-generation-datepicker'),
            momentDate = moment(new Date(selectedDate.val()).toISOString()).format('Do MMM YYYY');

        selectedDate.val(momentDate);
    },

    'keyup #generator-invoice-new-patient-name': function () {
        $('#generator-input-search-results-patients').show();
    },

    'click': function () {
        // hide the results when user clicks on anywhere on the page
        $('.generator-input-search-results').hide();

    }
});



Template.generationNewPatientSearch.onCreated(function () {
    // attach a reactive var to the template instance
    var template = Template.instance();

    template.searchQuery = new ReactiveVar();
    template.searching = new ReactiveVar(false);

    /*
     UX Addition: wait for 300ms before showing the results
     */
    template.autorun(function () {
        // subscribe to the right publication and send the search query
        template.subscribe('patients.search', template.searchQuery.get(), function () {
            setTimeout(function () {
                template.searching.set(false);
            }, 300);
        });
    });

    template.subscribe('companies.all');
});

Template.generationNewPatientSearch.helpers({
    searching: function () {
        // return the searching reactive var
        return Template.instance().searching.get();
    },
    query: function () {
        // return the searchQuery reactive var
        return Template.instance().searchQuery.get()
    },
    patients: function () {
        // return the results
        var patients = Patients.find();
        if ( patients ) return patients;
    }
});

Template.generationNewPatientSearch.events({
    'keyup #generator-invoice-new-patient-name': function (event, template) {
        // get value of the search box
        var value = $(event.target).val().trim();

        // if value is not blank and the user presses enter (return on Mac)
        if (value !== '' && event.keyCode === 13) {
            template.searchQuery.set(value);
            template.searching.set(true);
        }

        if (value === '') {
            template.searchQuery.set(value);
        }
    },

    'click .js-generation-new-patient-name': function (event) {
        event.preventDefault();
        Session.set('newGenerationPatientId', $(event.target).data('id'));

        /*
          Auto-filling fields with data if it exists
         */

        var patient = Patients.findOne({_id: Session.get('newGenerationPatientId')}),
            patientName = patient.profile.surname+ ', ' + patient.profile.first_name + ' ' + patient.profile.middle_name;

        $('#generator-invoice-new-patient-name').val(patientName); // set the patient's name

        if (patient.work) {
            // if they have a job in the DB, fill it in
            $('#generator-invoice-new-company').val(Companies.findOne({_id: patient.work.company_id}).company_name);
            if (patient.work.staff_number) $('#generator-invoice-new-staff-number').val(patient.work.staff_number);
        }

        if (patient.contacts) {
            // and also address should be added if it exists
            if (patient.contacts.postal_address) {
                var address = patient.contacts.postal_address;
                $('#generator-invoice-new-address').text(patientName+ '\n' + address.replace(/(<br>|<br\/>|<br \/>)/g, '\n'));
            }
        }
    }
});



Template.generationNewTableRows.onCreated(function () {
    this.subscribe('services.list');
});

Template.generationNewTableRows.helpers({
    services: function () {
        return Services.find({}, { sort: { service_name: 1 }});
    }
});



Template.generationNewControls.onCreated(function () {
    this.subscribe('services.list');
});

Template.generationNewControls.events({
    'click .js-generation-new-add-row': function () {
        var services = Services.find().fetch(),
            randomNumber = Math.floor(Math.random() * 100) + 1;

        $('.generator-generation-table').append('' +
            '<div class="generator-generation-table-row">' +
                '<div class="generator-generation-cell mod-generator-generation-cell-service">' +
                    '<select title="Select a service" data-id="' + randomNumber + '" id="generator-invoice-new-select-' + randomNumber + '" class="generator-generation-select mod-generator-generation-select-table generator-generation-select-service">' +
                        '<option value="None">--Select a service--</option>' +
                    '</select>' +
                '</div>' +
                '<div class="generator-generation-cell mod-generator-generation-cell-description">' +
                    '<input type="text" data-id="' + randomNumber + '" id="generator-invoice-new-description-' + randomNumber + '" placeholder="Service description" class="generator-generation-input mod-generator-generation-input-table generator-generation-input-description">' +
                '</div>' +
                '<div class="generator-generation-cell mod-generator-generation-cell-quantity">' +
                    '<input type="number" data-id="' + randomNumber + '" id="generator-invoice-new-quantity-' + randomNumber + '" value="1" placeholder="Quantity" class="generator-generation-input mod-generator-generation-input-table generator-generation-input-quantity">' +
                '</div>' +
                '<div class="generator-generation-cell mod-generator-generation-cell-price">' +
                    '<input type="number" data-id="' + randomNumber + '" id="generator-invoice-new-price-' + randomNumber + '" placeholder="Price" class="generator-generation-input mod-generator-generation-input-table generator-generation-input-price">' +
                '</div><div class="generator-generation-cell mod-generator-generation-cell-amount">' +
                    '<input type="number" data-id="' + randomNumber + '" id="generator-invoice-new-amount-' + randomNumber + '" placeholder="Amount" class="generator-generation-input mod-generator-generation-input-table generator-generation-input-amount">' +
                '</div>' +
                '<a href="#" class="generator-generation-row-delete js-generation-new-row-delete"><span title="Remove this row" class="icon-cancel"></span></a>' +
            '</div>');

        for (var i = 0; i < services.length; i++) {
            $('#generator-invoice-new-select-' + randomNumber).append('<option value="'+ services[i]._id +'">' + services[i].service_name + '</option>');
        }
    }
});

Template.generationNewCalculator.helpers({
    subtotal: function () {
        return Session.get('subtotalAmount');
    },

    total: function () {
        return Session.get('totalAmount');
    }
});

Template.generationNewCalculator.events({
    'change #generator-generation-input-vat': function () {
        var vatRate = parseInt($(event.target).val()),
            newTotal = Session.get('subtotalAmount') + (Session.get('subtotalAmount') * (vatRate/100));

        Session.set('totalAmount', newTotal);
    }
});



Template.generationNewButtons.onCreated(function () {
    this.subscribe('generations.compare');
});

Template.generationNewButtons.events({
    'click .js-generation-new-save-invoice': function (event) {

        event.preventDefault();

        // check if the invoice number, date and name are empty
        // if they are, prompt the user to fill them
        var invoiceNo = parseInt($('#generator-invoice-new-invoice-no').val()),
            invoiceDate = $('#generator-invoice-new-date').val(),
            patientName = $('#generator-invoice-new-patient-name').val();

        if ( !invoiceNo || !invoiceDate || !patientName ) {
            alert('Please make sure that you have entered an invoice number, a date and a patient\'s name!');
        }

        // check if generation number exists
        var generationExists = Generations.find({generation_no: invoiceNo}).fetch().length;
        if ( generationExists ) {
            alert('The invoice number already exists. Please try and increment it by 1. .e.g Add 1 to 20001 to make it 20002.');
        }


        if ( patientName )
        {
            // check if the company entered exists
            // if not, add it to the DB
            var companyName = $('#generator-invoice-new-company').val(),
                companyRegex = new RegExp(companyName, 'i'),
                companyId = '';

            if ( companyName != '' ) {
                var companyExists = Companies.find({ company_name: { $regex: companyRegex } }).fetch().length,
                    patient = Patients.findOne({_id: Session.get('newGenerationPatientId')});

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
                        patient_id: Session.get('newGenerationPatientId'),
                        company_id: companyId,
                        staff_number: $('#generator-invoice-new-staff-number').val()
                    });
                }

            } else {
                Meteor.call('UpdateWorkDetails', {
                    patient_id: Session.get('newGenerationPatientId'),
                    company_id: '',
                    staff_number: ''
                });
            }

            // loop through all the rows
            // for each service, call the treatments method and add it there
            // add a special property (e.g. generation: true) to differentiate it from other treatments
            // (or add a generation_id)
            var services = $('.generator-generation-select-service'),
                dataIds = [];

            for ( var i = 0; i < services.length; i++ ) {
                dataIds[i] = $(services[i]).data('id');
            }

            for ( var j = 0; j < dataIds.length; j++) {
                Meteor.call('AddGeneratedTreatment', {
                    patient_id: Session.get('newGenerationPatientId'),
                    generation_no: invoiceNo,
                    appointment_id: null,
                    service_id: $('#generator-invoice-new-select-' + dataIds[j]).val(),
                    quantity: parseInt($('#generator-invoice-new-quantity-' + dataIds[j]).val()),
                    price: parseInt($('#generator-invoice-new-price-' + dataIds[j]).val()),
                    amount: parseInt($('#generator-invoice-new-amount-' + dataIds[j]).val()),
                    description: $('#generator-invoice-new-description-' + dataIds[j]).val(),
                    date_performed: invoiceDate
                });

            }

            //// call the method to save the generation
            var postalAddress = $('#generator-invoice-new-address').val(),
                vatRate = parseInt($('#generator-generation-input-vat').val()),
                totals = $('.generator-generation-input-amount'),
                subtotalAmount = 0;


            for (var k = 0; k < totals.length; k++) {
                if ($(totals[k]).val() !== '') {
                    subtotalAmount += parseInt($(totals[k]).val());
                }
            }

            var finalAmount = subtotalAmount + (subtotalAmount * (vatRate/100));

            if ( !generationExists && invoiceDate && patientName ) {
                Meteor.call('AddGeneration', {
                    generation_no: invoiceNo,
                    appointment_id: null,
                    patient_id: Session.get('newGenerationPatientId'),
                    company_id: companyId,
                    postal_address: postalAddress,
                    vat: vatRate,
                    final_amount: finalAmount,
                    date_generated: invoiceDate
                });

                if ( Generations.find({generation_no: invoiceNo}).fetch().length ) {
                    alert('Saved!');
                    Router.go('/generator')
                }
            }
        }


    }
});