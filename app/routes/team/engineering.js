import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return [
      {
        id: 1,
        name: 'Christopher Jane',
        age: '57',
        dedication: '30 Years'
      },
      {
        id: 2,
        name: 'Christopher Jane',
        age: '57',
        dedication: '30 Years'
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
