Template.reportsSummary.onCreated(function () {
    var template = Template.instance();
    this.subscribe( 'invoices.reports.total' );
    template.subscribe('appointments.day.patients');
});

Template.reportsSummary.helpers({
    totalAmount: function () {
        var todaysDate = new RegExp( moment().format('Do MMM YYYY') );
        var todaysInvoices = Invoices.find( { date_issued: { $regex: todaysDate } }, { fields: { amount: 1 } }).fetch();
        var count = todaysInvoices.length,
            amount = 0;

        if ( count ) {
            for ( var i = 0; i < count; i++ ) {
                amount += todaysInvoices[i].amount;
            }
        }

        return amount;
    },

    monthsAmount: function () {
        var thisMonth = new RegExp( moment().format('MMM YYYY')),
            monthsInvoices = Invoices.find( { date_issued: { $regex: thisMonth } }, { fields: { amount: 1 } } ).fetch(),
            count = monthsInvoices.length,
            amount = 0;

        if ( count ) {
            for (var i = 0; i < count; i++) {
                amount += monthsInvoices[i].amount;
            }
        }

        return amount;
    },

    daysPatients: function () {
        var todaysDate = new RegExp( moment().format('Do MMM YYYY') );
        return Appointments.find( { date_created: { $regex: todaysDate } }, { fields: { date_created: 1 } } ).count();
    },

    monthsPatients: function () {
        var thisMonth = new RegExp( moment().format('MMM YYYY') );
        return Appointments.find( { date_created: { $regex: thisMonth } }, { fields: { date_created: 1 } }).count();
    }
});

Template.reportsSummaryWeeksAppointments.onRendered(function () {

    var days = [], dailyCount = [];

    setTimeout(function () {
        for ( var i = 0; i < 7; i++ ) {
            days[i] = moment().subtract( i, 'days').format('dddd');
            dailyCount.push(Appointments.find( { date_created: { $regex: moment().subtract( i, 'days').format('Do MMM YYYY') } } ).count());
        }

        new Chartist.Line('#report-week-appointments', {
            labels: days.reverse(),
            series: [
                dailyCount.reverse()
            ]
        }, {
            height: 300,
            width: 900,
            low: 0,
            showArea: true
        });
    }, 3000);

});

Template.reportsSummaryWeeksCash.onRendered(function () {

    var days = [], dailyIncome = [], theDay = [];

    setTimeout(function () {
        for ( var i = 0; i < 7; i++ ) {
            days[i] = moment().subtract( i, 'days').format( 'dddd' );
            theDay[i] = moment().subtract( i, 'days' ).format('Do MMM YYYY');
        }

        for ( var j = 0; j < theDay.length; j++ ) {
            Meteor.call('getDailyTotal', theDay[j], function (error, response) {
                if ( error ) {
                    alert(error.reason)
                } else {
                    if ( response[0] ) {
                        dailyIncome.unshift(response[0].total);
                    } else {
                        dailyIncome.unshift(0);
                    }
                }
            });
        }

        new Chartist.Line('#report-week-cash', {
            labels: days.reverse(),
            series: [
                dailyIncome
            ]
        }, {
            height: 300,
            width: 900,
            low: 0,
            showArea: true
        });
    }, 3000);

});