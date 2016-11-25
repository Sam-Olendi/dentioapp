Template.reportsPatientsWeek.onCreated(function () {
    var template = Template.instance();

    template.autorun(function () {
        template.subscribe('appointments.daily.reports', moment().format('Do MMM YYYY') );
    });
});

Template.reportsPatientsWeek.helpers({
    days: function () {
        var theDay = moment(),
            count = 7,
            dailyData = [];

        for ( var i = 0; i < count; i++ ) {

            dailyData[i] = {
                day: theDay.format('dddd'),
                dailyCount: Appointments.find( { date_created: { $regex: theDay.format('Do MMM YYYY') } } ).count()
            };

            theDay = moment().subtract( i + 1, 'days');

        }

        return dailyData.reverse();

    }
});

Template.reportsPatientsMonth.onCreated(function () {
    this.subscribe('appointments.monthly.reports', moment().format('YYYY'));
});

Template.reportsPatientsMonth.helpers({
    months: function () {
        var count = 7,
            monthlyData = [],
            thisMonth = moment();

        for ( var i = 0; i < count; i++ ) {
            monthlyData[i] = {
                month: thisMonth.format('MMMM'),
                monthlyCount: Appointments.find( { date_created: { $regex: thisMonth.format('MMM YYYY') } } ).count()
            };

            thisMonth = moment().subtract( i + 1, 'months');

        }

        return monthlyData.reverse();
    }
});

Template.reportsPatientsTable.onCreated(function () {
    this.subscribe('patients.reports');
});
Template.reportsPatientsTable.helpers({
    patients: function () {
        return Patients.find();
    }
});

