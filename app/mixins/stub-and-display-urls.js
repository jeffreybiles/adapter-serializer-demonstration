import Ember from 'ember';

export default Ember.Mixin.create({
  urlTracker: Ember.inject.service(),
  ajax(url, type, options) {
    let {requestType, modelName} = this.get("urlTracker").ajaxCalled(url, type)
    var returnValue = {}
    var singularName = Ember.String.underscore(modelName)
    var pluralName = Ember.String.pluralize(singularName)
    if(requestType == 'findRecord' || requestType == 'queryRecord'){
      returnValue[singularName] = {'id': 1}
    } else if(requestType == 'findAll' || requestType == 'query'){
      returnValue[pluralName] = []
    } else {
      returnValue = {}
    }
    return Ember.RSVP.resolve(this.handleResponse(200, {}, returnValue))
  },
  buildURL(modelName, id, snapshot, requestType, query){
    if (this.sortQueryParams && query) {
      query = this.sortQueryParams(query);
    }
    this.get("urlTracker").prepareFor(requestType, query, modelName)
    return this._super(...arguments)
  }
});
