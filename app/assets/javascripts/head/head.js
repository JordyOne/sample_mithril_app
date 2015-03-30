var head = {
    controller: function () {

    },

    view: function () {
        return m("head", [
                m("meta", {charset: "utf-8"}),
                m("meta", {name: "viewport", content: "width=device-width, initial-scale=1.0"}),
                m("title", "Prequel")
        ])
    }
};