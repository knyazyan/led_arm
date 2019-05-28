import Vue from 'vue';

export default (summ) => {
    return Vue.Api.Get('http://test-redchain.ru:80/api/account/generate?summ=' + summ);
};
