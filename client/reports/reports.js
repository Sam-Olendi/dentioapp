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



Template.reportsInvoices.rendered = function () {
  $('#reports-filter-date').datepicker({
      dateFormat: 'dd/mm/yy'
  });
};



Template.reportsInvoicesCompany.onCreated( function () {
    var template = Template.instance();

    template.companySearch = new ReactiveVar(); // company search query
    template.searchingCompany = new ReactiveVar( false ); // searching...

    template.autorun( function () {
        template.subscribe( 'companies.reports.all', template.companySearch.get(), function () {
            // onReady callback (after result returns from server)
            setTimeout( function () {
                template.searchingCompany.set( false );
            }, 300 )
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
    'keyup #reports-filter-company': function ( event, template ) {
        var value = event.target.value.trim();

        if ( value !== '' && event.keyCode === 13 ) {
            template.companySearch.set( value );
            template.searchingCompany.set( true );
        }

        if ( value === '' ) {
            template.companySearch.set( value );
        }
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

    }
});


Template.reportsInvoicesTable.onCreated(function () {
    this.subscribe('invoices.reports.all');
});

Template.reportsInvoices.events({
    'focus .reports-filter-input': function (event) {
        var results = $(event.target).parent().find('.reports-filter-search-results');
        results.show();
    }
});



Template.reportsInvoicesTable.helpers({
    invoices: function () {
        return Invoices.find();
    }
});