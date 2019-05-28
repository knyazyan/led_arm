export  default {
    getfeesData: (state) => {
        return state.fees;
    },
    getOrder: (state) => {
        return state.current_order;
    },
    getOrders: (state) => {
        return state.orders;
    },
    getFeesById: (state) => (id) => {
        if(state.fees) {
            let data = {};
            state.fees.feesplaces.filter((val) => {
                if(val.id == id) {
                    data = val;
                }
            });
            return data;
        } else {
            return {};
        }
    },
}