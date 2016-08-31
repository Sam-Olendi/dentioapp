Meteor.methods({
   'singlePatientAddSex': function (data) {
       check (data, {
           _id: String,
           profile: {
               sex: String
           }
       });

       return Patients.update(data._id, {
           $set: {
               'profile.sex' : data.profile.sex
           }
       })
   }
});