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