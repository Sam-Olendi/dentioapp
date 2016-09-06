Meteor.methods({
   'AddGeneration': function (data) {

       check(data, {
           generation_no: Number,
           appointment_id: null,
           patient_id: String,
           company_id: Match.OneOf(String, null, undefined),
           postal_address: String,
           vat: Number,
           final_amount: Number,
           date_generated: String
       });

       return Generations.insert(data);

   },

    'DeleteGeneration': function (generationId) {
        check (generationId, String);

        var generationNo = Generations.findOne({_id: generationId}).generation_no;

        Treatments.remove({generation_no: generationNo});
        return Generations.remove(generationId);
    }
});