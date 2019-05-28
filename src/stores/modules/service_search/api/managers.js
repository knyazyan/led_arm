import Vue from 'vue';

export default () => {
    return Vue.Api.Post('http://test-redchain.ru:80/api/company/managers');
};
