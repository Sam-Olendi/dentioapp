Meteor.publish('companies.all', function () {
   return Companies.find();
});

Meteor.publish('companies.search', function (search) {
    check(search, Match.OneOf(String, null, undefined));

    var query = {},
        projection = { limit: 10 };

    if (search) {
        var regex = new RegExp( search, 'i' );

        query = {
            $or: [
                {'company_name': regex}
            ]
        };

        projection.limit = 20;
    }

    return Patients.find(query, projection);
});