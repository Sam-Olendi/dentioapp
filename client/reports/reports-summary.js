var Highcharts = require('highcharts/highstock');
require('highcharts/modules/exporting')(Highcharts);

Template.reportsSummary.onCreated(function () {
    this.subscribe( 'invoices.reports.total' );
    this.subscribe('appointments.day.patients');
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

    Session.setDefault('appointmentsPeriod', 'week');

    $('#reports-summary-appointments-select').change(function ( event ) {
        event.preventDefault();
        Session.set('appointmentsPeriod', $(this).val());
    });

    this.autorun(function () {

        if ( Session.get('appointmentsPeriod') == 'week' ) {
            var days = [], dailyCount = [];

            for ( var i = 0; i < 7; i++ ) {
                days[i] = moment().subtract( i, 'days').format('dddd');
                dailyCount.push(Appointments.find( { date_created: { $regex: moment().subtract( i, 'days').format('Do MMM YYYY') } } ).count());
            }

            plotGraph('#report-week-appointments', 'Last Week in Appointments', 'The number of appointments completed in the last seven days', 'No. of Appointments', 'Days', days.reverse(), dailyCount.reverse(), 'Appointments');


        } else if ( Session.get('appointmentsPeriod') == 'quarter' ) {
            var months = [], monthlyCount = [];

            for ( var q = 0; q < 4; q++ ) {
                months[q] = moment().subtract( q, 'months').format('MMMM');
                monthlyCount.push(Appointments.find( { date_created: { $regex: moment().subtract( q, 'months').format('MMM YYYY') } } ).count());
            }

            plotGraph('#report-week-appointments', 'Last Quarter', 'Last 4 months in appointments', 'No. of Appointments', 'Months', months.reverse(), monthlyCount.reverse(), 'Appointments');

        } else if ( Session.get('appointmentsPeriod') == 'half' ) {

            var sixMonths = [], biannualCount = [];

            for ( var h = 0; h < 6; h++ ) {
                sixMonths[h] = moment().subtract( h, 'months').format('MMMM');
                biannualCount.push(Appointments.find( { date_created: { $regex: moment().subtract( h, 'months').format('MMM YYYY') } } ).count());
            }

            plotGraph('#report-week-appointments', 'Last 6 Months', 'Last 6 months in appointments', 'No. of Appointments', 'Months', sixMonths.reverse(), biannualCount.reverse(), 'Appointments');


        } else if ( Session.get('appointmentsPeriod') == 'year' ) {
            var years = [], yearlyCount = [];

            for ( var y = 0; y < 12; y++ ) {
                years[y] = moment().subtract( y, 'months').format('MMMM');
                yearlyCount.push(Appointments.find( { date_created: { $regex: moment().subtract( y, 'months').format('MMM YYYY') } } ).count());
            }

            plotGraph('#report-week-appointments', 'Last Year', 'Last 12 months in appointments', 'No. of Appointments', 'Years', years.reverse(), yearlyCount.reverse(), 'Appointments');

        }

    });
});

Template.reportsSummaryWeeksCash.onRendered(function () {

    Session.setDefault('cashFlowPeriod', 'week');

    $('#reports-summary-cash-select').change(function ( event ) {
        event.preventDefault();
        Session.set('cashFlowPeriod', $(this).val());
    });

    this.autorun(function () {

        if ( Session.get('cashFlowPeriod') == 'week' ) {

            var days = [], theDay = [];

            for ( var i = 0; i < 7; i++ ) {
                days[i] = moment().subtract( i, 'days').format( 'dddd' );
                theDay[i] = moment().subtract( i, 'days' ).format('Do MMM YYYY');
            }

            Meteor.call('getTotal', theDay, function (error, response) {
                if ( error ) {
                    alert( error.reason );
                } else {
                    plotGraph( '#report-week-cash', 'Last Week in Cash Flow', 'The amount of money made in the last 7 days', 'Amount (in Kshs.)', 'Days', days.reverse(), response.reverse(), 'Amount (in Kshs.)' )
                }
            });

        } else if ( Session.get('cashFlowPeriod') == 'quarter' ) {

            var months = [], theMonth = [];

            for ( var q = 0; q < 4; q++ ) {
                months[q] = moment().subtract( q, 'months' ).format('MMMM');
                theMonth[q] = moment().subtract( q, 'months' ).format('MMM YYYY');
            }

            Meteor.call('getTotal', theMonth, function (error, response) {
                if ( error ) {
                    alert( error.reason );
                } else {
                    plotGraph( '#report-week-cash', 'Last Quarter in Cash Flow', 'The amount of money made in the last 4 months', 'Amount (in Kshs.)', 'Months', months.reverse(), response.reverse(), 'Amount (in Kshs.)' )
                }
            });

        } else if ( Session.get('cashFlowPeriod') == 'half' ) {

            var sixMonths =[], theGivenMonth = [];

            for ( var h = 0; h < 6; h++ ) {
                sixMonths[h] = moment().subtract( h, 'months' ).format('MMMM');
                theGivenMonth[h] = moment().subtract( h, 'months' ).format('MMM YYYY');
            }

            Meteor.call('getTotal', theGivenMonth, function (error, response) {
                if ( error ) {
                    alert( error.reason )
                } else {
                    plotGraph( '#report-week-cash', 'Last 6 Months in Cash Flow', 'The amount of money made in the last 6 months', 'Amount (in Kshs.)', 'Months', sixMonths.reverse(), response.reverse(), 'Amount (in Kshs.)' );
                }
            });

        } else if ( Session.get('cashFlowPeriod') == 'year' ) {

            var years = [], theYear = [];

            for ( var y = 0; y < 12; y++ ) {
                years[y] = moment().subtract( y, 'months' ).format('MMMM');
                theYear[y] = moment().subtract( y, 'months' ).format('MMM YYYY');
            }

            Meteor.call('getTotal', theYear, function (error, response) {
                if ( error ) {
                    alert( error.reason )
                } else {
                    plotGraph( '#report-week-cash', 'Last Year in Cash Flow', 'The amount of money made in the last year', 'Amount (in Kshs.)', 'Months', years.reverse(), response.reverse(), 'Amount (in Kshs.)' );
                }
            });

        }

    });

});

var plotGraph = function ( graphId, graphTitle, graphSubtitle, yAxisTitle, xAxisTitle, labelArray, seriesArray, seriesName ) {
    $(graphId).highcharts({

        title: {
            text: graphTitle,
            x: -20 //center
        },

        chart: {
            marginTop: 120,
            type: 'area',
            width: 900
        },

        subtitle: {
            text: graphSubtitle,
            x: -20
        },

        yAxis: {
            title: {
                text: yAxisTitle
            }
        },

        xAxis: {
            title: {
                text: xAxisTitle
            },
            categories: labelArray
        },

        series: [{
            name: seriesName,
            data: seriesArray
        }]
    });
};