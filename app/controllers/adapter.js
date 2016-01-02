import Ember from 'ember';

export default Ember.Controller.extend({
  urlTracker: Ember.inject.service(),
  urls: {},
  actions: {
    outputUrls(){
      this.findUrls()
    }
  },
  findUrls(){
    var prom = this.store.createRecord('taco-taco', {}).save()
    prom.then((taco)=>{
      taco.set('cost', 3)
      return taco.save()
    }).then((taco)=>{
      taco.deleteRecord()
      taco.save()
    }).then(()=>{
      return this.store.findAll('taco-taco')
    }).then(()=>{
      return this.store.findRecord('taco-taco', 1)
    }).then(()=>{
      this.set('urls', this.get('urlTracker.urls'))
    })
  },
  init(){
    this.findUrls()
    this._super(...arguments)
  }
});
