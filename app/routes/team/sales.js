import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return [
      {
        id: 1,
        name: 'Jeremy Stork',
        age: '377',
        dedication: '10 Years'
      },
      {
        id: 2,
        name: 'Gerald Horn',
        age: '23',
        dedication: '3 Months'
      },
      {
        id: 3,
        name: 'Christopher Jane',
        age: '57',
        dedication: '30 Years'
      },
    ];
  }
});
