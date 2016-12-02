Template.reportsCashCompany.onCreated(function () {
    var template = Template.instance();
    template.searchCompany = new ReactiveVar();
    template.searchingCompany = new ReactiveVar( false );

    template.autorun(function () {
        template.subscribe('companies.reports.all', template.searchCompany.get(), function () {
            setTimeout(function () {
                template.searchingCompany.set( false );
            }, 300);
        });
    });
});

Template.reportsCashCompany.helpers({
    searching: function () {
        return Template.instance().searchingCompany.get();
    },

    query: function () {
        return Template.instance().searchCompany.get();
    },

    results: function () {
        return Companies.find();
    }
});

Template.reportsCashCompany.events({
    'focus #reports-cash-filter-company': function ( event ) {
        $(event.target).parent().find('.reports-cash-filter-results').show();
    },

    'keyup #reports-cash-filter-company': function ( event, template ) {
        var value = event.target.value.trim();

        if ( value !== '' && event.keyCode === 13 ) {
            template.searchCompany.set( value );
            template.searchingCompany.set( true );
        }

        if ( value === '' ) {
            template.searchCompany.set( value );
        }
    },

    'click .js-reports-filter-company': function ( event ) {
        Session.set('selectedCashCompany', $( event.target ).attr( 'data-id' ));
        $('#reports-cash-filter-company').val( $( event.target ).text() );
        $( event.target ).parent().hide();
    },

    'click .js-reports-filter-company-all': function (event) {
        Session.set('selectedCashCompany', null);
        $('#reports-cash-filter-company').val('Show all companies');
        $( event.target ).parent().hide();
    }
});


Template.reportsCashInsurance.onCreated(function () {
    var template = Template.instance();
    template.searchInsurance = new ReactiveVar();
    template.searchingInsurance = new ReactiveVar( false );

    template.autorun(function () {
        template.subscribe('insurances.reports.all', template.searchInsurance.get(), function () {
            setTimeout(function () {
                template.searchingInsurance.set( false );
            }, 300);
        });
    });
});

Template.reportsCashInsurance.helpers({
    searching: function () {
        return Template.instance().searchingInsurance.get();
    },

    query: function () {
        return Template.instance().searchInsurance.get();
    },

    results: function () {
        return Insurances.find();
    }
});

Template.reportsCashInsurance.events({
    'focus #reports-cash-filter-insurance': function ( event ) {
        $(event.target).parent().find('.reports-cash-filter-results').show();
    },

    'keyup #reports-cash-filter-insurance': function ( event, template ) {
        var value = event.target.value.trim();

        if ( value !== '' && event.keyCode === 13 ) {
            template.searchInsurance.set( value );
            template.searchingInsurance.set( true );
        }

        if ( value === '' ) {
            template.searchInsurance.set( value );
        }
    },

    'click .js-reports-filter-insurance': function () {
        Session.set('selectedCashInsurance', $( event.target ).attr('data-id'));
        $('#reports-cash-filter-insurance').val( $( event.target ).text() );
        $( event.target ).parent().hide();
    },

    'click .js-reports-filter-insurance-all': function (event) {
        Session.set('selectedCashInsurance', null);
        $('#reports-cash-filter-insurance').val('Show all insurances');
        $( event.target ).parent().hide();
    }
});



Template.reportsCashPatient.onCreated(function () {
    var template = Template.instance();
    template.searchPatient = new ReactiveVar();
    template.searchingPatient = new ReactiveVar( false );

    template.autorun(function () {
        template.subscribe('patients.reports.search', template.searchPatient.get(), function () {
            setTimeout(function () {
                template.searchingPatient.set( false );
            }, 300);
        });
    });
});

Template.reportsCashPatient.helpers({
    searching: function () {
        return Template.instance().searchingPatient.get();
    },

    query: function () {
        return Template.instance().searchPatient.get();
    },

    results: function () {
        return Patients.find();
    }
});

Template.reportsCashPatient.events({
    'focus #reports-cash-filter-patients': function ( event ) {
        $(event.target).parent().find('.reports-cash-filter-results').show();
    },

    'keyup #reports-cash-filter-patients': function ( event, template ) {
        var value = event.target.value.trim();

        if ( value !== '' && event.keyCode === 13 ) {
            template.searchPatient.set( value );
            template.searchingPatient.set( true );
        }

        if ( value === '' ) {
            template.searchPatient.set( value );
        }
    }
});


Template.reportsCashTable.onCreated(function () {
    var template = Template.instance();

    Session.setDefault('selectedCashCompany', null);
    Session.setDefault('selectedCashInsurance', null);

    template.autorun(function () {
        template.subscribe('treatments.reports');
    });
});

Template.reportsCashTable.helpers({
    treatments: function () {

        var data = {
            company_id: Session.get('selectedCashCompany'),
            insurance_id: Session.get('selectedCashInsurance')
        };

        Meteor.call('getTreatments', data, function (error, response) {
            if ( error ) {
                alert( error.reason )
            } else {
                console.log(response);
                Session.set('getTreatments', response);
            }
        });

        return Session.get('getTreatments');

    }
});