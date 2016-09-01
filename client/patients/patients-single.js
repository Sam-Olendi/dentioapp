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

Template.patientFilesButton.events({
    'click .js-main-attach-files-trigger': function () {
        openCloseModal('.main-attach-files-modal', '.main-attach-files-modal-content', '.js-close-main-attach-files');
    }
});


Template.attachFilesModalUploadSection.onCreated(function () {
    this.currentUpload = new ReactiveVar(false);
});

Template.attachFilesModalUploadSection.helpers({
    currentUpload: function () {
        return Template.instance().currentUpload.get();
    }
});

Template.attachFilesModalUploadSection.events({
    'change #main-attach-files-modal-input': function (event, template) {

        var file = event.currentTarget.files;

        if (file && file[0]) {

            var upload = Images.insert({
                file: file[0],
                streams: 'dynamic',
                chunkSize: 'dynamic',
                meta: {
                    patient_id: Session.get('currentPatient'),
                    date_uploaded: new Date().toISOString()
                }
            }, false);

            upload.on('start', function () {
                template.currentUpload.set(this);
            });

            upload.on('end', function (error, fileObj) {
                if (error) {
                    $('.modal-content-uploading-text-error').text(error);
                    $('.modal-content-error').show().delay(7000).fadeOut();
                } else {
                    $('.modal-content-uploading-text-success').html('<span class="modal-content-uploading-filename">'+ fileObj.name +'</span> has successfully been uploaded')
                    $('.modal-content-success').show().delay(5000).fadeOut();
                }
                template.currentUpload.set(false);
            });

            upload.start();

        }
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