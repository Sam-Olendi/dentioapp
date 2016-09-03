Meteor.methods({
    'AddGeneratedCompanies': function (companyName) {
        check (companyName, String);
        return Companies.insert({
            company_name: companyName
        });
    }
});