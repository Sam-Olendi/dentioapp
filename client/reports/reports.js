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
        if ( !$(event.target).hasClass('reports-filter-input') && !$(event.target).hasClass('reports-filter-search-results') && !$(event.target).hasClass('icon-arrow_drop_down') && !$(event.target).hasClass('reports-patients-filter-input') ) {
            $('.reports-filter-search-results').hide();
            $('.reports-patients-filter-results').hide();
            //event.stopPropagation();
        }
    }
});