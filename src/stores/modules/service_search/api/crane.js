import Vue from 'vue';

export default (data) => {
    var query = {
        tiketway:'ONE_WAY',
        directflights:'false',
        classflight:'ECONOMY',
        segments: [
            {
                adultpeople: 1,
                baby: 0,
                childrens: 0,
                cityfrom: {
                    airport_name_ru: "МОСКВА (ДОМОДЕДОВО)",
                    airport_name_eng: "MOSCOW (DOMODEDOVO)"
                },
                cityto: {
                    airport_name_ru: "АШГАБАТ",
                    airport_name_eng: "ASHGABAT"
                },
                datehere: "2019-05-21T07:26:56.766Z",
                dateto: "2019-05-21T07:26:56.766Z",
                skey: 0,
            }
        ],
        countsegments:1,
        baby:'0',
        childrens:'0',
        adultpeople:'1',
    };
    return Vue.Api.Post('http://test-redchain.ru:80/api/getairavailability', data);
};
