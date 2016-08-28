Meteor.publish('patients.appointments.search', function (search) {
    check(search, Match.OneOf(String, null, undefined));

    var query = {},
        projection = { limit: 10, sort: { 'profile.surname': 1 }, fields: { 'profile.first_name': 1, 'profile.middle_name': 1, 'profile.surname': 1 } };

    if (search) {
        var regex = new RegExp( search, 'i' );

        query = {
            $or: [
                {'profile.first_name': regex},
                {'profile.middle_name': regex},
                {'profile.surname': regex}
            ]
        };

        projection.limit = 20;
    }

   return Patients.find(query, projection);
});

Meteor.publish('patients.appointments', function (entry) {
    check(entry, Match.OneOf(String, null, undefined));
    return Patients.find({_id: entry}, { fields: {'profile.first_name': 1, 'profile.middle_name': 1, 'profile.surname': 1} });
});