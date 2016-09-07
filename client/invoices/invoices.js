Session.setDefault('invoicesLimit', 10);

Template.invoicesSearch.helpers({
    'invoicesIndex': function () {
        return InvoicesIndex;
    }
});

Template.invoicesSearch.events({
    'keyup input': function () {
        $('.body-search-form-results').show();
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