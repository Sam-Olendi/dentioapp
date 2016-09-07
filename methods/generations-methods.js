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

    'UpdateGeneration': function (data) {

        check(data, {
            generation_id: String,
            generation_no: Number,
            patient_id: String,
            company_id: String,
            postal_address: String,
            vat: Number,
            date_generated: String
        });

        return Generations.update(data.generation_id, {
            $set: {
                generation_no: data.generation_no,
                patient_id: data.patient_id,
                company_id: data.company_id,
                postal_address: data.postal_address,
                vat: data.vat,
                date_generated: data.generation_no
            }
        });

    },

    'DeleteGeneration': function (generationId) {
        check (generationId, String);

        var generationNo = Generations.findOne({_id: generationId}).generation_no;

        Treatments.remove({generation_no: generationNo});
        return Generations.remove(generationId);
    }
});