import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {
  this.route('about');
  this.route('team', function(){
    this.route('engineering');
    this.route('leadership');
  });
  this.route('contact', function(){
    this.route('nyc');
    this.route('boston');
  });
});

export default Router;
