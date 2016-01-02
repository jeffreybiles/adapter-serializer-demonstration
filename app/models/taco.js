import DS from 'ember-data';

export default DS.Model.extend({
  topping: DS.attr('string'),
  tasty: DS.attr('boolean'),
  cost: DS.attr('number')
});
