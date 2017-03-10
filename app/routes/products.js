import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return [
      {
        id: 1,
        name: 'Crock Pot',
        manufacturer: 'Farberware',
        price: 40,
      },
      {
        id: 2,
        name: 'Food Processor',
        manufacturer: 'Cuisinart',
        price: 25,
      },
      {
        id: 3,
        name: 'Electric Griddle',
        manufacturer: 'George Foreman Grills',
        price: 15,
      },
    ];
  },
});
