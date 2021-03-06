Template.reportsPatients.events({
    'click .icon-arrow_drop_down': function ( event ) {
        $(event.target).parent().find('.reports-patients-filter-results').toggle();
    }
});


Template.reportsPatientsCompany.onCreated( () => {
    var template = Template.instance();

    template.searchCompany = new ReactiveVar();
    template.searchingCompany   = new ReactiveVar( false );

    template.autorun( () => {
        template.subscribe( 'companies.reports.all', template.searchCompany.get(), () => {
            setTimeout( () => {
                template.searchingCompany.set( false );
            }, 300 );
        });
    });
});

Template.reportsPatientsCompany.helpers({
    searching: function() {
        return Template.instance().searchingCompany.get();
    },
    query: function() {
        return Template.instance().searchCompany.get();
    },
    companies() {
        var query = {},
            projection = { limit: 10, sort: { company_name: 1 } };

        if ( Template.instance().searchCompany.get() ) {

            var regex = new RegExp( Template.instance().searchCompany.get(), 'i' );

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

Template.reportsPatientsCompany.events({
    'focus #reports-patients-filter-company': function () {
        var results = $(event.target).parent().find('.reports-patients-filter-results');
        results.show();
    },

    'keyup #reports-patients-filter-company' ( event, template ) {
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
        Session.set('selectedPatientCompany', $(event.target).attr('data-id'));
        $('#reports-patients-filter-company').val($(event.target).text());
        $(event.target).parent().hide();
    },

    'click .js-reports-filter-company-all': function ( event ) {
        Session.set('selectedPatientCompany', null);
        $('#reports-patients-filter-company').val('Show all companies');
        $(event.target).parent().hide();
    }
});


Template.reportsPatientsInsurance.onCreated( () => {
    var template = Template.instance();

    template.searchInsurance = new ReactiveVar();
    template.searchingInsurance   = new ReactiveVar( false );

    template.autorun( () => {
        template.subscribe( 'insurances.reports.all', template.searchInsurance.get(), () => {
            setTimeout( () => {
                template.searchingInsurance.set( false );
            }, 300 );
        });
    });
});

Template.reportsPatientsInsurance.helpers({
    searching: function() {
        return Template.instance().searchingInsurance.get();
    },
    query: function() {
        return Template.instance().searchInsurance.get();
    },
    insurances: function () {

        var query = {},
            projection = { limit: 10, sort: { insurance_name: 1 } };

        if ( Template.instance().searchInsurance.get() ) {

            var regex = new RegExp( Template.instance().searchInsurance.get(), 'i' );

            query = {
                $or: [
                    { insurance_name: regex }
                ]
            };

            projection.limit = 15;
        }

        var insurances = Insurances.find( query, projection );

        if ( insurances ) {
            return insurances;
        }
    }
});

Template.reportsPatientsInsurance.events({
    'focus #reports-patients-filter-insurance': function () {
        var results = $(event.target).parent().find('.reports-patients-filter-results');
        results.show();
    },

    'keyup #reports-patients-filter-insurance' ( event, template ) {
        var value = event.target.value.trim();

        if ( value !== '' && event.keyCode === 13 ) {
            template.searchInsurance.set( value );
            template.searchingInsurance.set( true );
        }

        if ( value === '' ) {
            template.searchInsurance.set( value );
        }
    },

    'click .js-reports-filter-insurance': function ( event ) {
        Session.set('selectedPatientInsurance', $(event.target).attr('data-id'));
        $('#reports-patients-filter-insurance').val($(event.target).text());
        $(event.target).parent().hide();
    },

    'click .js-reports-filter-insurance-all': function ( event ) {
        Session.set('selectedPatientInsurance', null);
        $('#reports-patients-filter-insurance').val('Show all insurances');
        $(event.target).parent().hide();
    }
});



Template.reportsPatientsTable.onCreated(function () {

    var template = Template.instance();

    Session.setDefault('selectedPatientCompany', null);
    Session.setDefault('selectedPatientInsurance', null);

    var data = {
        company_id: Session.get('selectedPatientCompany'),
        insurance_id: Session.get('selectedPatientInsurance')
    };

    template.autorun(function () {
        template.subscribe('patients.reports', data);
    });

});

Template.reportsPatientsTable.helpers({
    patients: function () {

        var query = {};

        if ( Session.get('selectedPatientCompany') ) query['company._id'] = Session.get('selectedPatientCompany');
        if ( Session.get('selectedPatientInsurance') ) query['insurance.insurance_id'] = Session.get('selectedPatientInsurance');

        //console.log(Patients.find().fetch());

        return Patients.find( query );
    }
});

