import * as types from "./types";
import * as mutation_types from "./mutation_types";
import {
    AddBlocks,
    Blocks,
    APICompanies,
    EditBlocks,
    AddSchedule,
    EditSchedule,
    GenerateBlobk,
    Currencies,
    EditCountPlaces
} from "./api/methods";

export default {
    [types.A_BLOCKS] (context) {
        return new Promise((resolve) => {
            Blocks().then(res => {
                context.commit(mutation_types.M_BLOCKS, res.data);
                resolve(res.data)
            })
        })
    },
    [types.A_ADD_BLOCKS] (context, payload) {
        return new Promise((resolve, reject) => {
            AddBlocks(payload).then(res => {
                context.commit(mutation_types.M_ADD_BLOCKS, res.data);
            })
        })
    },
    [types.A_EDIT_BLOCKS] (context, payload) {
        return new Promise((resolve, reject) => {
            EditBlocks(payload).then(res => {
                context.commit(mutation_types.M_EDIT_BLOCKS, res.data);
            })
        })
    },
    [types.A_ADD_SCHEDULE] (context, payload) {
        return new Promise((resolve, reject) => {
            AddSchedule(payload).then(res => {
                context.commit(mutation_types.M_ADD_SCHEDULE, res.data);
            })
        })
    },
    [types.A_EDIT_SCHEDULE] (context, payload) {
        return new Promise((resolve, reject) => {
            EditSchedule(payload).then(res => {
                context.commit(mutation_types.M_EDIT_SCHEDULE, res.data);
                resolve(true)
            })
        })
    },
    [types.A_COMPANIES] (context, payload) {
        return new Promise((resolve, reject) => {
            APICompanies(payload).then(res => {
                context.commit(mutation_types.M_COMPANIES, res.data);
            })
        })
    },
    [types.A_GENERATE_BLOCK] (context, payload) {
        return new Promise((resolve, reject) => {
            GenerateBlobk(payload).then(res => {
                context.commit(mutation_types.M_GENERATE_BLOCK, res.data);
            })
        })
    },
    [types.A_CURRENCIES] (context, payload) {
        return new Promise((resolve, reject) => {
            Currencies().then(res => {
                context.commit(mutation_types.M_CURRENCIES, res.data);
                resolve(res);
            })
        })
    },
    [types.A_EDIT_COUNT_PLACES] (context, payload) {
        return new Promise((resolve, reject) => {
            EditCountPlaces(payload.id, payload.count_places).then(res => {
                console.log(res)
            })
        })
    },
};
