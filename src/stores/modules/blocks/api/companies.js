import Vue from 'vue';

export default () => {
    return Vue.Api.Get('http://test-redchain.ru:80/api/airlines/all');
};