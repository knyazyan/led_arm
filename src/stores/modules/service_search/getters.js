export  default {
    getSearchData: (state) => (item) => {
        let arr = [];
        if(state.search_result) {
            state.search_result.forEach((val, key) => {
                if(key > (item - 10) && key <= item) {
                    arr.push(val);
                }
            });
        }
        return arr;
    },
    getSearchResultOneWay: (state) => {
      return state.search_result
    },
    getSearchResultLength: (state) => {
        if(state.search_result) {
            return state.search_result.length

        } else {
            return 0
        }
    },
    getBookingData: (state) => {
        return state.booking_data;
    },
    getShowMoreData: (state) => {
        return state.show_more;
    },
    getShowMoreDataCrane: (state) => {
        return state.show_more_crane;
    },
    getShowMoreDataById: (state) => (id) => {
        console.log(id)
        return state.show_more[id];
    },
    getBcTypes: (state) => (id) => {
        if(state.bc_types) {
            let data = {};
            state.bc_types.filter((val) => {
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