import Ember from 'ember';

export default Ember.Controller.extend({
  urlTracker: Ember.inject.service(),
  urls: {},
  actions: {
    outputUrls(){
      var prom = this.store.createRecord('taco', {}).save()
      prom.then(()=>{
        this.store.findAll('taco')
      }).then(()=>{
        console.log(this.get('urlTracker.urls'))
        this.set('urls', this.get('urlTracker.urls'))
      })
      // this.store.findAll('taco')
      // this.store.findRecord('taco', 1)
    }
  }
});
