import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
  validations: {
    "model.def": {
      generic: true,
      definitionlike: true,
    },
    "model.example": {
      generic: true,
      nongendered: true,
      sentencelike: true,
    }
  },
  actions: {
    submitProposal() {
      var _this = this;
      var proposal = this.get("model");
      proposal.set("type", "MeaningChange");

      proposal.save().then(function() {
        _this.get("targetObject").set("editing", false);
        // _this.set("meaning.hasProposal", true);
        // _this.set("meaning.openProposal", _this.get("model"));
        _this.tracker.log("proposal", "meaning change");
      },
      function(errors) {
        _this.set("errors", errors.errors);
      });
    },
    proposeMeaningRemoval() {
      var _this = this;
      var proposal = this.store.createRecord('proposal', {
                            type: "MeaningRemoval",
                            meaning: this.get("model.meaning")
                        });
      proposal.save().then(function() {
        _this.get("targetObject").set("editing", false);
        _this.set("model.meaning.hasProposal", true);
        _this.set("model.meaning.openProposal", proposal);
        _this.tracker.log("proposal", "meaning change");
        _this.get("model").destroy();
      }, function(errors) {
        _this.set("errors", errors.errors);
      });
    }
  }
});
