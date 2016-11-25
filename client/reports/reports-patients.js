Template.reportsPatientsWeek.onCreated(function () {
    var template = Template.instance();
    template.theDay = new ReactiveVar( moment().format('Do MMM YYYY') );

    template.autorun(function () {
        template.subscribe('appointments.daily.reports', template.theDay.get() );
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