import * as mutation_types from "./mutation_types";

export default {
    [mutation_types.M_ORDERS]( state, payload ) {
        state.orders = payload;
    },
    [mutation_types.M_TO_ORDER]( state, payload ) {
        state.current_order = payload;
    },
};
