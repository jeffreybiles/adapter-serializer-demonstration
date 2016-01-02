import DS from 'ember-data';
import StubAndDisplayUrlsMixin from 'adapter-serializer-demonstration/mixins/stub-and-display-urls';

export default DS.RESTAdapter.extend(StubAndDisplayUrlsMixin, {
  namespace: 'api/v2',
  host: 'tacodeli.com'
  // urlForUpdateRecord(id, modelName, snapshot){
  //   console.log('modelName', modelName)
  //   // debugger
  //   return this._buildURL(modelName, id)
  // }
});
