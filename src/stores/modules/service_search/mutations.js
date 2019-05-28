import * as mutation_types from "./mutation_types";

export default {
    [mutation_types.M_SEARCH](state,payload) {
        state.search_result = payload;
    },
    [mutation_types.M_GET_BCTYPES](state,payload) {
        state.bc_types = payload;
    },
    [mutation_types.M_SAVE_BOOKING_DATA](state,payload) {
        state.booking_data = payload;
    },
    [mutation_types.M_GET_MANAGERS](state,payload) {
        state.company_managers = payload.success;
    },
    [mutation_types.M_GET_COUNTRIES](state,payload) {
        state.countries = payload.countries;
    },
    [mutation_types.M_SAVE_SEND_DATA](state,payload) {
        state.sendData.flight_id = payload.flightData.id;
        state.sendData.date = payload.flightData.date_arrival_at;
        state.sendData.from_id = payload.flightData.flightplaces.schedule[0].departure_at;//+
        state.sendData.to_id = payload.flightData.flightplaces.schedule[0].arrival_at;
        state.sendData.passangers_count = parseInt(payload.passCount.children) + parseInt(payload.passCount.older) + parseInt(payload.passCount.baby);
        state.sendData.type_flight = 1;
        state.sendData.fare_id = payload.flightData.flightplaces.fare_families_id;
    },
    [mutation_types.M_SAVE_SEND_DATA_COMPANY](state,payload) {
        state.sendData.payment.type_payment = payload.payment;
        state.sendData.payment.company_id = 1;
        state.sendData.payment.contact_phone = payload.phoneNumber;
    },
    [mutation_types.M_SAVE_SEND_DATA_PASSENGERS](state,payload) {
        state.sendData.passengers = payload;
    },
    [mutation_types.M_BOOKING](state,payload) {
        console.log('ok')
    },
    [mutation_types.M_CREATE_SHOW_MORE](state,payload) {
        state.show_more = [];
        payload.forEach((key, val) => {
            state.show_more.push(false);
        });
    },
    [mutation_types.M_CHANGE_SHOW_MORE](state,payload) {
        state.show_more[payload] = !state.show_more[payload];
    },
    [mutation_types.M_CHANGE_SHOW_MORE_CRANE](state,payload) {
        state.show_more_crane[payload] = !state.show_more_crane[payload];
    },
    [mutation_types.M_CLEAR_SEARCH_RESULT](state,payload) {
        state.search_result = null;
    },
    [mutation_types.M_SEARCH_CRANE](state,payload) {
        state.search_result_crane = payload.data.result;
    },
};
