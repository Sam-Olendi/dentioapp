Session.setDefault('generationsLimit', 10);

Template.generatorTable.onCreated(function () {
    var self = this;
    self.autorun(function () {
       self.subscribe('generations.all', Session.get('generationsLimit'));
    });
});

Template.generatorTable.helpers({
    generationsFound: function () {
        return Generations.find({}, { limit: Session.get('generationsLimit') }).fetch();
    }
});

Template.generatorTable.events({
   'click .js-show-more-generations': function () {
       Session.set('generationsLimit', Session.get('generationsLimit') + 10);
   }
});

Template.generatorRows.helpers({
    generations: function () {
        return Generations.find({}, { limit: Session.get('generationsLimit') });
    }
});