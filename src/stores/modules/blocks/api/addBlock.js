import Vue from 'vue';

export default (data) => {
    return Vue.Api.Post('http://test-redchain.ru:80/api/postblockadd',data);
};
