Template.reportsInvoices.events({
    'focus .reports-filter-input': function (event) {
        var results = $(event.target).parent().find('.reports-filter-search-results');
        results.show();
    }
});



Template.reportsInvoicesCompany.onCreated( function () {
    var template = Template.instance();

    template.companySearch = new ReactiveVar(); // company search query
    template.searchingCompany = new ReactiveVar( false ); // searching...

    template.autorun( function () {
        template.subscribe( 'companies.reports.all', template.companySearch.get(), function () {
            // onReady callback (after result returns from server)
            setTimeout(function () {
                template.searchingCompany.set( false );
            }, 300 );
        });
    } );
});

Template.reportsInvoicesCompany.helpers({
    searching: function () {
        return Template.instance().searchingCompany.get();
    },

    query: function () {
        return Template.instance().companySearch.get();
    },

    companies: function () {

        var query = {},
            projection = { limit: 10, sort: { company_name: 1 } };

        if ( Template.instance().companySearch.get() ) {

            var regex = new RegExp( Template.instance().companySearch.get(), 'i' );

            query = {
                $or: [
                    { company_name: regex }
                ]
            };

            projection.limit = 15;
        }

        var companies = Companies.find( query, projection );
        if ( companies ) return companies;
    }
});

Template.reportsInvoicesCompany.events({
    'click .icon-arrow_drop_down': function ( event ) {
        $(event.target).parent().find('.reports-filter-search-results').toggle();
    },

    'keyup #reports-filter-company': function ( event, template ) {
        var value = event.target.value.trim();

        if ( value !== '' && event.keyCode === 13 ) {
            template.companySearch.set( value );
            template.searchingCompany.set( true );
        }

        if ( value === '' ) {
            template.companySearch.set( value );
        }
    },

    'click .js-reports-filter-company': function ( event ) {
        var companyId = $(event.target).attr('data-id');
        Session.set('selectedCompany', companyId);
        $('#reports-filter-company').val($(event.target).text());
        $(event.target).parent().hide();
    },

    'click .js-reports-filter-company-all': function () {
        Session.set('selectedCompany', null);
        $('#reports-filter-company').val('Show all companies');
        $(event.target).parent().hide();
    },

    'click .js-reports-filter-company-private': function () {
        var companyId = $(event.target).attr('data-id');
        Session.set('selectedCompany', companyId);
        $('#reports-filter-company').val($(event.target).text());
    }
});



Template.reportsInvoicesInsurance.onCreated( function () {
    var template = Template.instance();

    template.insuranceSearch = new ReactiveVar();
    template.searchingInsurance = new ReactiveVar( false );

    template.autorun(function () {
        template.subscribe( 'insurances.reports.all', template.insuranceSearch.get(), function () {
            setTimeout(function () {
                template.searchingInsurance.set( false );
            }, 300);
        } );
    });
} );

Template.reportsInvoicesInsurance.helpers({
    searching: function () {
        return Template.instance().searchingInsurance.get();
    },

    query: function () {
        return Template.instance().insuranceSearch.get();
    },

    insurances: function () {
        var query = {},
            projection = { limit: 10, sort: { insurance_name: 1 } };

        if ( Template.instance().insuranceSearch.get() ) {

            var regex = new RegExp( Template.instance().insuranceSearch.get(), 'i' );

            query = {
                $or: [
                    { insurance_name: regex }
                ]
            };

            projection.limit = 15;
        }

        return Insurances.find( query, projection );
    }
});

Template.reportsInvoicesInsurance.events({
    'click .icon-arrow_drop_down': function ( event ) {
        $(event.target).parent().find('.reports-filter-search-results').toggle();
    },

    'keyup #reports-filter-insurance': function ( event, template ) {

        var value = event.target.value.trim();

        if ( value !== '' && event.keyCode === 13 ) {
            template.insuranceSearch.set( value );
            template.searchingInsurance.set( true );
        }

        if ( value === '' ) template.insuranceSearch.set( value );

    },

    'click .js-reports-filter-insurance': function ( event ) {
        var insuranceId = $(event.target).attr('data-id');
        Session.set('selectedInsurance', insuranceId);
        $('#reports-filter-insurance').val($(event.target).text());
        $(event.target).parent().hide();
    },

    'click .js-reports-filter-insurance-all': function () {
        Session.set('selectedInsurance', null);
        $('#reports-filter-insurance').val('Show all insurances');
        $(event.target).parent().hide();
    }
});



