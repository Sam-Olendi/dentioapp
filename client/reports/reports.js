Template.reportsContent.onCreated(function () {
    this.subscribe( 'invoices.reports.total' );
    this.subscribe('appointments.day.patients');
});

Template.reportsContent.helpers({
    totalAmount: function () {
        var todaysDate = new RegExp( moment().format('Do MMM YYYY') );
        var todaysInvoices = Invoices.find( { date_issued: { $regex: todaysDate } }, { fields: { amount: 1, date_issued: 1 } }).fetch();
        var count = todaysInvoices.length,
            amount = 0;

        if ( count ) {

            for ( var i = 0; i < count; i++ ) {

                amount += todaysInvoices[i].amount;

            }

        }

        return amount;
    },

    daysPatients: function () {
        var todaysDate = new RegExp( moment().format('Do MMM YYYY') );

        return Appointments.find({
            date_created: { $regex: todaysDate }
        }, { fields: { date_created: 1 } }).count();
    }
});

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