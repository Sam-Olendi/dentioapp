Template.generationNewHeader.onCreated(function () {
   this.subscribe('invoices.compare');
});

Template.generationNewHeader.helpers({
   invoiceNumber: function () {
       var previousInvoiceNo = Invoices.find({}, { sort: { date_issued: -1 }, limit: 1, fields: { invoice_no: 1 } }).fetch()[0].invoice_no;
       return previousInvoiceNo + 1;
   }

});