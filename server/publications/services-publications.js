Meteor.publish('services', function (limit) {
    check (limit, Number);
    return Services.find({}, { sort: { service_name: 1 }, limit: limit });
});

Meteor.publish('services.all', function () {
    return Services.find({'service_name': {$ne: 'Consultation'}}, {sort: {service_name: 1}});
});

Meteor.publish('services.list', function () {
    return Services.find({}, {sort: {service_name: 1}});
});