<template>
    <div class="flights-content">
        <div class="flights-header">
            <div class="headline">
                <h5>Список полётов</h5>
            </div>
        </div>
        <div class="table-wrap">
            <v-data-table
                    :headers="headers"
                    :items="flightsData"
                    :hide-actions="true"
                    :pagination.sync="pagination"
                    class="elevation-1"
            >
                <template slot="headerCell" scope="props">
                    <span class="history-datatable-th standard-text">
                      {{ props.header.text }}
                    </span>
                </template>
                <template slot="items" scope="props">
                    <td>{{props.item.date_departure_at}}</td>
                    <td>
                        <input
                                type="text"
                                class="count-places"
                                v-model="props.item.count_places"
                                v-mask="'#####################'"
                                @blur="saveCountPlaces(props.item.id, props.item.count_places)"
                        >
                    </td>
                    <td>{{getOlderOw(props.item.flights_places_id)}}</td>
                    <td>{{getInfantOw(props.item.flights_places_id)}}</td>
                    <td>{{getOlderRt(props.item.flights_places_id)}}</td>
                    <td>{{getInfantRt(props.item.flights_places_id)}}</td>
                </template>
                <template slot="no-data">
                    <span class="history-no-data">Нет данных</span>
                </template>
            </v-data-table>
            <div class="text-xs-right pt-2">
                <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/blocks/types";

    export default {
        name: "flightsList",
        data() {
            return {
                pagination: {
                    rowsPerPage: 15
                },
                rowsPerPageItems: [5, 10, 15, 20],
                headers: [
                    {text: 'Дата вылета', align: 'left', sortable: true, value: ''},
                    {text: 'Количество мест', align: 'left', value: ''},
                    {text: 'Стоимость взрослый OW', align: 'left', value: ''},
                    {text: 'Стоимость инфант OW', align: 'left', value: ''},
                    {text: 'Стоимость взрослый RT', align: 'left', value: ''},
                    {text: 'Стоимость инфант RT', align: 'left', value: ''}
                ],
                flightsData: [],
                blocksData: [],
                ow: '',
                rt: "",
                infant_ow: "",
                infant_rt: "",
            }
        },
        mounted() {
            this.$store.dispatch("blocks/" + types.A_BLOCKS)
                .then(res => {
                    this.blocksData = res.places;
                    this.flightsData = res.flights.filter(val => {
                        if(val.flights_places_id == this.$route.params.id) {
                            return val
                        }
                    });
                })
        },
        computed: {
            rowPerPageSet: {
                get() {
                    return this.rowsPerPageItems
                },
                set(value) {
                    this.pagination.rowsPerPage = value
                }
            },
            pages () {
                if (this.pagination.rowsPerPage == null ||
                    this.pagination.totalItems == null
                ) return 0;
                let countLength = 0;
                if(this.flightsData.length != 0) {
                    countLength = this.flightsData.length;
                }
                return Math.ceil(countLength / this.pagination.rowsPerPage)
            },
            getOlderPriceOw: {
                get() {
                    return this.ow;
                },
                set(id) {
                    this.blocksData.filter(val => {
                        if(val.id == id) {
                            this.ow = val.ow;
                        }
                    })
                }
            },
            getOlderPriceRt: {
                get() {
                    return this.ow;
                },
                set(id) {
                    this.blocksData.filter(val => {
                        if(val.id == id) {
                            this.rt = val.rt;
                        }
                    })
                }
            },
            getInfantPriceOw: {
                get() {
                    return this.ow;
                },
                set(id) {
                    this.blocksData.filter(val => {
                        if(val.id == id) {
                            this.infant_ow = val.infant_ow;
                        }
                    })
                }
            },
            getInfantPriceRt: {
                get() {
                    return this.infant_rt;
                },
                set(id) {
                    this.blocksData.filter(val => {
                        if(val.id == id) {
                            this.infant_rt = val.infant_rt;
                        }
                    })
                }
            },
        },
        methods: {
            saveCountPlaces(id, count) {
                let data = {
                    id: id,
                    count_places: parseInt(count)
                }

                this.$store.dispatch("blocks/" + types.A_EDIT_COUNT_PLACES, data)
            },
            getOlderOw(id) {
                let price = "";
                this.blocksData.filter(val => {
                    if(val.id == id) {
                        price = val.ow;
                    }
                });
                return price;
            },
            getOlderRt(id) {
                let price = "";
                this.blocksData.filter(val => {
                    if(val.id == id) {
                        price = val.rt;
                    }
                });
                return price;
            },
            getInfantOw(id) {
                let price = "";
                this.blocksData.filter(val => {
                    if(val.id == id) {
                        price = val.infant_ow;
                    }
                });
                return price;
            },
            getInfantRt(id) {
                let price = "";
                this.blocksData.filter(val => {
                    if(val.id == id) {
                        price = val.infant_rt;
                    }
                });
                return price;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .flights-content{
        padding: 0 33px 50px;
    }

    .headline{
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        padding: 26px 0;
        h5{
            font-size: 16px;
            font-weight: 600;
            color: #1F2041;
            margin: 0;
        }
    }

    .elevation-1 {
        box-shadow: none !important;
        padding: 35px 0;

        /deep/ .theme--light.v-table thead tr:first-child {
            border: none;
        }

        /deep/ table.v-table {
            background-color: transparent;

            & thead tr {
                height: auto;
            }

            & tbody {
                & tr:not(:last-child) {
                    border: none;
                }

                & td {
                    height: 36px;
                }
            }
        }

        /deep/ .v-datatable__progress {
            display: none;
        }

        /deep/ .v-datatable thead th {
            padding: 0;

            &.column.sortable.active .v-icon {
                display: none;
            }
        }

        /deep/ table.v-table tbody td {
            padding: 0;
        }
    }

    /deep/ .v-pagination {
        li button {
            outline: none;

            i {
                display: none;
            }
        }

        li:first-child button {
            position: relative;
            width: 60px;

            &:after {
                content: 'Назад';
                position: absolute;
                top: 3px;
                left: 14px;
                font-size: 11px;
            }
        }

        li:last-child button {
            position: relative;
            width: 60px;

            &:after {
                content: 'Далее';
                position: absolute;
                top: 3px;
                left: 14px;
                font-size: 11px;
            }
        }

        & .v-pagination__item {
            border-radius: 50%;
            font-size: 11px;
            min-width: 22px;
            height: 22px;
        }

        & .v-pagination__item--active {
            background-color: #5CDF81 !important;
        }

        & .v-pagination__navigation {
            height: 22px;
            border-radius: 10px;
        }
    }

    /deep/ table.v-table tbody td {
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        line-height: normal;
        color: #575870;
    }
    .history-no-data{
        display: block;
        text-align: center;
    }

    .count-places{
        outline: none;
    }

    .standard-text{
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
        color: #6B6B81;
    }
</style>