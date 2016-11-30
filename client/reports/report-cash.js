Template.reportsCashTable.onCreated(function () {
    this.subscribe('treatments.reports');
});

Template.reportsCashTable.helpers({
    treatments: function () {

        Meteor.call('getTreatments', function (error, response) {
            if ( error ) {
                alert( error.reason )
            } else {
                Session.set('getTreatments', response);
                //console.log(Session.get('getTreatments'));
            }
        });

        return Session.get('getTreatments');

    }
});