import * as types from "./types";
import * as mutation_types from "./mutation_types";
import {ServiceSearch, GetBcTypes, GetManagers, GetCountries, Booking, Crane, PrintPayment} from "./api/methods";

export default {
    [types.A_SEARCH] (context, payload) {
        return new Promise((resolve, reject) => {
            Crane(payload.crane)
                .then(res => {
                    console.log(res)
                    context.commit(mutation_types.M_SEARCH_CRANE, res.data);
                });
            ServiceSearch(payload.data)
                .then(res => {
                    let newArr = [];
                    if (typeof res.data.segments[0] != "undefined") {
                        if (typeof res.data.segments[1] != "undefined") {
                            for (let i = 0; i < res.data.segments[0].length; i++) {
                                for (let j = 0; j < res.data.segments[1].length; j++) {
                                    newArr.push(
                                        {
                                            tuda: {
                                                ...res.data.segments[0][i]
                                            },
                                            obratno: {
                                                ...res.data.segments[1][j]
                                            }
                                        }
                                    )
                                }
                            }
                        } else {
                            newArr = res.data.segments[0];
                        }
                    }
                    context.commit(mutation_types.M_SEARCH, newArr);
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    [types.A_GET_BCTYPES] (context, payload) {
        return new Promise((resolve) => {
            GetBcTypes().then(res => {
                context.commit(mutation_types.M_GET_BCTYPES, res.data.bctypes);
                resolve(res.data.bctypes)
            })
        })
    },
    [types.A_SAVE_BOOKING_DATA] (context, payload) {
        return new Promise((resolve) => {
            context.commit(mutation_types.M_SAVE_BOOKING_DATA, payload);
            resolve(payload)
        })
    },
    [types.A_GET_MANAGERS] (context, payload) {
        return new Promise((resolve) => {
            GetManagers().then(res => {
                context.commit(mutation_types.M_GET_MANAGERS, res.data);
                resolve(res.data)
            })
        })
    },
    [types.A_GET_COUNTRIES] (context, payload) {
        return new Promise((resolve) => {
            GetCountries().then(res => {
                context.commit(mutation_types.M_GET_COUNTRIES, res.data);
                resolve(res.data)
            })
        })
    },
    [types.A_SAVE_SEND_DATA] (context, payload) {
        return new Promise((resolve) => {
            context.commit(mutation_types.M_SAVE_SEND_DATA, payload);
            resolve(payload);
        })
    },
    [types.A_SAVE_SEND_DATA_COMPANY] (context, payload) {
        return new Promise((resolve) => {
            context.commit(mutation_types.M_SAVE_SEND_DATA_COMPANY, payload);
            resolve(payload);
        })
    },
    [types.A_SAVE_SEND_DATA_PASSENGERS] (context, payload) {
        return new Promise((resolve) => {
            context.commit(mutation_types.M_SAVE_SEND_DATA_PASSENGERS, payload);
            resolve(payload);
        })
    },
    [types.A_BOOKING] (context, payload) {
        return new Promise((resolve) => {
            Booking(payload).then(res => {
                context.commit(mutation_types.M_BOOKING, res.data);
                resolve(res.data)
            })
        })
    },
    [types.A_CREATE_SHOW_MORE] (context, payload) {
        context.commit(mutation_types.M_CREATE_SHOW_MORE, payload);
    },
    [types.A_CHANGE_SHOW_MORE] (context, payload) {
        context.commit(mutation_types.M_CHANGE_SHOW_MORE, payload);
    },
    [types.A_CHANGE_SHOW_MORE_CRANE] (context, payload) {
        context.commit(mutation_types.M_CHANGE_SHOW_MORE_CRANE, payload);
    },
    [types.A_CLEAR_SEARCH_RESULT] (context, payload) {
        context.commit(mutation_types.M_CLEAR_SEARCH_RESULT, payload);
    },
    [types.A_PRINT_PAYMENT] (context, payload) {
        console.log(payload);
        return new Promise((resolve) => {
            PrintPayment(payload).then(res => {
                console.log(res);
                // context.commit(mutation_types.M_BOOKING, res.data);
                // resolve(res.data)
            })
        })
    },
};