Template.reportsInvoicesDate.rendered = function () {
    //$('#reports-filter-date').datepicker({
    //    dateFormat: 'yy mm dd',
    //    maxDate: 0,
    //    changeMonth: true,
    //    changeYear: true
    //});

    var dateFormat = "mm/dd/yy",
        from = $( "#reports-filter-date" )
            .datepicker({
                //defaultDate: "+1w",
                dateFormat: 'yy mm dd',
                changeMonth: true,
                changeYear: true,
                maxDate: 0
            }),
        to = $( "#reports-filter-date-to" ).datepicker({
            dateFormat: 'yy mm dd',
            changeMonth: true,
            changeYear: true,
            maxDate: 0
        });
};

Template.reportsInvoicesDate.events({
    'change #reports-filter-date': function (event) {
        var selectedDay = moment(new Date(event.target.value).toISOString()).format('Do MMM YYYY');
        Session.set('selectedDate', selectedDay);
        event.target.value = selectedDay;
    }
});



Template.reportsInvoicesPatients.onCreated(function () {
    var template = Template.instance();

    template.patientSearch = new ReactiveVar();
    template.searchingPatient = new ReactiveVar( false );

    template.autorun(function () {
        template.subscribe('patients.reports.search', template.patientSearch.get(), function () {
            setTimeout(function () {
                template.searchingPatient.set( false );
            }, 300);
        });
    });

});

Template.reportsInvoicesPatients.helpers({
    searching: function () {
        return Template.instance().searchingPatient.get();
    },

    query: function () {
        return Template.instance().patientSearch.get();
    },

    patients: function () {

        var query = {},
            projection = { limit: 10, sort: { 'profile.surname': 1 } };

        if ( Template.instance().patientSearch.get() ) {

            var regex = new RegExp( Template.instance().patientSearch.get(), 'i' );

            query = {
                $or: [
                    { 'profile.first_name': regex },
                    { 'profile.middle_name': regex },
                    { 'profile.surname': regex }
                ]
            };

            projection.limit = 100;

        }

        return Patients.find( query, projection );
    }
});

Template.reportsInvoicesPatients.events({
    'click .icon-arrow_drop_down': function ( event ) {
        $(event.target).parent().find('.reports-filter-search-results').toggle();
    },

    'keyup #reports-filter-patients': function ( event, template ) {
        var value = event.target.value.trim();

        if ( value !== '' && event.keyCode === 13 ) {
            template.patientSearch.set( value );
            template.searchingPatient.set( true );
        }

        if ( value === '' ) template.patientSearch.set( value );
    },

    'click .js-reports-filter-patient': function ( event ) {
        var patientId = $(event.target).attr('data-id');
        Session.set('selectedPatient', patientId);
        $('#reports-filter-patients').val($(event.target).text());
        $(event.target).parent().hide();
    },

    'click .js-reports-filter-patients-all': function () {
        Session.set('selectedPatient', null);
        $('#reports-filter-patients').val('Show all patients');
        $(event.target).parent().hide();
    }
});



Template.reportsInvoicesTable.onCreated(function () {
    Session.setDefault('selectedCompany', null);
    Session.setDefault('selectedInsurance', null);
    Session.setDefault('selectedDate', null);
    Session.setDefault('selectedPatient', null);

    var template = Template.instance();

    var data = {
        company_id: Session.get('selectedCompany'),
        insurance_id: Session.get('selectedInsurance'),
        date_issued: Session.get('selectedDate'),
        patient_id: Session.get('selectedPatient')
    };

    template.autorun(function () {
        template.subscribe('invoices.reports.all', data);
    });

});

Template.reportsInvoicesTable.helpers({
    invoices: function () {
        var query = {};

        if ( Session.get('selectedCompany') ) query[ 'company_id' ] = Session.get('selectedCompany');
        if ( Session.get('selectedInsurance') ) query[ 'insurance_id' ] = Session.get('selectedInsurance');
        if ( Session.get('selectedDate') ) query[ 'date_issued' ] = Session.get('selectedDate');
        if ( Session.get('selectedPatient') ) query[ 'patient_id' ] = Session.get('selectedPatient');

        return Invoices.find( query, { sort: { invoice_no: -1 } } );
    }
});