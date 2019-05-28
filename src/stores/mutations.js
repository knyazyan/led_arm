import * as mutation_types from "./mutation_types";

export default {
    [mutation_types.M_SET_LANG](state, payload) {
        if (state.locales[payload]) {
            state.locale = payload
        }
    },
};
