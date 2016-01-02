import Ember from 'ember';

export default Ember.Controller.extend({
  urlTracker: Ember.inject.service(),
  urls: {},
  modelName: 'taco-taco',
  actions: {
    outputUrls(){
      this.findUrls()
    }
  },
  errorMessage: '',
  findUrls(){
    try {
      var modelName = this.get('modelName')
      var prom = this.store.createRecord(modelName, {}).save()
      prom.then((taco)=>{
        taco.set('cost', 3)
        return taco.save()
      }).then((taco)=>{
        taco.deleteRecord()
        taco.save()
      }).then(()=>{
        return this.store.findAll(modelName)
      }).then(()=>{
        return this.store.findRecord(modelName, 1)
      }).then(()=>{
        return this.store.query(modelName, {'tasty': true})
      }).then(()=>{
        return this.store.queryRecord(modelName, {'tasty': true})
      }).then(()=>{
        this.set('urls', this.get('urlTracker.urls'))
        this.set('errorMessage', '')
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
