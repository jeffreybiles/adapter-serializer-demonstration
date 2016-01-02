import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  urlTracker: Ember.inject.service(),
  ajax(url, type, options) {
    console.log('in ajax', url, type, options);
    let requestType = this.get("urlTracker").ajaxCalled(url, type)
    return Ember.RSVP.resolve()
    // return this._super(...arguments)
  },
  buildURL(modelName, id, snapshot, requestType, query){
    console.log('request type', requestType)
    this.get("urlTracker").prepareFor(requestType)
    return this._super(...arguments)
  }
});
