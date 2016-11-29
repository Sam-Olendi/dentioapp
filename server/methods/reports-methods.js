Meteor.methods({
    getTotal: function (theDay) {

        check( theDay, Match.OneOf( Object, Array ) );

        var invoices = [], totals = [];

        for ( var i = 0; i < theDay.length; i++) {
            invoices[i] = Invoices.aggregate(
                { $match: { date_issued: { $regex: theDay[i] } } },
                { $group: { _id: theDay[i], total: { $sum: '$amount' } } }
            );
        }

        for( var j = 0; j < invoices.length; j++) {
            if ( invoices[j][0] )
                totals.push(invoices[j][0].total);
            else
                totals.push(0);
        }

        return totals;
    }
});