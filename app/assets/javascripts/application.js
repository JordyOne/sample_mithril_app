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
//= require mithril
//= require ./todos/todos.js
//= require ./about/about.js
//= require ./navigation/navigation.js
//= require ./dashboard/dashboard.js
//= require_self

// Need to manually add loading order instead of relying on asset pipeline

m.route(document, "/", {
  "/": dashboard,
  "/todos": todo.index,
  "/todos/new": todo.new,
  "/dashboard": dashboard,
  "/about": about
});

