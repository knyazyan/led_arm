import * as types from "./types";
import * as mutation_types from "./mutation_types";
import {AddFees, Fees, EditFees} from "./api/methods";

export default {
    [types.A_FEES] (context) {
        return new Promise((resolve) => {
            Fees().then(res => {
                context.commit(mutation_types.M_FEES, res.data);
                resolve(res.data)
            })
        })
    },
    [types.A_ADD_FEES] (context, payload) {
        return new Promise((resolve, reject) => {
            AddFees(payload).then(res => {
                context.commit(mutation_types.M_ADD_FEES, res.data);
            })
        })
    },
    [types.A_EDIT_FEES] (context, payload) {
        return new Promise(function(resolve, reject) {
            EditFees(payload).then(res => {
                if(res.status == 200) {
                    context.commit(mutation_types.M_EDIT_FEES, res.data.feesplace);
                    resolve(true);
                } else {
                    reject(false);
                }
            })
        })
    },
};
