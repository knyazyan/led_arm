import * as types from "./types";
import * as mutation_types from "./mutation_types";

export default {
    [types.A_MENU_SHOW] ( context) {
        context.commit(mutation_types.M_MENU_SHOW)
    },
};
