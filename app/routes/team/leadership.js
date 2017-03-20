import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return [
      {
        id: 1,
        name: 'Christopher Jane',
        age: '34',
        dedication: '15 Years'
      },
      {
        id: 2,
        name: 'Christopher Jane',
        age: '22',
        dedication: '33 Years'
      },
      {
        id: 3,
        name: 'Christopher Jane',
        age: '55',
        dedication: '32 Years'
      },
    ];
  }
});
