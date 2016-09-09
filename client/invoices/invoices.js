Session.setDefault('invoicesLimit', 10);


function openCloseModal (modalClass, modalContentClass, modalCloseClass) {
    // this function provides the ability to open and close modals
    $(modalClass).addClass('modal-is-active');
    $(modalContentClass).addClass('modal-content-is-active');

    $('.modal-close,' + modalCloseClass).click(function () {
        $('.body-error').hide();
        Session.set('selectedPatientId', undefined);

        $(modalClass).removeClass('modal-is-active');
        $(modalContentClass).removeClass('modal-content-is-active');
    });
}

function closeModal (modalClass, modalContentClass) {
    $('.body-error').hide();
    Session.set('selectedPatientId', undefined);
    $(modalClass).removeClass('modal-is-active');
    $(modalContentClass).removeClass('modal-content-is-active');
}



Template.invoices.events({
    'click': function () {
        $('.body-search-form-results').hide();
    }
});



Template.invoicesSearch.helpers({
    'invoicesIndex': function () {
        return InvoicesIndex;
    }
});

Template.invoicesSearch.events({
    'click .body-search': function (event) {
        event.stopPropagation();
    },

    'keyup input': function () {
        $('.body-search-form-results').show();
    },

    'mouseenter .body-search-result': function (event) {
        Session.set('selectedInvoiceId', $(event.target).data('id'));
    },

    'click .js-trigger-invoice-view': function (event) {
        event.preventDefault();
        openCloseModal('.invoices-view-modal', '.invoices-view-modal-content', '.js-cancel-invoice-view')
    }
});



Template.invoicesContent.onCreated(function () {
    var self = this;

    self.autorun(function () {
        self.subscribe('invoices', Session.get('invoicesLimit'));
    });
});

Template.invoicesContent.helpers({
   invoicesFound: function () {
       return Invoices.find({}, {limit: Session.get('invoicesLimit'), sort: { invoice_no: -1 }}).fetch().length;
   }
});

Template.invoicesContent.events({
   'click .js-show-more-invoices': function () {
       Session.set('invoicesLimit', Session.get('invoicesLimit') + 10);
   }
});



Template.invoicesContentTableRow.helpers({
    invoices: function () {
        return Invoices.find({}, {limit: Session.get('invoicesLimit'), sort: { invoice_no: -1 }});
    }
});

Template.invoicesContentTableRow.events({
    'mouseenter .invoices-table-row': function () {
        Session.set('selectedInvoiceId', $(event.target).data('id'));
    },

    'click .js-trigger-invoice-view': function () {
        openCloseModal('.invoices-view-modal', '.invoices-view-modal-content', '.js-cancel-invoice-view');
    }
});



Template.invoicesViewModal.onCreated(function () {
    var self = this;

    if ( Session.get('selectedInvoiceId') ) {
        self.autorun(function () {
            self.subscribe('generations.single.invoices', Session.get('selectedInvoiceId'));
        });
    }
});

Template.invoicesViewModal.helpers({
    invoice: function () {
        return Invoices.findOne({_id: Session.get('selectedInvoiceId')});
    }
});