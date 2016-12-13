Session.setDefault('servicesLimit', 10);


function openCloseModal (modalClass, modalContentClass, modalCloseClass) {
    // this function provides the ability to open and close modals
    $(modalClass).addClass('modal-is-active');
    $(modalContentClass).addClass('modal-content-is-active');

    $('.modal-close,' + modalCloseClass).click(function () {
        $('.body-error').hide();
        Session.set('selectedPatientId', undefined);

        $(modalClass).removeClass('modal-is-active');
        $(modalContentClass).removeClass('modal-content-is-active');
    });
}

function closeModal (modalClass, modalContentClass) {
    $('.body-error').hide();
    Session.set('selectedPatientId', undefined);
    $(modalClass).removeClass('modal-is-active');
    $(modalContentClass).removeClass('modal-content-is-active');
}

function validateRequired (inputSelector, regex, errorSelector, message) {
    if ( !$(inputSelector).val().trim().match(regex) ) {
        $(errorSelector).show().text(message);
        return false;
    } else {
        $(errorSelector).hide();
        return true;
    }
}



Template.services.events({
    'click': function () {
        $('.body-search-form-results').hide();
    }
});



Template.servicesNewButton.events({
   'click .js-service-new-trigger': function () {
       openCloseModal('.services-new-modal', '.services-new-modal-content', '.js-cancel-service-new');
   }
});


Template.servicesNewModal.onRendered(function () {

    Template.instance().randomColourCode = new ReactiveVar( randomColor({luminosity: 'random', format: 'hex'}) );

    $('#service-new-form-colour').spectrum({
        allowEmpty: true,
        color: Template.instance().randomColourCode.get(),
        showPaletteOnly: true,
        togglePaletteOnly: true,
        togglePaletteMoreText: 'more',
        togglePaletteLessText: 'less',
        clickoutFiresChange: true,
        showInitial: true,
        showInput: true,
        preferredFormat: "hex",
        palette: [
            randomColor({hue: 'random', luminosity: 'dark', count: 8, format: 'hex'}),
            randomColor({hue: 'random', luminosity: 'dark', count: 8, format: 'hex'}),
            randomColor({hue: 'random', luminosity: 'dark', count: 8, format: 'hex'}),
            randomColor({hue: 'random', luminosity: 'dark', count: 8, format: 'hex'}),
            randomColor({hue: 'random', luminosity: 'light', count: 8, format: 'hex'}),
            randomColor({hue: 'random', luminosity: 'light', count: 8, format: 'hex'}),
            randomColor({hue: 'random', luminosity: 'light', count: 8, format: 'hex'}),
            randomColor({hue: 'random', luminosity: 'light', count: 8, format: 'hex'})
        ]
    });
});

Template.servicesNewModal.events({
    'submit #services-new-modal': function (event) {
        event.preventDefault();

        var nameRegex = /[A-Za-z]+/gm,
            priceRegex = /(?:\d*\.)?\d+/g,
            validateName = validateRequired('#service-new-form-name', nameRegex,'.js-error-service-name', 'Please enter a name for your service'),
            validatePrice = validateRequired('#service-new-form-price', priceRegex,'.js-error-service-price', 'Please enter a price for your service'),
            serviceColour;

        if ( !$('#service-new-form-colour').val() ){
            serviceColour = Template.instance().randomColourCode.get();
        } else {
            serviceColour = $('#service-new-form-colour').val();
        }

        if ( validateName && validatePrice ) {

            Meteor.call('AddService', {
                service_name: $('#service-new-form-name').val().trim(),
                service_description: $('#service-new-form-description').val().trim(),
                service_price: parseInt($('#service-new-form-price').val().trim(), 10),
                service_color: serviceColour
            });

            closeModal('.services-new-modal', '.services-new-modal-content');

        } else {
            alert('Oh no. Seems like your form isn\'t filled correctly. Please correct the errors');
        }

    }
});



