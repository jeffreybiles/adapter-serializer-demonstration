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
      var prom = this.store.createRecord(modelName, {}).save()
      prom.then((taco)=>{
        taco.set('cost', 3)
        return taco.save()
      }).then((taco)=>{
        taco.deleteRecord()
        taco.save()
      }).then(()=>{
        return this.store.findRecord(modelName, 1)
      }).then(()=>{
        return this.store.findAll(modelName)
      }).then(()=>{
        return this.store.query(modelName, {'tasty': true})
      }).then(()=>{
        return this.store.queryRecord(modelName, {'tasty': true})
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
