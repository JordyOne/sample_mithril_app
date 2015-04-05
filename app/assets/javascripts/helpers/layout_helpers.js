var layout = function (nav, body, footer) {
  return m(".layout", [
    m("header", nav),
    m("main", body),
    m("footer", footer)
  ]);
};

var mixinLayout = function (layout, nav, body, footer) {
  return function () {
    return layout(nav(), body(), footer());
  };
};
