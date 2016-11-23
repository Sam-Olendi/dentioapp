Meteor.publish( 'insurances.reports.all', function (search) {

    check( search, Match.OneOf( String, null, undefined ) );

    var query = {},
        projection = { limit: 10, sort: { insurance_name: 1 } };

    if ( search ) {

        var regex = new RegExp( search, 'i' );

        query = {
            $or: [
                { insurance_name: regex }
            ]
        };

        projection.limit = 15;
    }

    return Insurances.find( query, projection );

} );