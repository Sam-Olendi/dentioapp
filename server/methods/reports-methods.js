Meteor.methods({
    getDailyTotal: function ( theDate ) {

        check( theDate, String );

        return Invoices.aggregate(
            { $match: { date_issued: theDate } },
            { $group: { _id: '$date_issued', total: { $sum: '$amount' } } }
        );

    }
});