Template.servicesSearch.onCreated(function () {
    var self = this;

    self.autorun(function () {
        self.subscribe('services', Session.get('servicesLimit'));
    });
});

Template.servicesSearch.helpers({
    servicesIndex: function () {
        return ServicesIndex;
    }
});

Template.servicesSearch.events({
    'click .body-search': function (event) {
        event.stopPropagation();
    },

    'keyup input': function () {
        $('.body-search-form-results').show();
    },

    'mouseenter .body-search-result': function (event) {
        Session.set('selectedServiceId', $(event.target).data('id'));
    },

    'click .js-service-trigger-view': function (event) {
        event.preventDefault();
        openCloseModal('.services-view-modal', '.services-view-modal-content', '.js-cancel-service-view')
    }
});



Template.servicesContent.onCreated(function () {
    var self = Template.instance();

    self.autorun(function () {
        self.subscribe('services', Session.get('servicesLimit'));
    });
});

Template.servicesContent.helpers({
    servicesFound: function () {
        // return patients with the set limit
        return Services.find({}, {limit: Session.get('servicesLimit')}).fetch().length;
    }
});

Template.servicesContent.events({
    'click .js-services-show-more': function (event) {
        event.preventDefault();
        Session.set('servicesLimit', Session.get('servicesLimit') + 10);
    }
});



Template.servicesTableRow.helpers({
   services: function () {
       return Services.find({}, { sort: { service_name: 1 }, limit: Session.get('servicesLimit') });
   }
});

Template.servicesTableRow.events({
    'mouseenter .services-table-row': function () {
        Session.set('selectedServiceId', $(event.target).data('id'));
    },

    'click .js-services-trigger-edit': function (event) {
        event.preventDefault();
        openCloseModal('.services-edit-modal', '.services-edit-modal-content', '.js-cancel-service-edit');
    },

    'click .js-services-trigger-delete': function (event) {
        event.preventDefault();
        openCloseModal('.services-delete-modal', '.services-delete-modal-content', '.js-cancel-service-delete');
    },

    'click .js-service-trigger-view': function (event) {
        event.preventDefault();
        openCloseModal('.services-view-modal', '.services-view-modal-content', '.js-cancel-service-view')
    }
});



Template.servicesViewModal.helpers({
    service: function () {
        return Services.findOne({_id: Session.get('selectedServiceId')});
    }
});

Template.servicesViewModal.events({
    'click .js-services-trigger-edit': function () {
        closeModal('.services-view-modal', '.services-view-modal-content');
        openCloseModal('.services-edit-modal', '.services-edit-modal-content', '.js-cancel-service-edit');
    }
});



Template.servicesEditModal.helpers({
    service: function () {
        return Services.findOne({_id: Session.get('selectedServiceId')});
    }
});

Template.servicesEditModal.events({
    'submit #service-edit-form': function (event) {
        event.preventDefault();

        var nameRegex = /[A-Za-z]+/gm,
            priceRegex = /(?:\d*\.)?\d+/g,
            validateName = validateRequired('#service-edit-form-name', nameRegex,'.js-error-service-name', 'Please enter a name for your service'),
            validatePrice = validateRequired('#service-edit-form-price', priceRegex,'.js-error-service-price', 'Please enter a price for your service');

        if ( validateName && validatePrice ) {

            Meteor.call('EditService', {
                _id: Session.get('selectedServiceId'),
                service_name: $('#service-edit-form-name').val().trim(),
                service_description: $('#service-edit-form-description').val().trim(),
                service_price: parseInt($('#service-edit-form-price').val().trim(), 10)
            });

            closeModal('.services-edit-modal', '.services-edit-modal-content');

        } else {
            alert('Oh no. Seems like your form isn\'t filled correctly. Please correct the errors');
        }
    }
});



Template.servicesDeleteModal.events({
    'click .js-service-delete': function () {
        Meteor.call('DeleteService', Session.get('selectedServiceId'));
        closeModal('.services-delete-modal', '.services-delete-modal-content');
    }
});