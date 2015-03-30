var navigation = {};

navigation.controller = function () {

};

navigation.view = function () {
    return m('header#header', [
        m('h1', 'todos'),
        m('a[href=/?/about]', 'About'),
        m('a[href=/?/]', 'Home'),
        m('a[href=/?/dashboard]', 'Dashboard')
    ])
};


