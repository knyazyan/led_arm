import Vue from 'vue';

export default (id, count_places) => {
    console.log(id)
    console.log(count_places)
    return Vue.Api.Post('http://test-redchain.ru:80/api/flights/edit/' + id, {count_places});
};