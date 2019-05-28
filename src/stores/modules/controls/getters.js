export  default {
    getfeesData: (state) => {
        return state.fees;
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