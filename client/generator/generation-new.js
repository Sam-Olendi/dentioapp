Template.generationNew.events({
    'click .js-print-invoice': function () {
        window.print();
    }
});

Template.generationNewHeader.onCreated(function () {
    this.subscribe('generations.compare');
});

Template.generationNewHeader.rendered = function () {
    $('.generator-generation-datepicker').datepicker({dateFormat: 'yy mm dd', maxDate: 0})
};

Template.generationNewHeader.helpers({
    generationNumber: function () {
        var lastGeneration = Generations.findOne({}, { sort: { date_generated: -1 }, fields: { generation_no: 1, date_generated: 1 } });
        if (lastGeneration) return lastGeneration.generation_no + 1;
        return '';
    }
});

Template.generationNewHeader.events({
    'change .generator-generation-datepicker': function () {
        var selectedDate = $('.generator-generation-datepicker').val(),
            momentDate = moment(new Date(selectedDate).toISOString()).format('Do MMMM YYYY');
        $('.generator-generation-datepicker').val(momentDate);
    }
});