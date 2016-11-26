Meteor.methods({
    getInvoicesTotal: function ( today ) {
        check ( today, String );

        var group = {
            _id: {
                date_issued: '$date_issued'
            },
            total: {
                $sum: '$amount'
            }
        };

        //if (Meteor.isClient) {
        //    console.log(invoiceTotal);
        //} else {
        //    console.log('nope!');
        //}

        //return Invoices.aggregate(
        //    { $match: { date_issued: today } },
        //    { $group: group }
        //);
    }
});