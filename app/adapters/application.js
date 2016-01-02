import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  urlTracker: Ember.inject.service(),
  ajax(url, type, options) {
    let requestType = this.get("urlTracker").ajaxCalled(url, type)
    var returnValue;
    if(requestType == 'createRecord'){
      returnValue = {}
    } else if(requestType == 'findRecord'){
      returnValue = {'taco': {'id': 1, 'tasty': true}}
    } else if(requestType == 'findAll'){
      returnValue = {'tacos': []}
    }
    return Ember.RSVP.resolve(this.handleResponse(200, {}, returnValue))
    // return this._super(...arguments)
  },
  buildURL(modelName, id, snapshot, requestType, query){
    this.get("urlTracker").prepareFor(requestType)
    return this._super(...arguments)
  },
  namespace: 'api/v1',
  host: 'tacodeli.com'
});
