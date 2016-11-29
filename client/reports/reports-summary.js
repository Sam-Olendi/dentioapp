var Highcharts = require('highcharts/highstock');
require('highcharts/modules/exporting')(Highcharts);

Template.reportsSummary.onCreated(function () {
    var template = Template.instance();
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

Template.reportsSummaryGraphs.onRendered(function () {

    //$('#container').highcharts({
    //    chart: {
    //        type: 'bar'
    //    },
    //
    //    title: {
    //        text: 'Voting Results. Bluergh!'
    //    },
    //
    //    xAxis: {
    //        //       type: 'linear',
    //        categories: ['Option One', 'Option Two', 'Option Three'],
    //    },
    //
    //    yAxis: {
    //
    //    },
    //
    //    series: [{
    //        name: 'Votes',
    //        data: [1, 2, 3],
    //        color: 'rgb(214, 53, 53)'
    //
    //    }]
    //
    //});
});

Template.reportsSummaryWeeksAppointments.onRendered(function () {

    Session.setDefault('appointmentsPeriod', 'week');

    $('#reports-summary-appointments-select').change(function () {
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

            for ( var y = 0; y < 6; y++ ) {
                years[y] = moment().subtract( y, 'years').format('YYYY');
                yearlyCount.push(Appointments.find( { date_created: { $regex: moment().subtract( y, 'years').format('YYYY') } } ).count());
            }

            plotGraph('#report-week-appointments', 'Last Year', 'Last 12 months in appointments', 'No. of Appointments', 'Years', years.reverse(), yearlyCount.reverse(), 'Appointments');

        }

    });
});

Template.reportsSummaryWeeksCash.onRendered(function () {

    Session.setDefault('cashFlowPeriod', 'week');

    $('#reports-summary-cash-select').change(function () {
        Session.set('cashFlowPeriod', $(this).val());
    });

    this.autorun(function () {

        if ( Session.get('cashFlowPeriod') == 'quarter' ) {

            var months = [], monthlyIncome = [], theMonth = [];

            for ( var q = 0; q < 4; q++ ) {
                months[q] = moment().subtract( q, 'months').format( 'MMMM' );
                theMonth[q] = moment().subtract( q, 'months' ).format('MMM YYYY');
            }

            for ( var r = 0; r < theMonth.length; r++ ) {
                Meteor.call('getDailyTotal', theMonth[r], function (error, response) {
                    if ( error ) {
                        alert(error.reason)
                    } else {
                        if ( response[0] ) {
                            monthlyIncome.unshift(response[0].total);
                        } else {
                            monthlyIncome.unshift(0);
                        }
                    }
                });
            }

            //new Chartist.Line('#report-week-cash', {
            //    labels: months.reverse(),
            //    series: [
            //        monthlyIncome
            //    ]
            //}, {
            //    height: 300,
            //    width: 900,
            //    low: 0,
            //    showArea: true
            //});

            new Chartist.Line('#report-week-cash', {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                series: [
                    [12, 9, 7, 8, 5],
                    [2, 1, 3.5, 7, 3],
                    [1, 3, 4, 5, 6]
                ]
            }, {
                fullWidth: true,
                chartPadding: {
                    right: 40
                }
            });


        } else if ( Session.get('cashFlowPeriod') == 'week' ) {

            var days = [], dailyIncome = [], theDay = [];

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

            //console.log(dailyIncome);

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