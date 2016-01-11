import DS from 'ember-data';
import StubAndDisplayUrlsMixin from 'adapter-serializer-demonstration/mixins/stub-and-display-urls';

export default DS.RESTAdapter.extend(StubAndDisplayUrlsMixin, {
  namespace: 'api/v1',
  host: 'tacodeli.com',
  urlForCreateRecord(modelName, snapshot){
    return 'hello'
  },
  sortQueryParams: function(params) {
    var sortedKeys = Object.keys(params).sort().reverse();
    var len = sortedKeys.length, newParams = {};

    for (var i = 0; i < len; i++) {
      newParams[sortedKeys[i]] = params[sortedKeys[i]];
    }
    return newParams;
  }
});
