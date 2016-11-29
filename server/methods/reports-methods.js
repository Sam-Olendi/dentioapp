Meteor.methods({
    getDailyTotal: function ( theDate ) {

        check( theDate, String );

        var invoices = Invoices.aggregate(
            { $match: { date_issued: theDate } },
            { $group: { _id: '$date_issued', total: { $sum: '$amount' } } });

        var totals = [];

        for ( var i = 0; i < invoices.length; i++ ) {
            totals[i] = invoices[i].total;
        }

        console.log(totals);
        //return Invoices.aggregate(
        //    { $match: { date_issued: theDate } },
        //    { $group: { _id: '$date_issued', total: { $sum: '$amount' } } }
        //);

        return totals;

    },

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
    },

    getQuarterTotal: function ( theMonth ) {

        check( theMonth, Match.OneOf( Object, Array ) );

        var invoices = [];

        for ( var i = 0; i < theMonth.length; i++) {
            invoices[i] = Invoices.aggregate(
                { $match: { date_issued: { $regex: theMonth[i] } } },
                { $group: { _id: theMonth[i], total: { $sum: '$amount' } } }
            );
        }

        console.log(invoices);

        //for ( var j = 0; j < invoices.length; j++) {
        //    console.log(invoices[0]);
        //}

        //console.log(theMonth);

        //var invoicesReturn = Invoices.aggregate({ $match: { date_issued: { $regex: theDay[i] } } }, { $group: { _id: '$date_issued', total: { $sum: '$amount' } } });

        //console.log(invoicesReturn)

    }
});