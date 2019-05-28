<template>
    <div class="search-content">
        <div class="search-services">
            <div class="headline">
                <h3 class="headline-style">ПОИСК УСЛУГ</h3>
            </div>
            <div class="services-settings">
                <v-radio-group
                        v-model="service_search.settingsSelected.radio"
                        @change="changeWay()"
                        :mandatory="false">
                    <v-radio
                            label="В одну сторону"
                            color="#5CDF81"
                            :value= 1
                    ></v-radio>
                    <v-radio
                            label="Туда-обратно"
                            color="#5CDF81"
                            :value= 2
                    ></v-radio>
                    <v-radio
                            label="Многосегментный"
                            color="#5CDF81"
                            :value= 3
                    ></v-radio>
                </v-radio-group>
                <cSelect inputLabel="Только прямые" v-model="service_search.settingsSelected.select"></cSelect>
            </div>
        </div>
        <div class="country-settings">
            <div class="from-wrap">
                <h3 class="headline-style">Откуда</h3>
                <cSelectInput
                        :class="{ 'select--error': $v.service_search.from_id.$error }"
                        v-model.trim="service_search.from_id"
                        :itemText="'name_ru'"
                        :itemValue="'id'"
                        :selectItems="fromCities"
                        @input="selectToCity(service_search.from_id)"
                        selectPlaceholder="Пункт отправления"
                >
                    <svg slot="icon" width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.375 5.71875C20.75 5.9375 20.9844 6.25 21.0781 6.65625C21.1719 7.0625 21.1094 7.4375 20.8906 7.78125C20.7031 8.125 20.4062 8.35938 20 8.48438C16.125 9.51562 12.9062 10.375 10.3438 11.0625L5.04688 12.4688L3.45312 12.9375C3.23438 12.5625 2.35938 11.0625 0.828125 8.4375L2.28125 8.0625L4.25 9.5625L9.21875 8.25L5.09375 1.07812L7.01562 0.5625L13.9062 6.98438L19.25 5.57812C19.6562 5.45312 20.0312 5.5 20.375 5.71875ZM1.48438 15.9844H20.5156V18H1.48438V15.9844Z" fill="#1F2041" fill-opacity="0.5"/>
                    </svg>
                </cSelectInput>
                <div class="select-error-text" v-if="$v.service_search.from_id.$error">Заполните поле</div>
            </div>
            <div class="country-icon" @click="reverseCities()">
                <svg :class="[rotateIcon ? 'rotate-icon' : 'rotate-icon-none']" width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0.984375L19.9844 5.01562H16.9844V12C16.9844 13.0938 16.5938 14.0312 15.8125 14.8125C15.0312 15.5938 14.0938 15.9844 13 15.9844C11.9062 15.9844 10.9688 15.5938 10.1875 14.8125C9.40625 14.0312 9.01562 13.0938 9.01562 12V5.01562C9.01562 4.48438 8.8125 4.01563 8.40625 3.60938C8 3.20312 7.53125 3 7 3C6.46875 3 6 3.20312 5.59375 3.60938C5.1875 4.01563 4.98438 4.48438 4.98438 5.01562V12H7.98438L4 15.9844L0.015625 12H3.01562V5.01562C3.01562 3.92188 3.40625 2.98438 4.1875 2.20312C4.96875 1.39063 5.90625 0.984375 7 0.984375C8.09375 0.984375 9.03125 1.39063 9.8125 2.20312C10.5938 2.98438 10.9844 3.92188 10.9844 5.01562V12C10.9844 12.5312 11.1875 13 11.5938 13.4062C12 13.8125 12.4688 14.0156 13 14.0156C13.5312 14.0156 14 13.8125 14.4062 13.4062C14.8125 13 15.0156 12.5312 15.0156 12V5.01562H12.0156L16 0.984375Z" fill="#1F2041" fill-opacity="0.5"/>
                </svg>
            </div>
            <div class="to-wrap">
                <h3 class="headline-style">куда</h3>
                <cSelectInput
                        :class="{ 'select--error': $v.service_search.to_id.$error }"
                        v-model.trim="service_search.to_id"
                        :itemText="'name_ru'"
                        :itemValue="'id'"
                        :selectItems="toCities"
                        @input="selectFromCity(service_search.to_id)"
                        selectPlaceholder="Пункт прибытия"
                >
                    <svg slot="icon" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0156 12.4375C9.45312 11.7188 6.23438 10.8594 2.35938 9.85938L0.765625 9.39062V4.23438L2.21875 4.60938L3.15625 6.95312L8.125 8.26562V0.015625L10.0469 0.53125L12.8125 9.53125L18.1094 10.9375C18.5156 11.0625 18.8125 11.3125 19 11.6875C19.2188 12.0312 19.2812 12.4062 19.1875 12.8125C19.0625 13.2188 18.8281 13.5156 18.4844 13.7031C18.1406 13.8906 17.7656 13.9375 17.3594 13.8438L12.0156 12.4375ZM0.484375 16.9844H19.5156V19H0.484375V16.9844Z" fill="#1F2041" fill-opacity="0.5"/>
                    </svg>
                </cSelectInput>
                <div class="select-error-text" v-if="$v.service_search.to_id.$error">Заполните поле</div>
            </div>
        </div>
        <div class="date-settings">
            <div class="date">
                <h3 class="headline-style">Дата вылета</h3>
                <cDate
                        :class="{ 'date--error': $v.service_search.date.$error }"
                        :minDate="currentDate"
                        v-model="$v.service_search.date.$model"
                        @blur="$v.service_search.date.$touch()"
                        @dateChangeTwo="service_search.date = $event"
                ></cDate>
                <div class="error-text" v-if="$v.service_search.date.$error">Не правильная дата</div>
                <cSlider class="custom-slider" @sliderChange="service_search.dateTime = $event"></cSlider>
            </div>
            <div v-show="service_search.settingsSelected.radio == 2" class="date">
                <h3 class="headline-style">Дата обратного вылета</h3>
                <cDate
                        :class="{ 'date--error': $v.service_search.date_departure.$error }"
                        v-model="$v.service_search.date_departure.$model"
                        @blur="$v.service_search.date_departure.$touch()"
                        :minDate="currentDate"
                        @dateChangeTwo="service_search.date_departure = $event"
                ></cDate>
                <div class="error-text" v-if="$v.service_search.date_departure.$error">Не правильная дата</div>
                <cSlider class="custom-slider" @sliderChange="service_search.dateTimeDeparture = $event"></cSlider>
            </div>
            <div class="older">
                <h3 class="headline-style">Взрослые</h3>
                <cCount
                        v-model="service_search.passangers_count"
                        :countValue="1"
                        :minValue="1"
                        :maxValue="countMaxValue('older')"
                ></cCount>
            </div>
            <div class="children">
                <h3 class="headline-style">Дети</h3>
                <cCount
                        v-model="service_search.childrenCount"
                        :maxValue="countMaxValue('children')"
                ></cCount>
            </div>
            <div class="babies">
                <h3 class="headline-style">Младенцы</h3>
                <cCount
                        v-model="service_search.babiesCount"
                        :maxValue="countMaxValue('baby')"
                ></cCount>
            </div>
        </div>
        <div class="services-class">
            <h3 class="headline-style">Класс обслуживания</h3>
            <div class="services-settings">
                <v-radio-group v-model="service_search.fare_id" :mandatory="false">
                    <v-radio
                            label="Эконом"
                            color="#5CDF81"
                            :value= 2
                    ></v-radio>
                    <v-radio
                            label="Бизнес"
                            color="#5CDF81"
                            :value= 1
                    ></v-radio>
                </v-radio-group>
            </div>
        </div>
        <div class="search-btn">
            <div class="btn-size" @click="search()">
                <cButton buttonValue="Поиск" ></cButton>
            </div>
        </div>
        <div class="result-content-wrap" v-show="showResult">
            <div class="headline">
                <h3 class="headline-style">Результаты поиска</h3>
                <span class="result-count">{{"Найдено вариантов: "}}{{service_search.settingsSelected.radio == 1 ? getSearchResultOneWay.length : searchPaginData.length}}</span>
            </div>
            <div class="loader" v-show="showLoader">
                <img class="loader-icon" src="../../assets/images/SVG/search-icon/Rolling-1s-200px.svg">
            </div>
            <div
                    v-if="service_search.settingsSelected.radio == 1"
                    class="result-content"
                    v-for="(item, key) of getSearchResultOneWay"
            >

                <div class="result-wrap" @click="getShowMoreMet(key)" v-bind="(test) ? test[key]: false">
                    <div class="map-info">
                        <span class="map-from bold-text">{{departureCity(item.flightplaces.schedule[0].departure_at)}}</span>
                        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.11609 14.8544L6.97937 8.84265L2.86609 8.84265L1.74109 10.3544L0.616088 10.3544L1.35437 7.71765L0.616088 5.11609L1.74109 5.11609L2.86609 6.59265L6.97937 6.59265L5.11609 0.616088L6.59265 0.616088L10.3544 6.59265L14.4677 6.59265C14.7723 6.59265 15.0302 6.69812 15.2411 6.90906C15.4755 7.14343 15.5927 7.41296 15.5927 7.71765C15.5927 8.02234 15.4755 8.28015 15.2411 8.49109C15.0302 8.72546 14.7723 8.84265 14.4677 8.84265L10.3544 8.84265L6.59265 14.8544L5.11609 14.8544Z" fill="#5CDF81"/>
                        </svg>
                        <span class="map-to bold-text">{{arrivalCity(item.flightplaces.schedule[0].arrival_at)}}</span>
                        <span class="start-date">{{"вылет "}}{{momentDateSearch(item.flightplaces.period_begin_at)}}</span>

                        <div class="company-logo">
                            <img src="../../assets/images/imageAPI.png" alt="">
                        </div>
                    </div>
                    <div v-if="getShowMore[key]" class="time-info">
                        <div class="departure">
                            <h5 class="normal-text">Вылет</h5>
                            <span class="bold-text">{{item.flightplaces.schedule[0].time_departure_at|substr5}}</span>
                        </div>
                        <div class="arrival">
                            <h5 class="normal-text">Прилет</h5>
                            <span class="bold-text">{{item.flightplaces.schedule[0].time_arrival_at|substr5}}</span>
                        </div>
                        <div class="transplants">
                            <h5 class="normal-text">Пересадки</h5>
                            <span class="bold-text">{{(item.flightplaces.schedule.length == 1) ? timeInfo.transplants : 'С пересадками'}}</span>
                        </div>
                        <div class="on-way">
                            <h5 class="normal-text">В пути</h5>
                            <span class="bold-text">{{getTravelTime(item.flightplaces.schedule[0].time_departure_at, item.flightplaces.schedule[0].time_arrival_at)}}</span>
                        </div>
                        <div class="flight">
                            <h5 class="normal-text">Рейс</h5>
                            <span class="bold-text">{{item.flightplaces.schedule[0].flights}}</span>
                        </div>
                    </div>
                </div>
                <div v-if="getShowMore[key]" class="dashed-border"></div>
                <div v-if="getShowMore[key]" class="result-buy grid-column-3">
                    <div class="result-info">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.57422 4.25V3.07422H5.42578V4.25H6.57422ZM6.57422 8.92578V5.42578H5.42578V8.92578H6.57422ZM1.87109 1.89844C3.01953 0.75 4.39583 0.175781 6 0.175781C7.60417 0.175781 8.97135 0.75 10.1016 1.89844C11.25 3.02865 11.8242 4.39583 11.8242 6C11.8242 7.60417 11.25 8.98047 10.1016 10.1289C8.97135 11.2591 7.60417 11.8242 6 11.8242C4.39583 11.8242 3.01953 11.2591 1.87109 10.1289C0.740885 8.98047 0.175781 7.60417 0.175781 6C0.175781 4.39583 0.740885 3.02865 1.87109 1.89844Z" fill="#0094FF"/>
                        </svg>
                        <a
                                @click="showPopup(item, departureCity(item.flightplaces.schedule[0].departure_at), arrivalCity(item.flightplaces.schedule[0].arrival_at), getTravelTime(item.flightplaces.schedule[0].time_departure_at, item.flightplaces.schedule[0].time_arrival_at))"
                        >Подробнее</a>
                    </div>
                    <div class="announcement">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.57422 7.75V6.57422H5.42578V7.75H6.57422ZM6.57422 5.42578V1.92578H5.42578V5.42578H6.57422ZM10.6758 0.175781C10.9857 0.175781 11.25 0.294271 11.4688 0.53125C11.7057 0.75 11.8242 1.01432 11.8242 1.32422V8.32422C11.8242 8.63411 11.7057 8.90755 11.4688 9.14453C11.25 9.38151 10.9857 9.5 10.6758 9.5H2.5L0.175781 11.8242V1.32422C0.175781 1.01432 0.285156 0.75 0.503906 0.53125C0.740885 0.294271 1.01432 0.175781 1.32422 0.175781H10.6758Z" fill="#575870"/>
                        </svg>
                        <a href="#">Правила тарифов</a>
                    </div>
                    <div class="ticker-price" @click="openModal(item, departureCity(item.flightplaces.schedule[0].departure_at), arrivalCity(item.flightplaces.schedule[0].arrival_at), getTravelTime(item.flightplaces.schedule[0].time_departure_at, item.flightplaces.schedule[0].time_arrival_at))">
                        <span class="price">{{item.flightplaces.ow + item.flightplaces.infant_ow}} TMT</span>
                        <cButton buttonValue="Забронировать"></cButton>
                    </div>
                </div>
            </div>
            <div
                    class="result-content"
                    v-if="service_search.settingsSelected.radio == 2"
                    v-for="(item) of searchPaginData"
                    :key="item.id"
            >
                <div class="result-wrap">
                    <div class="map-info">
                        <span class="map-from bold-text">{{departureCity(item.tuda.flightplaces.schedule[0].departure_at)}}</span>
                        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.11609 14.8544L6.97937 8.84265L2.86609 8.84265L1.74109 10.3544L0.616088 10.3544L1.35437 7.71765L0.616088 5.11609L1.74109 5.11609L2.86609 6.59265L6.97937 6.59265L5.11609 0.616088L6.59265 0.616088L10.3544 6.59265L14.4677 6.59265C14.7723 6.59265 15.0302 6.69812 15.2411 6.90906C15.4755 7.14343 15.5927 7.41296 15.5927 7.71765C15.5927 8.02234 15.4755 8.28015 15.2411 8.49109C15.0302 8.72546 14.7723 8.84265 14.4677 8.84265L10.3544 8.84265L6.59265 14.8544L5.11609 14.8544Z" fill="#5CDF81"/>
                        </svg>
                        <span class="map-to bold-text">{{arrivalCity(item.tuda.flightplaces.schedule[0].arrival_at)}}</span>
                        <span class="start-date">{{"вылет "}}{{momentDateSearch(item.tuda.flightplaces.period_begin_at)}}</span>

                        <div class="company-logo">
                            <img src="../../assets/images/imageAPI.png" alt="">
                        </div>
                    </div>
                    <div class="result-row">
                        <div class="time-info">
                            <div class="departure">
                                <h5 class="normal-text">Вылет</h5>
                                <span class="bold-text">{{item.tuda.flightplaces.schedule[0].time_departure_at|substr5}}</span>
                            </div>
                            <div class="arrival">
                                <h5 class="normal-text">Прилет</h5>
                                <span class="bold-text">{{item.tuda.flightplaces.schedule[0].time_arrival_at|substr5}}</span>
                            </div>
                            <div class="transplants">
                                <h5 class="normal-text">Пересадки</h5>
                                <span class="bold-text">{{(item.tuda.flightplaces.schedule.length < 2) ? timeInfo.transplants : 'С пересадками'}}</span>
                            </div>
                            <div class="on-way">
                                <h5 class="normal-text">В пути</h5>
                                <span class="bold-text">{{getTravelTime(item.tuda.flightplaces.schedule[0].time_departure_at, item.tuda.flightplaces.schedule[0].time_arrival_at)}}</span>
                            </div>
                            <div class="flight">
                                <h5 class="normal-text">Рейс</h5>
                                <span class="bold-text">{{item.tuda.flightplaces.schedule[0].flights}}</span>
                            </div>
                        </div>
                        <div class="result-info">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.57422 4.25V3.07422H5.42578V4.25H6.57422ZM6.57422 8.92578V5.42578H5.42578V8.92578H6.57422ZM1.87109 1.89844C3.01953 0.75 4.39583 0.175781 6 0.175781C7.60417 0.175781 8.97135 0.75 10.1016 1.89844C11.25 3.02865 11.8242 4.39583 11.8242 6C11.8242 7.60417 11.25 8.98047 10.1016 10.1289C8.97135 11.2591 7.60417 11.8242 6 11.8242C4.39583 11.8242 3.01953 11.2591 1.87109 10.1289C0.740885 8.98047 0.175781 7.60417 0.175781 6C0.175781 4.39583 0.740885 3.02865 1.87109 1.89844Z" fill="#0094FF"/>
                            </svg>
                            <a
                                    @click="showPopup(item.tuda, departureCity(item.tuda.flightplaces.schedule[0].departure_at), arrivalCity(item.tuda.flightplaces.schedule[0].arrival_at), getTravelTime(item.tuda.flightplaces.schedule[0].time_departure_at, item.tuda.flightplaces.schedule[0].time_arrival_at), false)"
                            >Подробнее</a>
                        </div>
                    </div>
                    <div class="border-dashed-2" v-if="item.obratno"></div>
                    <div class="result-row" v-if="item.obratno">
                        <div class="time-info">
                            <div class="departure">
                                <h5 class="normal-text">Вылет</h5>
                                <span class="bold-text">{{item.obratno.flightplaces.schedule[0].time_departure_at|substr5}}</span>
                            </div>
                            <div class="arrival">
                                <h5 class="normal-text">Прилет</h5>
                                <span class="bold-text">{{item.obratno.flightplaces.schedule[0].time_arrival_at|substr5}}</span>
                            </div>
                            <div class="transplants">
                                <h5 class="normal-text">Пересадки</h5>
                                <span class="bold-text">{{(item.obratno.flightplaces.schedule.length < 3) ? timeInfo.transplants : 'С пересадками'}}</span>
                            </div>
                            <div class="on-way">
                                <h5 class="normal-text">В пути</h5>
                                <span class="bold-text">{{getTravelTime(item.obratno.flightplaces.schedule[0].time_departure_at, item.obratno.flightplaces.schedule[0].time_arrival_at)}}</span>
                            </div>
                            <div class="flight">
                                <h5 class="normal-text">Рейс</h5>
                                <span class="bold-text">{{item.obratno.flightplaces.schedule[0].flights}}</span>
                            </div>
                        </div>
                        <div class="result-info">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.57422 4.25V3.07422H5.42578V4.25H6.57422ZM6.57422 8.92578V5.42578H5.42578V8.92578H6.57422ZM1.87109 1.89844C3.01953 0.75 4.39583 0.175781 6 0.175781C7.60417 0.175781 8.97135 0.75 10.1016 1.89844C11.25 3.02865 11.8242 4.39583 11.8242 6C11.8242 7.60417 11.25 8.98047 10.1016 10.1289C8.97135 11.2591 7.60417 11.8242 6 11.8242C4.39583 11.8242 3.01953 11.2591 1.87109 10.1289C0.740885 8.98047 0.175781 7.60417 0.175781 6C0.175781 4.39583 0.740885 3.02865 1.87109 1.89844Z" fill="#0094FF"/>
                            </svg>
                            <a
                                    @click="showPopup(item.obratno, departureCity(item.obratno.flightplaces.schedule[0].departure_at), arrivalCity(item.obratno.flightplaces.schedule[0].arrival_at), getTravelTime(item.obratno.flightplaces.schedule[0].time_departure_at, item.obratno.flightplaces.schedule[0].time_arrival_at), false)"
                            >Подробнее</a>
                        </div>
                    </div>
                </div>
                <div class="dashed-border"></div>
                <div class="result-buy">
                    <div class="announcement">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.57422 7.75V6.57422H5.42578V7.75H6.57422ZM6.57422 5.42578V1.92578H5.42578V5.42578H6.57422ZM10.6758 0.175781C10.9857 0.175781 11.25 0.294271 11.4688 0.53125C11.7057 0.75 11.8242 1.01432 11.8242 1.32422V8.32422C11.8242 8.63411 11.7057 8.90755 11.4688 9.14453C11.25 9.38151 10.9857 9.5 10.6758 9.5H2.5L0.175781 11.8242V1.32422C0.175781 1.01432 0.285156 0.75 0.503906 0.53125C0.740885 0.294271 1.01432 0.175781 1.32422 0.175781H10.6758Z" fill="#575870"/>
                        </svg>
                        <a href="#">Правила тарифов</a>
                    </div>
                    <div class="ticker-price" @click="openModal(item.tuda, departureCity(item.tuda.flightplaces.schedule[0].departure_at), arrivalCity(item.tuda.flightplaces.schedule[0].arrival_at),getTravelTime(item.tuda.flightplaces.schedule[0].time_departure_at, item.tuda.flightplaces.schedule[0].time_arrival_at), item.obratno, getTravelTime(item.obratno.flightplaces.schedule[0].time_departure_at, item.obratno.flightplaces.schedule[0].time_arrival_at))">
                        <span class="price">{{item.tuda.flightplaces.ow + item.tuda.flightplaces.infant_ow}} TMT</span>
                        <cButton buttonValue="Забронировать"></cButton>
                    </div>
                </div>
            </div>
            <v-pagination
                    v-model="page"
                    :length="pagLength"
                    :total-visible="7"
                    @input="pageChange(page)"
            ></v-pagination>
        </div>

