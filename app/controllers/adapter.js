import Ember from 'ember';

export default Ember.Controller.extend({
  urlTracker: Ember.inject.service(),
  urls: {},
  modelName: 'taco',
  actions: {
    outputUrlsFor(modelName){
      this.set('modelName', modelName)
      this.findUrls()
    }
  },
  findUrls(){
    try {
      var modelName = this.get('modelName')
      // TODO: Turn these into a promise hash after the update, instead of just chained
      let prom = this.store.createRecord(modelName, {}).save()
      prom.then((taco)=>{
        taco.set('cost', 3)
        return taco.save()
      }).then((taco)=>{
        taco.deleteRecord()
        return taco.save()
      }).then(()=>{
        var findRecord = this.store.findRecord(modelName, 1);
        var findAll = this.store.findAll(modelName);
        var query = this.store.query(modelName, {'tasty': true, 'aa': 'hello', 'bb': 'goodbye'});
        var queryRecord = this.store.queryRecord(modelName, {'tasty': true});
        return Ember.RSVP.all([findRecord, findAll, query, queryRecord]);
      }).then(()=>{
        this.set('urls', this.get('urlTracker.urls'))
        this.propertyDidChange('urls')
      })
    } catch(e){
      this.set('errorMessage', e.message)
    }
  },
  init(){
    this.findUrls()
    this._super(...arguments)
  }
});
