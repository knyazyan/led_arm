<template>
    <div class="schedule-add-content">
        <div class="schedule-add-header">
            <div class="headline">
                <h5>{{($route.params.id) ? 'Редактирование' : 'Добавление'}} расписания</h5>
            </div>
        </div>
        <div class="schedule-param-wrap">
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Номер рейса</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.flights.$error }"
                            v-model.trim="$v.sendParam.flights.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.flights.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Откуда</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParam.departure_at.$error }"
                            v-model.trim="$v.sendParam.departure_at.$model"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            :selectItems="fromCities"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParam.departure_at.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Куда</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParam.arrival_at.$error }"
                            v-model.trim="$v.sendParam.arrival_at.$model"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            :selectItems="toCities"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParam.arrival_at.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Период С</span>
                    <cDate
                            :minDate="currentDate"
                            :class="{ 'date--error': $v.sendParam.period_begin_at.$error }"
                            v-model.trim="$v.sendParam.period_begin_at.$model"
                            @dateChangeTwo="sendParam.period_begin_at = $event"
                    ></cDate>
                    <div class="error-text" v-if="$v.sendParam.period_begin_at.$error">Выберите дату</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Период По</span>
                    <cDate
                            :currentDayShow="false"
                            :minDate="minDateLimit == '' ? currentDate : minDateLimit"
                            :class="{ 'date--error': $v.sendParam.period_end_at.$error }"
                            v-model.trim="$v.sendParam.period_end_at.$model"
                            @dateChangeTwo="sendParam.period_end_at = $event"
                    ></cDate>
                    <div class="error-text" v-if="$v.sendParam.period_end_at.$error">Выберите дату</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Время вылета</span>
                    <cInput
                            :class="{ 'time--error': $v.sendParam.time_departure_at.$error }"
                            v-model.trim="$v.sendParam.time_departure_at.$model"
                            :inputMask="'##:##'"
                            @timeChange="sendParam.time_departure_at = $event"
                            @input="getTravelTime();timeFormatDeparture()"
                            inputPadding="9px 10px"
                            inputPlaceholder="Время..."
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.time_departure_at.$error">Выберите время</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Время прибытия</span>
                    <cInput
                            :class="{ 'time--error': $v.sendParam.time_arrival_at.$error }"
                            v-model.trim="$v.sendParam.time_arrival_at.$model"
                            :inputMask="'##:##'"
                            @timeChange="sendParam.time_arrival_at = $event"
                            @input="getTravelTime();timeFormatarrival()"
                            inputPadding="9px 10px"
                            inputPlaceholder="Время..."
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.time_arrival_at.$error">Выберите время</div>
                </div>
            </div>
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Следующий день</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParam.next_day.$error }"
                            v-model.trim="$v.sendParam.next_day.$model"
                            :selectItems="next_day"
                            :itemText="'name'"
                            :itemValue="'value'"
                            @input="getTravelTime()"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParam.next_day.$error">Выберите валюту</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Время в пути</span>
                    <cInput
                            v-model="travelTime"
                            :disabled="true"
                            inputPadding="9px 10px"
                    ></cInput>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Тип ВС</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParam.bc_types_id.$error }"
                            v-model.trim="$v.sendParam.bc_types_id.$model"
                            :selectItems="getVsType()"
                            :itemText="'text'"
                            :itemValue="'value'"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParam.bc_types_id.$error">Выберите валюту</div>
                </div>