<!--        CRANE         -->


        <div class="result-content-wrap" v-show="showResult">
            <div class="headline">
                <h3 class="headline-style">Результаты поиска Crane</h3>
                <span class="result-count">{{"Найдено вариантов: "}}{{craneResult.length}}</span>
            </div>
            <div class="loader" v-show="showLoader">
                <img class="loader-icon" src="../../assets/images/SVG/search-icon/Rolling-1s-200px.svg">
            </div>
            <div
                    class="result-content"
                    v-for="(item, key) of craneResult"
            >

                <div class="result-wrap" @click="getShowMoreMetCrane(key)" v-bind="(testCrane) ? testCrane[key]: false">
                    <div class="map-info">
                        <span class="map-from bold-text">{{item.departureAirport.name_ru}}</span>
                        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.11609 14.8544L6.97937 8.84265L2.86609 8.84265L1.74109 10.3544L0.616088 10.3544L1.35437 7.71765L0.616088 5.11609L1.74109 5.11609L2.86609 6.59265L6.97937 6.59265L5.11609 0.616088L6.59265 0.616088L10.3544 6.59265L14.4677 6.59265C14.7723 6.59265 15.0302 6.69812 15.2411 6.90906C15.4755 7.14343 15.5927 7.41296 15.5927 7.71765C15.5927 8.02234 15.4755 8.28015 15.2411 8.49109C15.0302 8.72546 14.7723 8.84265 14.4677 8.84265L10.3544 8.84265L6.59265 14.8544L5.11609 14.8544Z" fill="#5CDF81"/>
                        </svg>
                        <span class="map-to bold-text">{{item.arrivalAirport.name_ru}}</span>
                        <span class="start-date">{{"вылет "}}{{momentDateSearch(item.arrivalDateTime.value)}}</span>

                        <div class="company-logo">
                            <img src="../../assets/images/imageAPI.png" alt="">
                        </div>
                    </div>
                    <div v-if="getShowMoreCrane[key]" class="time-info">
                        <div class="departure">
                            <h5 class="normal-text">Вылет</h5>
                            <span class="bold-text">{{momentTime(new Date(item.departureDateTime.value).getTime())}}</span>
                        </div>
                        <div class="arrival">
                            <h5 class="normal-text">Прилет</h5>
                            <span class="bold-text">{{momentTime(new Date(item.arrivalDateTime.value).getTime())}}</span>
                        </div>
                        <div class="transplants">
                            <h5 class="normal-text">Пересадки</h5>
