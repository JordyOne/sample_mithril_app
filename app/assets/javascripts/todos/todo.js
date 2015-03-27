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
    var vm = {}
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

        //adds a todo to the list, and clears the description field for user convenience
        vm.add = function () {
            if (vm.description()) {
                var data = {description: m.prop(vm.description), done: m.prop(false)};
                return m.request({method: "POST", url: "/addTodo", data: {description: data.description(), done: data.done()}})
                  .then(data.error);
                vm.description("");
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
                        m("td", {style: {textDecoration: task.done() ? "line-through" : "none"}}, task.description()),
                    ])
                })
            ])
        ])
    ]);
};

//initialize the application
m.module(document, {controller: todo.controller, view: todo.view});