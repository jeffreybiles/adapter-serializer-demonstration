import Ember from 'ember';

export default Ember.Service.extend({
  urls: {},
  readyForRequestType: null,
  prepareFor(requestType){
    this.set('readyForRequestType', requestType)
  },
  ajaxCalled(url, requestType){
    this.set(`urls.${this.get('readyForRequestType')}`, {url: url, requestType: requestType})
    return this.get('readyForRequestType')
  }
});
