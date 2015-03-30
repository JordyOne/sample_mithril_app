var dashboard = {};
dashboard.controller = function () {
    this.todo = todo.controller();
    this.navigation = navigation.controller()
};


dashboard.view = function (ctrl) {
    return [
        m("body", [
            m('div', [
                navigation.view(ctrl.navigation)
            ]),
            m('div#app', [
                todo.view(ctrl.todo)
            ])
        ])
    ]


};
