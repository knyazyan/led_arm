import * as types from "./types";
import * as mutation_types from "./mutation_types";
import {Orders} from "./api/methods";

export default {
    [types.A_ORDERS] (context) {
        return new Promise((resolve) => {
            Orders().then(res => {
                context.commit(mutation_types.M_ORDERS, res.data);
                resolve(res.data)
            })
        })
    },
    [types.A_TO_ORDER] (context, payload) {
        context.commit(mutation_types.M_TO_ORDER, payload)
    },
};