<!--                <div class="paragraph">-->
<!--                    <span class="standard-text">Есть пересадка</span>-->
<!--                    <cSelectInput-->
<!--                            :class="{ 'select&#45;&#45;error': $v.sendParam.is_transplantation.$error }"-->
<!--                            v-model.trim="$v.sendParam.is_transplantation.$model"-->
<!--                            :selectItems="transfer"-->
<!--                            :itemText="'name'"-->
<!--                            :itemValue="'value'"-->
<!--                            selectPlaceholder="Выбрать..."-->
<!--                    ></cSelectInput>-->
<!--                    <div class="error-text" v-if="$v.sendParam.is_transplantation.$error">Заполните поле</div>-->
<!--                </div>-->
                <div class="paragraph">
                    <span class="standard-text">Авиакомпания</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParam.airlines_id.$error }"
                            v-model.trim="$v.sendParam.airlines_id.$model"
                            :selectItems="getAirlines()"
                            :itemText="'text'"
                            :itemValue="'value'"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParam.airlines_id.$error">Выберите валюту</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Дни недели</span>
                    <cDateBtn
                            :dateSelected="true"
                            :itemCount="7"
                            :buttonPadding="'8px 18px 8px 18px'"
                            :itemValue="week"
                            :label="weekText"
                            @change="week = $event"
                    ></cDateBtn>
                </div>
            </div>

            <div v-show="sendParam.is_transplantation" class="paragraph row-4">
                <div class="paragraph">
                    <span class="standard-text">Номер рейса второго плеча</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.flights_second.$error }"
                            v-model.trim="$v.sendParam.flights_second.$model"
                            inputPadding="9px 10px"
                            selectPlaceholder="Выбрать..."
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.flights_second.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Аэропорт пересадки</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParam.airport_transplantation.$error }"
                            v-model.trim="$v.sendParam.airport_transplantation.$model"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            :selectItems="transplantationCities"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParam.airport_transplantation.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Тип ВС второго плеча</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParam.bc_types_id_second.$error }"
                            v-model.trim="$v.sendParam.bc_types_id_second.$model"
                            :selectItems="getVsType()"
                            :itemText="'text'"
                            :itemValue="'value'"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParam.bc_types_id_second.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Время прилета в пункт пересадки</span>
                    <cTime
                            :class="{ 'time--error': $v.sendParam.time_departure_at_second.$error }"
                            v-model.trim="$v.sendParam.time_departure_at_second.$model"
                            @timeChange="sendParam.time_departure_at_second = $event"
                    ></cTime>
                    <div class="error-text" v-if="$v.sendParam.time_departure_at_second.$error">Выберите дату</div>
                </div>
            </div>
            <div v-show="sendParam.is_transplantation" class="paragraph row-4">
                <div class="paragraph">
                    <span class="standard-text">Время вылета из пункта пересадки</span>
                    <cTime
                            :class="{ 'time--error': $v.sendParam.time_arrival_at_second.$error }"
                            v-model.trim="$v.sendParam.time_arrival_at_second.$model"
                            @timeChange="sendParam.time_arrival_at_second = $event"
                    ></cTime>
                    <div class="error-text" v-if="$v.sendParam.time_arrival_at_second.$error">Выберите дату</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Следующий день</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParam.next_day_second.$error }"
                            v-model.trim="$v.sendParam.next_day_second.$model"
                            @input="getTravelTime('second')"
                            :selectItems="next_day"
                            :itemText="'name'"
                            :itemValue="'value'"
                            :inputDisabled="next_day_second"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParam.next_day_second.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Время в пути второго плеча</span>
                    <cInput
                            v-model="travelTimeSecond"
                            :disabled="true"
                            inputPadding="9px 10px"
                    ></cInput>
                </div>
            </div>
            <div class="paragraph">
                <div class="add-schedule-btn">
                    <cButton
                            @click="submit()"
                            :buttonValue="(this.$route.params.id) ? 'сохранить' : 'добавить'"
                    ></cButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'

    import { required, requiredIf } from 'vuelidate/lib/validators'

    import cDate from "@/components/base_components/cDate";
    import cTime from "@/components/base_components/cTime";
    import cSelectInput from "@/components/base_components/cSelectInput";
    import cInput from "@/components/base_components/cInput";
    import cButton from "@/components/base_components/cButton";
    import cDateBtn from "@/components/base_components/cDateBtn";
    import * as types from "@/stores/modules/blocks/types";
    import * as feesTypes from "@/stores/modules/controls/types";

    export default {
        name: "ScheduleAdd",
        components: {
            cDate,
            cTime,
            cSelectInput,
            cInput,
            cButton,
            cDateBtn
        },
        data() {
            return {
                currentDate: '',
                minDateLimit: '',
                valide_second: 0,
                fromCities: [],
                toCities: [],
                transplantationCities: [],
                airlines: [],
                travelTime: '',
                travelTimeSecond: '',
                dataSchedule: '',
                week: [],
                weekText: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
                selectedTransfer: '',
                transfer: [
                    {
                        name: 'Да',
                        value: true
                    },
                    {
                        name: 'Нет',
                        value: false
                    }
                ],
                next_day: [
                    {
                        name: 'Да',
                        value: true
                    },
                    {
                        name: 'Нет',
                        value: false
                    }
                ],
                sendParam: {
                    period_begin_at: '',
                    period_end_at: '',
                    time_departure_at: '',
                    time_arrival_at: '',
                    next_day: '',
                    flights: '',
                    bc_types_id: '',
                    is_transplantation: '',
                    airlines_id: '',
                    departure_at: '',
                    arrival_at: '',
                    flights_second: '',
                    airport_transplantation: '',
                    bc_types_id_second: '',
                    next_day_second: '',
                    time_departure_at_second: '',
                    time_arrival_at_second: '',
                }
            }
        },
        validations() {
            return {
                sendParam: {
                    period_begin_at: {
                        required
                    },
                    period_end_at: {
                        required
                    },
                    time_departure_at: {
                        required
                    },
                    time_arrival_at: {
                        required
                    },
                    next_day: {
                        required
                    },
                    flights: {
                        required
                    },
                    bc_types_id: {
                        required
                    },
                    is_transplantation: {
                        required
                    },
                    airlines_id: {
                        required
                    },
                    departure_at: {
                        required
                    },
                    arrival_at: {
                        required
                    },
                    flights_second: {
                        required: requiredIf( () => {
                            if(this.valide_second != 'valid') {
                                return false
                            } else {
                                return true
                            }
                        })
                    },
                    airport_transplantation: {
                        required: requiredIf( () => {
                            if(this.valide_second != 'valid') {
                                return false
                            } else {
                                return true
                            }
                        })
                    },
                    bc_types_id_second: {
                        required: requiredIf( () => {
                            if(this.valide_second != 'valid') {
                                return false
                            } else {
                                return true
                            }
                        })
                    },
                    next_day_second: {
                        required: requiredIf( () => {
                            if(this.valide_second != 'valid') {
                                return false
                            } else {
                                return true
                            }
                        })
                    },
                    time_departure_at_second: {
                        required: requiredIf( () => {
                            if(this.valide_second != 'valid') {
                                return false
                            } else {
                                return true
                            }
                        })
                    },
                    time_arrival_at_second: {
                        required: requiredIf( () => {
                            if(this.valide_second != 'valid') {
                                return false
                            } else {
                                return true
                            }
                        })
                    },
                }
            }
        },
        mounted() {
            this.sendParam.next_day = false
            let date = new Date();
            let day = moment().format('L');
            let res = day.split("/").reverse();
            day = [res[0],res[2],res[1]]
            res = day.join('-');
            this.currentDate = res;

            if(this.$route.params.id) {
                let data = this.$store.getters["blocks/getScheduleById"](this.$route.params.id);
                this.sendParam.flights = data.flights;
                this.sendParam.departure_at = data.departure_at;
                this.sendParam.arrival_at = data.arrival_at;
                this.sendParam.period_begin_at = data.period_begin_at;
                this.sendParam.period_end_at = data.period_end_at;
                this.sendParam.time_departure_at = data.time_departure_at;
                this.sendParam.time_arrival_at = data.time_arrival_at;
                this.sendParam.next_day = data.next_day;
                this.sendParam.bc_types_id = data.bc_types_id;
                this.sendParam.is_transplantation = data.is_transplantation;

                if (data.is_transplantation){
                    this.sendParam.flights_second = data.flights_second;
                    this.sendParam.airport_transplantation = data.airport_transplantation;
                    this.sendParam.bc_types_id_second = data.bc_types_id_second;
                    this.sendParam.next_day_second = data.next_day_second;
                    this.sendParam.time_departure_at_second = data.time_departure_at_second;
                    this.sendParam.time_arrival_at_second = data.time_arrival_at_second;
                }
                if (data.monday)
                    this.week.push(1);
                if (data.tuesday)
                    this.week.push(2);
                if (data.wednesday)
                    this.week.push(3);
                if (data.thursday)
                    this.week.push(4);
                if (data.friday)
                    this.week.push(5);
                if (data.saturday)
                    this.week.push(6);
                if (data.sunday)
                    this.week.push(7);
            }
            this.$store.dispatch("blocks/" + types.A_BLOCKS)
                .then(res => {
                    this.dataSchedule = res;
                });
            this.$store.dispatch("controls/" + feesTypes.A_FEES)
                .then(res => {
                    this.airlines.push(res);
                    let airports = res.airports;
                    for ( let city of airports){
                        this.fromCities.push(city);
                        this.toCities.push(city);
                        this.transplantationCities.push(city);
                    }
                });
        },
        computed: {
            next_day_second() {
                if (this.sendParam.time_arrival_at_second && this.sendParam.time_departure_at_second) {
                    return false
                } else {
                    return true
                }
            },
            getShedulItems(){
                let array = [];
                this.getSheduls.filter(function (val, key) {
                    array.push(val);
                    array[key]['textName'] = val.period_begin_at + ' / ' + val.period_end_at;
                });
                return array;
            },
            getSheduls() {
                if(this.$store.getters["blocks/getBlocks"] == null) {
                    this.$store.dispatch("blocks/" + types.A_BLOCKS)
                        .then(res => {
                            return res.schedules;
                        });
                } else {
                    return this.$store.getters["blocks/getBlocks"];
                }
            }
        },
        methods: {
            timeFormatDeparture() {
                let time = this.sendParam.time_departure_at.split('')
                if (time.length >= 2 && (parseInt(time[0] + time[1])) > 23){
                    time[0] = 2;
                    time[1] = 3;
                }
                if (time.length == 5 && (parseInt(time[3] + time[4])) > 59){
                    time[3] = 5;
                    time[4] = 9;
                }
                this.sendParam.time_departure_at = time.join('');
            },
            timeFormatarrival() {
                let time = this.sendParam.time_arrival_at.split('')
                if (time.length >= 2 && (parseInt(time[0] + time[1])) > 23){
                    time[0] = 2;
                    time[1] = 3;
                }
                if (time.length == 5 && (parseInt(time[3] + time[4])) > 59){
                    time[3] = 5;
                    time[4] = 9;
                }
                this.sendParam.time_arrival_at = time.join('');
            },
            getAirlines() {
                let airlines = [];
                let data = this.$store.getters['blocks/getAirlines'].filter((val) => {
                    airlines.push({
                        text: val.short_aviacompany_name_ru,
                        value: val.id
                    })
                });
                return airlines;
            },
            getVsType() {
                let vs = [];
                if (this.dataSchedule) {
                    this.dataSchedule.bc_types.filter((val) => {
                        vs.push({
                            text: val.name_ru,
                            value: val.id
                        })
                    });
                }
                return vs;
            },
            getTravelTime(text) {
                let hours = 24;
                let minute = 60;
                let timeOne = (!text) ? this.sendParam.time_departure_at.split(':') : this.sendParam.time_departure_at_second.split(':');
                let timeTwo = (!text) ? this.sendParam.time_arrival_at.split(':') : this.sendParam.time_arrival_at_second.split(':');
                let timeHours = (timeTwo[0] - timeOne[0]);
                let timeMinutes = (timeTwo[1] - timeOne[1]);
                if (timeHours < 0) {
                    if (timeMinutes < 0){
                        timeHours -= 1;
                        timeMinutes = (minute + timeMinutes);
                    }
                    let newTime = [];
                    let time = ((hours + timeHours) +""+ timeMinutes).split('');
                    if ((hours + timeHours) < 10 && timeMinutes < 10) {
                        time.unshift('0');
                        time.unshift('0');
                        newTime = [time[0],time[2],":",time[1],time[3]];
                        if (text == 'second') {
                            this.travelTimeSecond = newTime.join('');
                        }else {
                            this.travelTime = newTime.join('');
                        }
                        return;
                    }else if ((hours + timeHours) < 10 && timeMinutes >= 10) {
                        time.unshift('0');
                        newTime = [time[0],time[1],":",time[2],time[3]]
                        if (text == 'second') {
                            this.travelTimeSecond = newTime.join('');
                        }else {
                            this.travelTime = newTime.join('');
                        }
                        return;
                    }
                    if (time.length == 3) {
                        time.unshift('0');
                        newTime = [time[1],time[2],":",time[0],time[3]]
                    }else {
                        newTime = [time[0],time[1],":",time[2],time[3]]
                    }
                    if (text == 'second') {
                        this.travelTimeSecond = newTime.join('');
                    }else {
                        this.travelTime = newTime.join('');
                    }
                }else if (timeHours == 0 && timeMinutes < 0) {
                    let newTime = [];
                    let time = ("23"+ (60 + timeMinutes)).split('');
                    if (time.length == 3) {
                        time.unshift('0');
                        newTime = [time[1],time[2],":",time[0],time[3]]
                    }else {
                        newTime = [time[0],time[1],":",time[2],time[3]]
                    }
                    if (text == 'second') {
                        this.travelTimeSecond = newTime.join('');
                    }else {
                        this.travelTime = newTime.join('');
                    }
                } else {
                    if (timeMinutes < 0){
                        timeHours -= 1;
                        timeMinutes = (minute + timeMinutes);
                    }
                    let newTime = [];
                    let time = (timeHours +""+ timeMinutes).split('');
                    if (time.length == 3) {
                        time.unshift('0');
                        newTime = [time[0],time[1],":",time[2],time[3]]
                    }else if (time.length == 2) {
                        time.unshift('0');
                        time.unshift('0');
                        newTime = [time[0],time[2],":",time[1],time[3]]
                    }else if (time.length == 1) {
                        time.unshift('0');
                        time.unshift('0');
                        time.unshift('0');
                        newTime = [time[0],time[1],":",time[2],time[3]]
                    }else {
                        newTime = [time[0],time[1],":",time[2],time[3]]
                    }
                    if (text == 'second') {
                        if (this.sendParam.next_day_second) {
                            newTime[0] = parseInt(newTime[0]) + 2;
                            newTime[1] = parseInt(newTime[1]) + 4;
                        }
                        this.travelTimeSecond = newTime.join('');
                    }else {
                        if (this.sendParam.next_day) {
                            newTime[0] = parseInt(newTime[0]) + 2;
                            newTime[1] = parseInt(newTime[1]) + 4;
                        }
                        this.travelTime = newTime.join('');
                    }
                }
                let time = this.travelTime.split(':');
                time = (time[0]*time[1]);
                if (time != time){
                    this.travelTime = "00:00"
                }
            },
            submit() {
                this.$v.$touch();
                let send = this.sendParam;
                let week = this.week;
                let time = this.travelTime;
                send = {...send, ...{monday: false}};
                send = {...send, ...{tuesday: false}};
                send = {...send, ...{wednesday: false}};
                send = {...send, ...{thursday: false}};
                send = {...send, ...{friday: false}};
                send = {...send, ...{saturday: false}};
                send = {...send, ...{sunday: false}};

                send = { ...send, ...{time_arrival_transfer_at: time}};
                week.filter((val) => {
                    if (val == 1)
                        send.monday = true;
                    if (val == 2)
                        send.tuesday = true;
                    if (val == 3)
                        send.wednesday = true;
                    if (val == 4)
                        send.thursday = true;
                    if (val == 5)
                        send.friday = true;
                    if (val == 6)
                        send.saturday = true;
                    if (val == 7)
                        send.sunday = true;
                });

                if (!this.$v.$invalid) {
                    if(this.$route.params.id) {
                        send = { ...send, ...{schedule_id: this.$route.params.id}}
                        this.$store.dispatch("blocks/" + types.A_EDIT_SCHEDULE, send)
                            .then(res => {
                                this.$router.push("/schedule");
                                return res;
                            });
                    } else {
                        this.$store.dispatch("blocks/" + types.A_ADD_SCHEDULE, send)
                            .then(res => {
                                return res;
                            });
                        this.$router.push("/schedule");
                    }
                }
            }
        },
        watch: {
            'sendParam.period_begin_at'(val) {
                this.minDateLimit = val
            },
            'sendParam.is_transplantation'(val) {
                if (val) {
                    this.valide_second = 'valid'
                } else {
                    this.valide_second = 'invalid'
                }
            },
            'sendParam.time_arrival_at'(val) {
                if (val) {
                    this.getTravelTime();
                }
            },
            'sendParam.time_departure_at'(val) {
                if (val) {
                    this.getTravelTime();
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .schedule-add-content{
        padding: 0 33px 50px;
    }

    .headline{
        padding: 26px 0;
        h5{
            font-size: 16px;
            font-weight: 600;
            color: #1F2041;
            margin: 0;
        }
    }

    .schedule-param-wrap{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 33px;
        grid-row-gap: 20px;
    }

    .paragraph-wrap{
        display: grid;
        grid-template-rows: repeat(7, 1fr);
    }

    .paragraph{
        position: relative;
    }

    /deep/.v-menu {
        display: none;
    }
    /deep/.c-input input{
        width: 100%;
    }

    .row-4{
        display: grid;
        grid-template-rows: repeat(4, 1fr);
    }

    .standard-text{
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
        color: #6B6B81;
    }
    .bold-text{
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        line-height: normal;
        color: #575870;
    }
    .headline-text{
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        line-height: normal;
        text-transform: uppercase;
        color: #1F2041;
    }

    .error-text{
        position: absolute;
        bottom: -4px;
        color: red;
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
    }

    .form-group--error {
        /deep/input {
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
    }

    .select--error{
        /deep/.v-select > .v-input__control > .v-input__slot{
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
    }

    .date--error{
        /deep/.v-input{
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
        /deep/.date-format{
            left: unset;
            right: 0;
        }
    }

    .time--error{
        /deep/.v-text-field{
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
    }

    .btn--error{
        border-color: red;
        box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
    }
</style>