<!--                            <span class="bold-text">{{(item.flightplaces.schedule.length == 1) ? timeInfo.transplants : 'С пересадками'}}</span>-->
                        </div>
                        <div class="on-way">
                            <h5 class="normal-text">В пути</h5>
                            <span class="bold-text">{{getTravelTime(momentTime(new Date(item.departureDateTime.value).getTime()), momentTime(new Date(item.arrivalDateTime.value).getTime()))}}</span>
                        </div>
                        <div class="flight">
                            <h5 class="normal-text">Рейс</h5>
                            <span class="bold-text">{{item.flightNumber}}</span>
                        </div>
                    </div>
                </div>
                <div v-if="getShowMoreCrane[key]" class="dashed-border"></div>
                <div v-if="getShowMoreCrane[key]" class="result-buy grid-column-3">
                    <div class="result-info">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.57422 4.25V3.07422H5.42578V4.25H6.57422ZM6.57422 8.92578V5.42578H5.42578V8.92578H6.57422ZM1.87109 1.89844C3.01953 0.75 4.39583 0.175781 6 0.175781C7.60417 0.175781 8.97135 0.75 10.1016 1.89844C11.25 3.02865 11.8242 4.39583 11.8242 6C11.8242 7.60417 11.25 8.98047 10.1016 10.1289C8.97135 11.2591 7.60417 11.8242 6 11.8242C4.39583 11.8242 3.01953 11.2591 1.87109 10.1289C0.740885 8.98047 0.175781 7.60417 0.175781 6C0.175781 4.39583 0.740885 3.02865 1.87109 1.89844Z" fill="#0094FF"/>
                        </svg>
                        <a
                                @click="showPopup(item, item.departureAirport.name_ru, item.arrivalAirport.name_ru, getTravelTime(momentTime(new Date(item.departureDateTime.value).getTime()), momentTime(new Date(item.arrivalDateTime.value).getTime())), true)"
                        >Подробнее</a>
                    </div>
                    <div class="announcement">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.57422 7.75V6.57422H5.42578V7.75H6.57422ZM6.57422 5.42578V1.92578H5.42578V5.42578H6.57422ZM10.6758 0.175781C10.9857 0.175781 11.25 0.294271 11.4688 0.53125C11.7057 0.75 11.8242 1.01432 11.8242 1.32422V8.32422C11.8242 8.63411 11.7057 8.90755 11.4688 9.14453C11.25 9.38151 10.9857 9.5 10.6758 9.5H2.5L0.175781 11.8242V1.32422C0.175781 1.01432 0.285156 0.75 0.503906 0.53125C0.740885 0.294271 1.01432 0.175781 1.32422 0.175781H10.6758Z" fill="#575870"/>
                        </svg>
                        <a href="#">Правила тарифов</a>
                    </div>
                    <div class="ticker-price" @click="openModal(item, item.departureAirport.name_ru, item.arrivalAirport.name_ru, getTravelTime(momentTime(new Date(item.departureDateTime.value).getTime()), momentTime(new Date(item.arrivalDateTime.value).getTime())), true)">
