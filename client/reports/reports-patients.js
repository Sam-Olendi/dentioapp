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
        var companies = Companies.find();
        if ( companies ) {
            return companies;
        }
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
        var insurances = Insurances.find();
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
    }
});



Template.reportsPatientsTable.onCreated(function () {

    var template = Template.instance();

    Session.setDefault('selectedPatientCompany', null);

    var data = {
        company_id: Session.get('selectedPatientCompany')
    };

    template.autorun(function () {
        template.subscribe('patients.reports', data);
    });

});

Template.reportsPatientsTable.helpers({
    patients: function () {

        var query = {};

        if ( Session.get('selectedPatientCompany') ) query['company._id'] = Session.get('selectedPatientCompany');

        //console.log(Patients.find( query ).fetch());

        return Patients.find( query );
    }
});

