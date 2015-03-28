var about = {
    controller: function () {
        this.content = 'My mind is a raging torrent, flooded with rivulets of thought cascading into a waterfall of creative alternatives. -Hedley Lamar';
    },
    view: function (controller) {
        return m("html", [
            m("body", [
                m("p", controller.content)
            ])
        ])
    }
};