<!--                        <span class="price">{{item.flightplaces.ow + item.flightplaces.infant_ow}} TMT</span>-->
                        <cButton buttonValue="Забронировать"></cButton>
                    </div>
                </div>
            </div>
        </div>
        <popup
                :showModal="showModal"
                :flightData="popupData"
                :cityF="popupCityF"
                :cityT="popupCityT"
                :isCrane="posapIsCrane"
                :travelTime="popupTravelTime"
                @hidePopup="showModal = $event"
        ></popup>
    </div>
</template>

<script>
    import moment from 'moment'

    import cSelect from "@/components/base_components/cSelect";
    import cSelectInput from "@/components/base_components/cSelectInput";
    import cInput from "@/components/base_components/cInput";
    import cDate from "@/components/base_components/cDate";
    import cSlider from "@/components/base_components/cSlider";
    import cCount from "@/components/base_components/cCount";
    import cButton from "@/components/base_components/cButton";
    import popup from "@/views/search/popup";

    import * as feesTypes from "@/stores/modules/controls/types";
    import * as searchTypes from "@/stores/modules/service_search/types";
    import { required, minValue, requiredIf } from 'vuelidate/lib/validators'

    export default {
        name: "search",
        components: {
            cSelect,
            cSelectInput,
            cInput,
            cDate,
            cSlider,
            cCount,
            cButton,
            popup
        },
        data () {
            return {
                rotateIcon: false,
                changeCities: false,
                posapIsCrane: false,
                popupData: {},
                popupCityF: '',
                popupCityT: '',
                popupTravelTime: '',
                showModal: false,
                searchPaginData: [],
                searchPaginationLength: 1,
                page: 1,
                showLoader: false,
                currentDate: '',
                cityValid: '',
                travelTime: "",
                travelTime2: "",
                test: null,
                testCrane: null,
                showId: 0,
                dialog: false,
                showResult: false,
                showMore: [],
                airlines: [],
                cities: [],
                city: [],
                flightData: {},
                flightData2: {},
                cityFrom: "",
                cityTo: "",
                fromCities: [],
                toCities: [],
                service_search: {
                    from_id: [],
                    to_id: [],
                    settingsSelected: {
                        radio: 1,
                        select: false
                    },
                    date: '',
                    date_departure: '',
                    fare_id: 2,
                    dateTime: [],
                    dateTimeDeparture: [],
                    passangers_count: 1,
                    childrenCount: 0,
                    babiesCount: 0,
                    servicesClass: 0,
                },
                timeInfo: {
                    departure: '09:55',
                    arrival: '15:10',
                    transplants: 'Прямой',
                    onWay: '3ч 15 мин',
                    flight: 'T5 728'
                },
            }
        },
        validations: {
            service_search: {
                date: {
                    required,
                    minValue: function (val) {
                        let date = new Date(val).getTime()
                        let dateMin = new Date(this.currentDate).getTime()
                        if(date < dateMin) {
                            return false
                        } else {
                            return true
                        }
                    }
                },
                date_departure: {
                    required: requiredIf( function () {
                        if (this.service_search.settingsSelected.radio == 1) {
                            return false
                        } else {
                            return true
                        }
                    }),
                    minValue: function (val) {
                        let date = new Date(val).getTime()
                        let dateMin = new Date(this.currentDate).getTime()
                        if (this.service_search.settingsSelected.radio == 1) {
                            return true
                        }
                        if(date < dateMin) {
                            return false
                        } else {
                            return true
                        }
                    }
                },
                from_id: {
                    required
                },
                to_id: {
                    required
                }
            }
        },
        mounted() {
            this.$store.dispatch("service_search/" + searchTypes.A_CLEAR_SEARCH_RESULT);
            moment().locale('ru')
            let day = moment().format('L');
            let res = day.split("/").reverse();
                day = [res[0],res[2],res[1]]
                res = day.join('-');
                console.log(res)
            this.currentDate = res;
            this.$store.dispatch("controls/" + feesTypes.A_FEES)
                .then(res => {
                    this.airlines.push(res);
                    let airports = this.airlines[0].airports;
                    this.cities.push(airports);
                    for ( let city of airports){
                        this.fromCities.push(city);
                        this.toCities.push(city);
                    }
                });
        },
        computed: {
            craneResult() {
              return (this.$store.state.service_search.search_result_crane) ? this.$store.state.service_search.search_result_crane : [];
            },
            pagLength() {
                let pages = this.$store.getters["service_search/getSearchResultLength"];
                return Math.ceil(pages / 10)
            },
            getShowMore() {
              return this.$store.getters["service_search/getShowMoreData"]
            },
            getShowMoreCrane() {
              return this.$store.getters["service_search/getShowMoreDataCrane"]
            },
            getShowMoreDataByIdd: {
                get() {
                    return this.$store.getters["service_search/getShowMoreDataById"](this.showId)
                },
                set(value) {
                    console.log(value);
                    this.showId = value
                }
            },
            getSearchData() {
                let data = (this.$store.getters["service_search/getSearchData"])(10) ? this.$store.getters["service_search/getSearchData"](10) : [];
                // this.$store.dispatch("service_search/" + searchTypes.A_CREATE_SHOW_MORE,  data);
                return data;
            },
            getSearchResultOneWay() {
              return (this.$store.getters["service_search/getSearchResultOneWay"]) ? this.$store.getters["service_search/getSearchResultOneWay"] : [];
            },
            getPassengerCount() {
                let passengerCount = {
                    older: this.service_search.passangers_count,
                    children: this.service_search.childrenCount,
                    baby: this.service_search.babiesCount
                };

                return passengerCount;
            }
        },
        methods: {
            reverseCities() {
                this.changeCities = !this.changeCities;
                this.rotateIcon = !this.rotateIcon;
                let to = this.service_search.to_id;
                this.service_search.to_id = this.service_search.from_id;
                this.service_search.from_id = to;
            },
            showPopup(data, cityF, cityT, time, isCrane) {
                console.log(isCrane)
                this.showModal = true;
                this.posapIsCrane = isCrane;
                this.popupData = data;
                this.popupCityF = cityF;
                this.popupCityT = cityT;
                this.popupTravelTime = time;
            },
            pageChange(page) {
                if(page) {
                    let item = (page * 10);
                    this.searchPaginData = this.$store.getters["service_search/getSearchData"](item)
                } else {
                    this.searchPaginData = this.getSearchData;
                }
            },

            momentDateSearch: function (date) {
                return moment(date).locale('ru').format('DD MMMM , dddd');
            },
            momentTime: function (date) {
                return moment(date).format('HH:mm');
            },
            countMaxValue(name) {
                let older = this.service_search.passangers_count;
                let children = this.service_search.childrenCount;
                let baby = this.service_search.babiesCount;

                if (name == 'older' && ((older + children + baby) > 8)) {
                    return (older)
                }else if (name == 'children' && ((older + children + baby) > 8)){
                    return (children)
                } else if (name == 'baby' && ((older + children + baby) > 8)){
                    return (baby)
                }
            },
            selectToCity(id) {
                if (this.cityValid != 2){
                    this.cityValid = 1;
                    let toCity = [];
                    this.fromCities.filter( (val) => {
                        if (val.id != id){
                            toCity.push(val)
                        }
                        this.toCities = toCity
                    })
                }
            },
            selectFromCity(id) {
                if (this.cityValid != 1) {
                    this.cityValid = 2;
                    let fromCity = [];
                    this.toCities.filter( (val) => {
                        if (val.id != id){
                            fromCity.push(val)
                        }
                        this.fromCities = fromCity
                    })
                }
            },
            getTravelTime(timeFrom, timeTo) {
                console.log(timeFrom)
                console.log(timeTo)
                let hours = 24;
                let minute = 60;
                let timeOne = timeFrom.split(':');
                let timeTwo = timeTo.split(':');
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
                        newTime = [time[0],time[2],":",time[1],time[3]]
                        return newTime.join('');
                    }else if ((hours + timeHours) < 10 && timeMinutes >= 10) {
                        time.unshift('0');
                        newTime = [time[0],time[1],":",time[2],time[3]]
                        return newTime.join('');
                    }
                    if (time.length == 3) {
                        time.unshift('0');
                        newTime = [time[1],time[2],":",time[0],time[3]]
                    }else {
                        newTime = [time[0],time[1],":",time[2],time[3]]
                    }
                    return newTime.join('');
                }else if (timeHours == 0 && timeMinutes < 0) {
                    let newTime = [];
                    let time = ("23"+ (60 + timeMinutes)).split('');
                    if (time.length == 3) {
                        time.unshift('0');
                        newTime = [time[1],time[2],":",time[0],time[3]]
                    }else {
                        newTime = [time[0],time[1],":",time[2],time[3]]
                    }
                    return newTime.join('');
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
                    return newTime.join('');
                }
            },
            getShowMoreMet(id) {
                this.$store.dispatch("service_search/" + searchTypes.A_CHANGE_SHOW_MORE, id);
                this.test = [];
                this.test.push(this.$store.getters["service_search/getShowMoreData"])
            },
            getShowMoreMetCrane(id) {
                this.$store.dispatch("service_search/" + searchTypes.A_CHANGE_SHOW_MORE_CRANE, id);
                this.testCrane = [];
                this.testCrane.push(this.$store.getters["service_search/getShowMoreData"])
            },
            openModal(val, cityFrom, cityTo, travelTime, val2, travelTime2) {
                console.log(val2)
                this.dialog = true;
                this.flightData = val;
                this.cityFrom = cityFrom;
                this.cityTo = cityTo;
                this.$store.dispatch("service_search/" + searchTypes.A_SAVE_BOOKING_DATA,
                    {
                        flightData: val,
                        cityFrom: cityFrom,
                        cityTo: cityTo,
                        passengerCount: this.getPassengerCount,
                        travelTime: travelTime,
                        flightData2: val2,
                        travelTime2: travelTime2
                    }
                )
                    .then(res => {
                        this.$router.push('booking');
                    });
            },
            departureCity(id) {
                let city = '';
                if (this.cities[0]) {
                    this.cities[0].filter((value) => {
                        if (value.id == id) {
                            city = value.name_ru;
                        }
                    });
                }

                return city;
            },
            arrivalCity(id) {
                let city = '';
                if (this.cities[0]){
                    this.cities[0].filter((value) => {
                        if (value.id == id) {
                            city = value.name_ru;
                        }
                    });
                }
                return city;
            },
            changeWay() {
                this.searchPaginData = [];
                this.$store.dispatch("service_search/" + searchTypes.A_CLEAR_SEARCH_RESULT);
            },
            search() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.$store.dispatch("service_search/" + searchTypes.A_CLEAR_SEARCH_RESULT);
                    this.showLoader = true;
                    this.showResult = true;
                    let data = null;
                    if (this.service_search.settingsSelected.radio == 2){
                        data = [
                            {
                                type_flight: 2,
                                date: this.service_search.date,
                                from_id: this.service_search.from_id,
                                to_id: this.service_search.to_id,
                                fare_id: this.service_search.fare_id,
                                adult: this.service_search.passangers_count,
                                child: this.service_search.childrenCount,
                                infant: this.service_search.babiesCount,
                            },
                            {
                                type_flight: 2,
                                date: this.service_search.date_departure,
                                from_id: this.service_search.to_id,
                                to_id: this.service_search.from_id,
                                fare_id: this.service_search.fare_id,
                                adult: this.service_search.passangers_count,
                                child: this.service_search.childrenCount,
                                infant: this.service_search.babiesCount,
                            }
                        ];
                    }else {
                        data = [
                            {
                                type_flight: 1,
                                date: this.service_search.date,
                                from_id: this.service_search.from_id,
                                to_id: this.service_search.to_id,
                                fare_id: this.service_search.fare_id,
                                adult: this.service_search.passangers_count,
                                child: this.service_search.childrenCount,
                                infant: this.service_search.babiesCount,
                            }
                        ]
                    }
                    let cityfrom = {
                        airport: {},
                        airport_name_eng: "",
                        airport_name_ru: "",
                        city: {},
                        country: {},

                    };
                    let cityto = {
                        airport: {},
                        airport_name_eng: "",
                        airport_name_ru: "",
                        city: {},
                        country: {},

                    };
                    this.airlines[0].airports.filter((val) => {
                        if (val.id == this.service_search.from_id) {
                            cityfrom.airport = val;
                        }
                    });
                    this.airlines[0].cities.filter((val) => {
                        if (val.id == cityfrom.airport.city_id) {
                            cityfrom.city = val;
                        }
                    });
                    this.airlines[0].countries.filter((val) => {
                        if (val.id == cityfrom.city.country_id) {
                            cityfrom.country = val;
                        }
                    });
                    cityfrom.airport_name_eng = cityfrom.airport.name_eng;
                    cityfrom.airport_name_ru = cityfrom.airport.name_ru;

                    this.airlines[0].airports.filter((val) => {
                        if (val.id == this.service_search.to_id) {
                            cityto.airport = val;
                        }
                    });
                    this.airlines[0].cities.filter((val) => {
                        if (val.id == cityto.airport.city_id) {
                            cityto.city = val;
                        }
                    });
                    this.airlines[0].countries.filter((val) => {
                        if (val.id == cityto.city.country_id) {
                            cityto.country = val;
                        }
                    });
                    cityfrom.airport_name_eng = cityto.airport.name_eng;
                    cityto.airport_name_ru = cityto.airport.name_ru;
                    let dataCrane = {
                        tiketway: 'ONE_WAY',
                        directflights: 'false',
                        classflight: "ECONOMY",
                        segments: [
                            {
                                adultpeople: parseInt(this.service_search.passangers_count),
                                baby: parseInt(this.service_search.babiesCount),
                                childrens: parseInt(this.service_search.childrenCount),
                                cityfrom: cityfrom,
                                cityto: cityto,
                                datehere: new Date(),
                                dateto: this.service_search.date,
                                skey: 0,
                            }
                        ],
                        countsegments: 1,
                        baby: parseInt(this.service_search.babiesCount),
                        childrens: parseInt(this.service_search.childrenCount),
                        adultpeople: parseInt(this.service_search.passangers_count),
                    };
                    this.$store.dispatch("service_search/" + searchTypes.A_SEARCH, {data: data, crane: dataCrane})
                        .then((res) => {
                            this.showLoader = false;
                            console.log(res);
                            this.pageChange(1)
                            // this.flightData = res.flights[0];
                        })
                        .catch(err=>{
                            this.showLoader = false;
                        })
                }
            }
        },
        watch: {
            // 'service_search.passangers_count'(val){
            //     this.passengerCount.older = val
            // },
            // 'service_search.childrenCount'(val){
            //     this.passengerCount.children = val
            // },
            // 'service_search.babiesCount'(val){
            //     this.passengerCount.baby = val
            // }
        }
    }
