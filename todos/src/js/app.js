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

// -- Controller --------------------------------------------------------------
Todos.TodosController = Ember.ArrayController.extend({
  actions: {
    clearCompleted: function() {
      var completed = this.filterBy('isCompleted', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    },
    createTodo: function() {
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      // Clear the field
      this.set('newTitle', '');

      todo.save();
    }
  },
  hasCompleted: function() {
    return this.get('completed') > 0;
  }.property('completed'),
  completed: function() {
    return this.filterBy('isCompleted', true).get('length');
  }.property('@each.isCompleted'),
  remaining: function() {
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),
  inflection: function() {
    return this.get('remaining') === 1 ? 'todo' : 'todos';
  }.property('remaining')
});

Todos.TodoController = Ember.ObjectController.extend({
  actions: {
    removeTodo: function () {
      var todo = this.get('model');
      todo.deleteRecord();
      todo.save();
    }
  }//,
  /*isCompleted: function(key, value){
    var model = this.get('model');

    // Only key is passed
    if (value === undefined) {
      return model.get('isCompleted');
    } else {
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }.property('model.isCompleted')*/
});