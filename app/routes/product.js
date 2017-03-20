import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    const products = [{
        id: 1,
        name: 'Crock Pot',
        manufacturer: 'Farberware',
        price: 40
      },
      {
        id: 2,
        name: 'Food Processor',
        manufacturer: 'Cuisinart',
        price: 25
      },
      {
        id: 3,
        name: 'Electric Griddle',
        manufacturer: 'George Foreman Grills',
        price: 15
      },
    ];

    const id = params.product_id;

// look through the array of products and findong the one
// whose id matches the id from params
    return products.find((product) => product.id === +id);
  }
});
