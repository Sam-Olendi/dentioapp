Template.reportsContent.events({
    'click .reports-tabs': function () {
        /*
         Tab functionality
         More details: https://codyhouse.co/gem/responsive-tabbed-navigation/
         */

        var tabs = $('.body-flesh');
        tabs.each(function () {
            var tab = $(this),
                tabItems = tab.find('.reports-tabs'),
                tabContentWrapper = tab.children('.reports-tabs-content');


            tab.on('click', '.reports-tabs-link', function (event) {
                event.preventDefault();
                var selectedItem = $(this);

                if ( !selectedItem.hasClass('reports-tabs-link-is-selected') ) {
                    var selectedTab = selectedItem.data('content'),
                        selectedContent = tabContentWrapper.find('li[data-content="'+ selectedTab +'"]'),
                        selectedContentHeight = selectedContent.innerHeight();

                    tabItems.find('.reports-tabs-link-is-selected').removeClass('reports-tabs-link-is-selected');
                    selectedItem.addClass('reports-tabs-link-is-selected');
                    selectedContent.addClass('reports-tabs-content-section-is-selected').siblings('li').removeClass('reports-tabs-content-section-is-selected');
                    tabContentWrapper.animate({
                        'height': selectedContentHeight
                    }, 200);
                }
            });

        });

    },

    'click': function ( event ) {
        if ( !$(event.target).hasClass('reports-filter-input') && !$(event.target).hasClass('reports-filter-search-results') && !$(event.target).hasClass('icon-arrow_drop_down') ) {
            $('.reports-filter-search-results').hide();
            //event.stopPropagation();
        }
    }
});



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
            template.searchingCompany.set( false );
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
        var companies = Companies.find();
        if ( companies ) return companies;
    }
});

Template.reportsInvoicesCompany.events({
    'click .icon-arrow_drop_down': function ( event ) {
        $(event.target).parent().find('.reports-filter-search-results').toggle();
    },

    'keyup #reports-filter-company': function ( event, template ) {
        var value = event.target.value.trim();

        if ( value !== '' ) {
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
        return Insurances.find();
    }
});

Template.reportsInvoicesInsurance.events({
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
    }
});



Template.reportsInvoicesDate.rendered = function () {
    $('#reports-filter-date').datepicker({
        dateFormat: 'yy mm dd',
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
        template.subscribe( 'patients.search', template.patientSearch.get(), function () {
            setTimeout(function () {
                template.searchingPatient.set( false );
            }, 300);
        } )
    } );
});

Template.reportsInvoicesPatients.helpers({
    searching: function () {
        return Template.instance().searchingPatient.get();
    },

    query: function () {
        return Template.instance().patientSearch.get();
    },

    patients: function () {
        return Patients.find();
    }
});

Template.reportsInvoicesPatients.events({
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

        return Invoices.find( query, { sort: { invoice_no: 1 } } );
    }
});