</script>

<style lang="scss" scoped>
    .search-content{
        padding: 29px 33px;
    }

    .search-services,.services-class{
        .headline {
            padding-bottom: 19px;
            border-bottom: 1px solid rgba(31, 32, 65, 0.05);
            h3{
                margin: 0;
            }
        }
        .services-settings{
            display: grid;
            grid-template-columns: 444px auto;
            align-items: center;
            grid-column-gap: 44px;
        }
        /deep/.v-input--radio-group__input{
            display: grid;
            grid-template-columns: repeat(3, auto);
            grid-column-gap: 30px;

            & div{
                margin: 0!important;
                & label{
                    padding-left: 8px;
                    margin: 0;
                    font-family: "Montserrat";
                    font-size: 12px;
                    color: #000000;
                }
            }
        }
    }
    .services-class{
        padding-top: 30px;
        .services-settings {
            /deep/ .v-input--radio-group__input {
                display: grid;
                grid-template-columns: repeat(3, auto);
                grid-column-gap: 20px;
            }
            /deep/.v-input--selection-controls {
                margin: 0;
                padding-top: 8px;
                & .v-input__slot{
                    margin-bottom: 25px;
                }
            }
        }
    }
    /deep/.v-menu{
        display: none;
    }

    .country-settings{
        display: flex;

        .from-wrap, .to-wrap{
            position: relative;
        }
        .country-icon{
            padding: 30px 10px 10px;
            cursor: pointer;
        }
        /deep/.v-select.v-text-field input {
            padding-left: 30px;
        }
        /deep/.v-select__selection.v-select__selection--comma {
            padding-left: 30px;
        }
    }

    .date-settings{
        padding-top: 39px;
        display: inline-grid;
        grid-template-columns: auto auto auto auto auto;
        grid-column-gap: 45px;
        .date{
            position: relative
        }
    }

    .custom-slider{
        width: 160px;
        height: 45px;
        /deep/.v-card__text{
            padding: 0;
            & .v-input--slider{
                margin: 0;
                & .v-input__slot{
                     margin: 0;
                }
            }
        }
    }



    .search-btn{
        padding-bottom: 24px;
        border-bottom: 1px solid rgba(31, 32, 65, 0.05);

        .btn-size{
            width: max-content;
        }
    }

    .headline-style{
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        text-transform: uppercase;
        color: #1F2041;
        margin-bottom: 5px;
    }

    .loader{
        display: flex;
        justify-content: center;
        padding: 15px 0;
        .loader-icon{
            width: 40px;
            height: 40px;
        }
    }

    /* _RESULT CONTENT_ */

    .result-content-wrap{

        .headline{
            display: flex;
            padding: 18px 0;
            align-items: center;
            h3{
                margin: 0 5px 0 0
            }
            .result-count{
                font-family: "Montserrat";
                line-height: normal;
                font-size: 12px;
                color: #575870;
            }
        }

        .result-content{
            background: #FBFBFB;
            border: 2px solid #EEEEEE;
            border-radius: 4px;
            width: min-content;
            margin-top: 5px;

            .result-row{
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                .result-info{
                    padding-right: 30px;
                    a{
                        text-decoration: none;
                        font-family: "Montserrat";
                        font-size: 12px;
                        line-height: normal;
                        color: #0094FF;
                        padding-left: 7px;
                        transition: .2s all;
                        &:hover{
                            color: #69bfff;
                        }
                    }
                }
            }
            .result-wrap{
                padding: 18px 4px 18px 24px;
                width: min-content;
                cursor: pointer;

                .map-info{
                    width: 654px;
                    display: inline-grid;
                    grid-template-columns: repeat(4, auto) 1fr;
                    align-items: center;

                    .bold-text{
                        font-family: "Montserrat";
                        font-weight: bold;
                        font-size: 12px;
                        line-height: normal;
                        color: rgba(31, 32, 65, 0.75);
                    }
                    .start-date{
                        font-family: "Montserrat";
                        font-size: 12px;
                        line-height: normal;
                        color: #6B6B81;
                    }
                    svg{
                        margin: 0 10px;
                    }
                    .map-to{
                        padding-right: 18px;
                    }
                    .company-logo{
                        justify-self: end;
                    }
                }
                .time-info{
                    display: inline-grid;
                    grid-template-columns: repeat(5, auto);
                    grid-column-gap: 33px;
                    padding-top: 11px;
                    justify-content: left;

                    h5{
                        margin: 0;
                    }
                    div:not(:nth-last-child(2)){
                        padding-right: 20px;
                    }
                    .normal-text{
                        font-family: "Montserrat";
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
                }
            }
            .dashed-border{
                border-bottom: 1px dashed rgba(31, 32, 65, 0.25);
            }
            .result-buy{
                display: grid;
                grid-template-columns: auto 1fr;
                align-items: center;
                padding: 9px 10px 10px 21px;
                &.grid-column-3{
                    grid-template-columns: auto auto 1fr;
                    a{
                        font-family: "Montserrat";
                        font-size: 12px;
                        line-height: normal;
                        color: #0094FF;
                        padding-left: 7px;
                        margin-right: 10px;
                    }
                }

                a{
                    text-decoration: none;
                }
                .announcement{
                    a{
                        font-family: "Montserrat";
                        font-size: 12px;
                        line-height: normal;
                        color: #575870;
                        padding-left: 7px;
                    }
                }
                .ticker-price{
                    justify-self: end;
                    display: flex;
                    align-items: center;

                    span{
                        font-family: "Montserrat";
                        font-weight: bold;
                        font-size: 18px;
                        line-height: normal;
                        text-transform: uppercase;
                        color: #4DC56F;
                        padding-right: 21px;
                    }
                    /deep/.c-button button{
                        padding: 9px 13px;
                        text-transform: none;
                        font-weight: 600;
                    }
                }
            }
        }

        .border-dashed-2{
            width: 96%;
            height: 4px;
            background-image: linear-gradient(to right, rgba(31, 32, 65, 0.25) 60%, rgba(255,255,255,0) 40%);
            background-position: bottom;
            background-size: 10px 2px;
            background-repeat: repeat-x;
        }

        /* _PAGINATION_ */

        /deep/.v-pagination {
            margin: 20px 0;
            li button{
                outline: none;
                i{
                    display: none;
                }
            }
            li:first-child button{
                position: relative;
                width: 60px;
                &:after{
                    content: 'Назад';
                    position: absolute;
                    top: 3px;
                    left: 14px;
                    font-size: 11px;
                }
            }
            li:last-child button{
                position: relative;
                width: 60px;
                &:after{
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
            & .v-pagination__item--active{
                background-color: #5CDF81!important;
            }
            & .v-pagination__navigation{
                height: 22px;
                border-radius:10px;
            }
        }
    }

    .rotate-icon{
        transform: rotate(-540deg);
        transition: all .7s ease-in-out;
    }
    .rotate-icon-none{
        transform: rotate(0deg);
        transition: all .7s ease-in-out;
    }

    .date--error{
        /deep/.v-input{
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
        /deep/.date-format{
            display: none;
        }
    }

    .select--error{
        /deep/.v-select > .v-input__control > .v-input__slot{
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
    }

    .error-text{
        position: absolute;
        bottom: 45px;
        color: red;
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
    }
    .select-error-text{
        position: absolute;
        bottom: -4px;
        color: red;
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
    }

</style>