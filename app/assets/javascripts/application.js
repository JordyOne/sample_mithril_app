// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require mithril
//= require_tree .


/** @jsx m */

// this application only has one module: todo
var todo = {};

//for simplicity, we use this module to namespace the model classes

//the Todo class has two properties
todo.Todo = function (data) {
    this.description = m.prop(data.description);
    this.done = m.prop(data.done);
};

//the TodoList class is a list of Todo's
todo.TodoList = Array;

//the view-model tracks a running list of todos,
//stores a description for new todos before they are created
//and takes care of the logic surrounding when adding is permitted
//and clearing the input after adding a todo to the list
todo.vm = (function () {
    var vm = {};
    vm.init = function () {
        //a running list of todos
        vm.list = new todo.TodoList();
        var tasks = m.prop([]);
        m.request({method: "GET", url: "/todolist"}).then(tasks).then(function (tasks) {
            tasks.map(function (task) {
                var data = new todo.Todo(task);
                vm.list.push(data);
            });
        });
        //a slot to store the name of a new todo before it is created
        vm.description = m.prop("");

        //adds a todo to the database, the list, and clears the description field for user convenience
        vm.add = function () {
            if (vm.description()) {
                m.request({
                    method: "POST",
                    url: "/addTodo",
                    data: {description: vm.description(), done: false}
                })
                    .then(function (data) {
                        var newTodo = new todo.Todo(data);
                        vm.list.push(newTodo)
                    })
                    .then(vm.description(""));
            }
        };
    };
    return vm
}());

//the controller defines what part of the model is relevant for the current page
//in our case, there's only one view-model that handles everything
todo.controller = function () {

    todo.vm.init()
};

//here's the view
todo.view = function () {
    return m("html", [
        m("body", [
            m("input", {onchange: m.withAttr("value", todo.vm.description), value: todo.vm.description()}),
            m("button", {onclick: todo.vm.add}, "Add"),
            m("table", [
                todo.vm.list.map(function (task, index) {
                    return m("tr", [
                        m("td", [
                            m("input[type=checkbox]", {
                                onclick: m.withAttr("checked", task.done),
                                checked: task.done()
                            })
                        ]),
                        m("td", {style: {textDecoration: task.done() ? "line-through" : "none"}}, task.description())
                    ])
                })
            ])
        ])
    ]);
};


var dashboard = {
    controller: function () {
        this.id = 'John Doe';
    },
    view: function (controller) {
        return m("html", [
            m("body", [
                m("div", 'John Doe')
            ])
        ])
    }
};

m.route(document, "/", {
    "/": todo,
    "/dashboard": dashboard

});

//initialize the application
m.module(document.body, {controller: todo.controller, view: todo.view});

