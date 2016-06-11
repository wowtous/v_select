var Vue = require('vue');
var v_select = require('../src/v_select');

// var example = require('./comps/example');
// Vue.component('example', example);

Vue.component('v-select', v_select);

// create a root instance
new Vue({
    el: '#demo',
    data: require('./mock/data')
})
