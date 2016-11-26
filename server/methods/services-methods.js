Meteor.methods({
    'AddService': function (data) {
        check (data, {
            service_name: String,
            service_description: String,
            service_price: Number
        });

        return Services.insert(data);
    },

    'EditService': function (data) {
        check (data, {
            _id: String,
            service_name: String,
            service_description: String,
            service_price: Number
        });

        return Services.update(data._id, {
            $set: {
                service_name: data.service_name,
                service_description: data.service_description,
                service_price: data.service_price
            }
        });
    },

    'DeleteService': function (serviceId) {
        check(serviceId, String);

        return Services.remove(serviceId);
    }
});