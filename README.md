[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Ember Routing

## Prerequisites

-   [ga-wdi-boston/ember](https://github.com/ga-wdi-boston/ember)
-   [ga-wdi-boston/ember-inspector](https://github.com/ga-wdi-boston/ember-inspector)
-   [ga-wdi-boston/ember-object](https://github.com/ga-wdi-boston/ember-object)

## Objectives

By the end of this, developers should be able to:

-   Create new Routes and Templates with generators.
-   Configure the Ember Router to point to a new Template.
-   Use the `{{#link-to}}` helper to route from one view-state to another.
-   Set up resource routes.
-   Create a Route object.
-   Configure a Route to parse information from a URL.


## Preparation

1.  [Fork and clone](https://github.com/ga-wdi-boston/meta/wiki/ForkAndClone)
    this repository.
1.  Install dependencies with `npm install` and `bower install`.
1.  Run the development server with `ember server`. Use the `--proxy` flag to
    avoid writing development-specific CORS and CSP settings.

## Code-Along: Routing to Templates

Start the front-end server with `ember serve`, and open the application by
navigating to `http://localhost:7165`.

When you do, you should see a page that looks like this:

!['application' View](https://cloud.githubusercontent.com/assets/388761/13950977/80dd0174-f004-11e5-900a-255e97ec4da1.png)

As you may recall from the Overview lesson, the content for this default View,
'application', is determined by `app/templates/application.hbs`. Let's look
inside that file for a moment.

```html
<h1> Welcome to Ember! </h1>

{{outlet}}
```

What exactly is `{{outlet}}`? We've talked about how Ember Views can be nested
within each other like a tree, just like the URLs that map to them -
`{{outlet}}` is a placeholder for any Views that might be nested inside the
'application' View.

Let's create one of those new Views and see how it works. Run the command `ember
g template about` in the console; it should create a new file, `about.hbs`,
inside the `templates` directory.
Let's write some new HTML into that file:

```html
<h3> About This App </h3>

<p> This application is a demonstration of how Ember routing works. </p>
```

To let our application know what URL this View corresponds to, we need to add it
to the Ember Router.

```javascript
Router.map(function() {
  this.route('about');
});
```

Having made this change, if we navigate to `http://localhost:7165/about` we
should see the following.

!['about' View](https://cloud.githubusercontent.com/assets/388761/13951020/b5f539da-f004-11e5-8a1a-c08a2927036f.png)

WAIT!! Don't we need a Route, Controller, View, etc in order to be able to show
that 'about' View? Yes, we do! However, this is an example of Ember making
things simpler for us. By default, _defining a new route in the Router will
create all of the other objects for you_, and as a result, _the only time when
you actually create any of those objects (by making your own files) is when you
want to override the defaults_. It's amazing, and it lets you move very quickly
when developing an Ember application.

In this case, although we've only explicitly defined the Template, all of the
other objects have been created in the background. This is easily verified using
the Ember Inspector.

!['about' View, inspected](https://cloud.githubusercontent.com/assets/13922520/21613747/8404a0fa-d1a4-11e6-8ef0-00e03b5e01e8.png)

As you can see, even though we didn't create them, there exist a Route, a
Controller, and a View that are tied in to the template we've just created.

Let's go back to the main page - we can do this by using the "back" button.
Suppose that a user were to come to our site, and want to see the About page.
They could type in the URL manually, but that assumes that they know that the
`/about` route exists. It's also really bad UI. What would be nice is if we
could have a link pointing from our main page to our About page.

To that end, Ember provides us with a Handlebars helper called `{{#link-to}}`
that allows us to create links from one route to another.

`app/templates/appication.hbs`
```html
<nav>
  {{#link-to 'about'}}About{{/link-to}}
</nav>
```

This helper will generate an `<a>` tag inside our rendered HTML which loads the
About page.

While we're at it, let's add another link back to the main page, so we can get
back.

`app/templates/application.hbs`
```diff
<nav>
+  {{#link-to 'application'}}Home{{/link-to}}
  {{#link-to 'about'}}About{{/link-to}}
</nav>
```

Now we can navigate back and forth between the two templates with ease!

## Lab: Routing to Templates

Create two more pages, 'Team' and 'Contact', that feature the following content:

### Team

```html
<h3> Our Team </h3>

<p> Our team is composed of the best folks around. </p>
```

### Contact

```html
<h3> Contact </h3>

<p>
  We can be found at: <br />
  1 Fake Street<br />
  NotRealsVille, MA, 00000
</p>
```

Set up routes that point to these templates, and add links to these pages from
the main page.

## Code-Along: Nested Templates

Suppose that we wanted to nest some more templates inside the Team page - for
instance, pages for Leadership, Engineering, and Sales - and have it be possible
to route to any of them.

When we wanted to route to 'about', 'team', and 'contact', we needed to have an
`{{outlet}}` in the 'application' Template; if we put another `{{outlet}}`
helper in the 'team' Template, we can load other, more deeply-nested templates
into that Template.

```html
<!-- team -->
<h3> Our Team </h3>

<p> Our team is composed of the best folks around. </p>

{{outlet}}
```

However, nested Templates require nested routes - URLs for these routes will
need to have the format `/team/engineering`, `/team/leadership`, etc. How can we
set this up?

If we go into the Ember Router, we can specify that routes are nested by passing
in a function as a second argument to `this.route` and defining new routes
within that function's body.

```javascript
Router.map(function() {
  this.route('about');
  this.route('contact');
  this.route('team', function(){
    this.route('engineering');
    this.route('leadership');
  });
});
```

Next, we need to set up our Templates. The appropriate syntax to use in the
generator is `ember g template team/something` - this will let ember-cli know to
create a `app/templates/team` and a `something.hbs` file inside that directory.

Here's some content we can use for each of those nested templates.

The `{{#link-to}}` helpers referring back to the 'team' Template are not
strictly necessary, but are nice for UI reasons.

```html
<!-- team/leadership.hbs -->
<h5>Leadership Team</h5>
<ul>
  <li>Person One</li>
  <li>Person Two</li>
  <li>Person Three</li>
</ul>
{{#link-to 'team'}}Back{{/link-to}}
```

```html
<!-- team/engineering.hbs -->
<h5>Engineering Team</h5>
<ul>
  <li>Person Four</li>
  <li>Person Five</li>
  <li>Person Six</li>
</ul>
{{#link-to 'team'}}Back{{/link-to}}
```

Finally, let's add some `{{#link-to}}` helpers to the 'team' Template which
direct us to either team. With that done, we can easily navigate back and forth
between looking at either team. The way to refer to a nested route in 'string
form' is to separate each level of nesting with a `.`.

If you ever forget the route to a particular Template, you can always check the
Ember Inspector!

```html
<h3> Our Team </h3>

<p> Our team is composed of the best folks around. </p>

{{#link-to 'team.leadership'}}Leadership{{/link-to}}
{{#link-to 'team.engineering'}}Engineering{{/link-to}}

{{outlet}}
```

### Index Templates

Ordinarily, if we're looking at a page like 'team', the `{{outlet}}` helper
doesn't have any content in it. But what if we wanted to have something show up
there _only when no nested templates have been loaded_,  e.g. 'Click a team to
learn more.'?

This use case is handled by a special kind of nested Template called an 'index'.
Setting it up is almost the same as setting up any other kind of nested
Template, the only difference being that it maps to `…/` instead of
`…/somepath`.

We also don't need to modify the Router at all - it pre-defines an 'index' route
for every routing block (each corresponding Template should have an
`{{outlet}}`).

Let's create an index template for the 'team' page.

```js
ember g template team/index
```

The above will create `team/index.hbs` within the `templates/` repository.

## Lab: Nested Templates

Change the 'contact' template to load one of two nested templates: 'boston' and
'nyc'. Each of these templates should have a different (fake) address visible.
When neither template is loaded, the 'contact' page should show the content
below:

```html
<p> Please select a location for contact details. </p>
```

## Code-Along: Routing to Resources

In the previous lesson on Ember routing, you learned how to generate templates
and connect to them via the Router.

Routes linking to (basically) static HTML are well and good, but most of the
time we're interested in showing and manipulating data from resources (e.g.
products). Although the routes for resources used to be distinct from normal
routes, in Ember 2 that distinction has disappeared - now, a route for a
resource (such as `products`) looks like any other route.

```javascript
// app/router.js

Router.map(function() {
  this.route('products');

  this.route('about');
  this.route('contact');
  this.route('team', function(){
    this.route('leadership');
    this.route('engineering');
    this.route('sales');
  });
});
```

However, in order for such a route to actually have data to load, we need to
create a Route object. As you may recall from the Ember Overview lesson, the
purposes of the Route object are (1) to parse the URL for a given route, and (2)
to use information from that URL to load model data.

Generating this Route object is fairly straightforward. In the case of a
`products` route, we can do this by running the command
`ember g route products`; this will create _two_ new files:
`app/routes/products.js` and `app/templates/products.hbs`.

Let's take a closer look at that Route file.

```javascript
// app/routes/products.js

import Ember from 'ember';

export default Ember.Route.extend({
});
```

The way in which a Route file makes data available to a Controller, View, or
Template is through a method that we define called `model` - this method returns
some data object that gets used within the route. In this case, let us suppose
that the `model` method returns an array of JavaScript objects, like so:

```javascript
// app/routes/products.js

import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return [
      {
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
  }
});
```

If we wanted to access this data from a Template, we can do so by referencing a
property called `model` from within the Template, which points back to the
result of the model function from the Route. Let's make a change to the
`products` Template so that it shows the names of the products listed above.

```html
<!-- app/templates/products.hbs -->

<!-- {{outlet}} -->
<h2> Product Listings </h2>
<ul>
{{#each model as |product|}}
  <li>{{product.name}}</li>
{{/each}}
</ul>
```

`{{#each set as |item|}}` is a new construction for Ember 2. The pipes (`|`)
play the same role here that they do in Ruby.

## Lab: Routing to Resources

Create routes for each of the teams in our app: `leadership`, `engineering`, and
`sales`. Each route should have a model hook that loads an example collection of
employees on the team. Modify the appropriate templates to render the data from
each model.

## Routing with Dynamic Segments

Often, we don't just want to see the full list of a particular type of resource;
we want to be able to zoom in on one in particular. Although it deals with the
same type of resource, because it creates a different 'view state' than looking
at the list as a whole, _this must be represented with a separate route_. Let's
call this new route `product`, since it concerns zooming in on one product in
particular from the list.

```javascript
// app/router.js

Router.map(function() {
  this.route('products');
  this.route('product', {path: '/products/:product_id'})
  this.route('about');
  this.route('contact');
  this.route('team', function(){
    this.route('leadership');
    this.route('engineering');
    this.route('sales');
  });
});
```

The object passed in as the second argument to the `product` route contains the
actual path used to reach the `product` route. It's usually not necessary to
specify the actual `path`, since the URL and the name of the route are usually
the same; however, in this case, they are _not_ the same, so we _must_ specify
the `path` explicitly.

The `:product_id` section of the `path` is called a dynamic segment; much like
you've seen in Rails and Express, this part of the URL is a placeholder for a
value, typically a number. The name `:product_id` is not special, and in fact we
could have chosen any name for that segment.

As mentioned earlier, one of the two big responsibilities of the Route is to
parse the URL and extract meaningful information - dynamic segments are the
primary instance of this. Let's create a new Route for `product` (`ember g route
product`).

```javascript
// app/routes/product.js

import Ember from 'ember';

export default Ember.Route.extend({
});
```

We still need a model for our Template; however, this time, rather than
returning all products, we want to only return one, based on the value passed in
as `:product_id`. As it turns out, though we usually ignore it, the `model`
function normally accepts an object as an argument (typically called `params`)
which holds data from that route's dynamic segment; if we extract that property
from `params` (`:product_id` is stored at `params.product_id`), we can use it to
look up the data we want.

```javascript
// app/routes/product.js

import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return [
      {
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
    ][params.product_id - 1];
  }
});
```

Since our Route has a `model` method, we can now access the data from that
method in the Route's corresponding Template.

```html
<!-- app/templates/product.hbs -->

<!-- {{outlet}} -->

<h2> Product Details </h2>
<h4>{{model.name}}</h4>
<h5>${{model.price}}</h5>
<p>Manufactured by <em>{{model.manufacturer}}</em></p>
{{#link-to 'products'}}Back to Product Listings{{/link-to}}
```

Now if we navigate to `http://localhost:7165/products/3`, we can now see
information about the third product on our page.

Since this now works, let's make one final change: replacing the hard-coded HTML
in the `products` template with `{{#link-to}}` helpers pointing to the specific
pages for each product.

```html
<!-- app/templates/products.hbs -->

<!-- {{outlet}} -->

<h2> Product Listings </h2>
<ul>
  {{#each model as |product|}}
    <li>{{#link-to 'product' product}} {{product.name}} {{/link-to}}</li>
  {{/each}}
</ul>
```

## Lab: Routing with Dynamic Segments

Let's make employee profiles. Create routes for showing individuals on each
team. Those routes should pass employee IDs to the model hooks. You will also
need a new template.

## Bonus: Refactoring

Move model hook code into a service so that you can re-use it in different
routes.

After that's done, the next challenge should be a bit simpler: create an
employees route that shows all employees regardless of team, and change the
team routes to filter all employees using a dynamic segment.

## Additional Resources

-   [Ember Guides](http://guides.emberjs.com/v2.4.0/routing/)

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
