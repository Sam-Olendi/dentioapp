Meteor.methods({
   'AddFinding': function (data) {
       check(data, {
           patient_id: String,
           finding_type: String,
           tooth_number: Number,
           tooth_part: String,
           description: Match.OneOf( String, null, undefined ),
           date_added: String,
           regex: String
       });

       var appointmentId = Appointments.find({patient_id: data.patient_id, status: { $regex: /(Waiting)|(In-Session)/ }, date_created: { $regex: data.regex }}).fetch()[0]._id;

       return Findings.insert({
           patient_id: data.patient_id,
           appointment_id: appointmentId,
           finding_type: data.finding_type,
           tooth_number: data.tooth_number,
           tooth_part: data.tooth_part,
           description: data.description,
           date_added: data.date_added
       });

   }
});