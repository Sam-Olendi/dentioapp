Meteor.methods({
   'AddGeneration': function (data) {

       check(data, {
           generation_no: Number,
           patient_id: String,
           postal_address: String,
           vat: Number,
           final_amount: Number,
           date_generated: String
       });

       return Generations.insert(data);

   }
});