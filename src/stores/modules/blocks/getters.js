export  default {
    getBlocks: (state) => {
        return (state.blocks) ? state.blocks.schedules : [];
    },
    getAirlines(state) {
        return state.airlines;
    },
    getBlockById: (state) => (id) => {
        if(state.blocks) {
            let data = {};
            state.blocks.places.filter((val) => {
                if(val.id == id) {
                    data = val;
                }
            });
            return data;
        } else {
            return {};
        }
    },
    getScheduleById: (state) => (id) => {
        if(state.blocks) {
            let data = {};
            state.blocks.schedules.filter((val) => {
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