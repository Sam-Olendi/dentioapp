function openCloseModal (modalClass, modalContentClass, modalCloseClass) {
    // this function provides the ability to open and close modals
    $(modalClass).addClass('modal-is-active');
    $(modalContentClass).addClass('modal-content-is-active');

    $('.modal-close,' + modalCloseClass).click(function () {
        $('.body-error').hide();

        $(modalClass).removeClass('modal-is-active');
        $(modalContentClass).removeClass('modal-content-is-active');
    });
}

Template.patientHeaderTitle.events({
    'click .single-patient-settings-gear': function (event) {
        event.preventDefault();
        $('.single-patient-settings-gear').toggleClass('single-patient-settings-gear-is-active', 100);
        $('.single-patient-settings-options').fadeToggle(100);
    },

    'click .js-single-patient-settings-delete': function () {
        openCloseModal('.patient-delete-modal', '.patient-delete-modal-content', '.js-cancel-patient-delete');
    }
});

Template.patientDeleteModal.events({
    'click .js-patient-delete': function () {
        Meteor.call('DeletePatient', $(event.target).data('id'));
        Router.go('/patients');
    }
});

Template.patientContent.events({
    'click .single-patient-tabs': function () {
        /*
         Tab functionality
         More details: https://codyhouse.co/gem/responsive-tabbed-navigation/
         */
        var tabs = $('.js-body-flesh-patients-single');

        tabs.each(function () {
            var tab = $(this),
                tabItems = tab.find('.single-patient-tabs'),
                tabContentWrapper = tab.children('.single-patient-details');

            tab.on('click', '.single-patient-tab-item', function (event) {
                event.preventDefault();
                var selectedItem = $(this);

                if ( !selectedItem.hasClass('single-patient-tab-item-is-selected') ) {
                    var selectedTab = selectedItem.data('content'),
                        selectedContent = tabContentWrapper.find('li[data-content="' + selectedTab + '"]'),
                        selectedContentHeight = selectedContent.innerHeight();

                    tabItems.find('.single-patient-tab-item-is-selected').removeClass('single-patient-tab-item-is-selected');
                    selectedItem.addClass('single-patient-tab-item-is-selected');
                    selectedContent.addClass('single-patient-details-tab-is-selected').siblings('li').removeClass('single-patient-details-tab-is-selected');
                    tabContentWrapper.animate({
                        'height': selectedContentHeight
                    }, 200);
                }
            });
        });
    }
});