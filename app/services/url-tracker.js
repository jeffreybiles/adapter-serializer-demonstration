import Ember from 'ember';

export default Ember.Service.extend({
  urls: {},
  readyForRequestType: null,
  prepareFor(requestType, queries, modelName){
    this.set('readyForRequestType', requestType)
    this.set('queries', queries)
    this.set('modelName', modelName)
  },
  ajaxCalled(url, requestType){
    this.set(`urls.${this.get('readyForRequestType')}`, {url: url, requestType: requestType, queries: this.get("queries")})
    return {
      requestType: this.get('readyForRequestType'),
      modelName: this.get('modelName')
    }
  }
});
