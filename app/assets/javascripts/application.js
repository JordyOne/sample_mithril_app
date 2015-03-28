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
//= require_self
//= require ./todos/todos.js
//= require ./dashboard/dashboard.js
//= require ./about/about.js
//= require ./routes/routes.js

// Need to manually add loading order instead of relying on asset pipeline

///** @jsx m */ Where does this work?

//initialize the application
m.module(document, {controller: todo.controller, view: todo.view});

