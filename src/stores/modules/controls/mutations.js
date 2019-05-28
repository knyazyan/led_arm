import * as mutation_types from "./mutation_types";

export default {
    [mutation_types.M_FEES]( state, payload ) {
        state.fees = payload;
    },
    [mutation_types.M_ADD_FEES]( state, payload ) {
        state.fees.push(payload);
    },
    [mutation_types.M_EDIT_FEES]( state, payload ) {
        state.fees.feesplaces.filter((val, key) => {
          if(val.id == payload.id) {
              state.fees.feesplaces[key] = payload;
          }
        })
    },
};
