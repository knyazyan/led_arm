import Vue from 'vue';

export default (id) => {
    return Vue.Api.Post('http://test-redchain.ru:80/api/flights/generate/' + id );
};
