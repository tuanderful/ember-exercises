// -- Application --------------------------------------------------------------
Todos = Ember.Application.create();

Todos.ApplicationAdapter = DS.FixtureAdapter.extend();

// -- Router -------------------------------------------------------------------
Todos.Router.map(function() {
  this.resource('todos', { path: '/' });
});

Todos.TodosRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});

// Todo.IndexRoute = Ember.Route.extend({
//   model: function() {
//     return "Hello World!";
//   }
// });

// -- Models -------------------------------------------------------------------
Todos.Todo = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean')
});

Todos.Todo.FIXTURES = [
 {
   id: 1,
   title: 'Learn Ember.js!',
   isCompleted: true
 },
 {
   id: 2,
   title: '...',
   isCompleted: false
 },
 {
   id: 3,
   title: 'Profit!',
   isCompleted: false
 }
];