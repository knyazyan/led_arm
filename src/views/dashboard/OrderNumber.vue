<template>
    <div class="order-number-content">
        <div class="order-info">
            <div class="headline">
                <h5 class="headline-text">Информация по заказу</h5>
            </div>
            <div class="order-info-content">
                <div class="item-row">
                    <div class="item-standard">
                        <span class="standard-text">Дата создания</span>
                        <span class="bold-text">{{getTimeCreated}}</span>
                    </div>
                    <div class="item-standard">
                        <span class="standard-text">Дата изменения</span>
                        <span class="bold-text">{{getTimeUpdated}}</span>
                    </div>
                    <div class="item-standard">
                        <span class="standard-text">Автор</span>
                        <span class="bold-text">{{getAuthor}}</span>
                    </div>
                </div>
                <div class="item-row">
                    <div class="item-standard">
                        <span class="standard-text">Компания</span>
                        <span class="bold-text">{{getCompany}}</span>
                    </div>
                    <div class="item-standard">
                        <span class="standard-text">Способ оплаты</span>
                        <span class="bold-text">{{getCash}}</span>
                    </div>
                    <div class="item-standard">
                        <span class="standard-text">Контактное лицо</span>
                        <span class="bold-text">Иванов Иван</span>
                    </div>
                </div>
                <div class="item-row">
                    <div class="item-standard">
                        <span class="standard-text">Комментарий</span>
                        <span class="bold-text">{{orderData.comment ? orderData.comment : '-'}}</span>
                    </div>
                    <div class="item-standard">
                        <span class="standard-text">Сумма</span>
                        <span class="amount-text">{{orderData.order_summary ? orderData.order_summary : 0.00}} &#8381;</span>
                    </div>
                    <div class="item-standard">
                        <span class="standard-text">Статус</span>
                        <span :class="['status-text',{'orange-text' : orderData.status != 1}]">{{orderData.status == 1 ? 'Выполнен' : 'В работе'}}</span>
                    </div>
                </div>
            </div>
            <div class="helper-button">
                <cButton
                        buttonValue="Закрыть"
                        buttonColor="#1F2041"
                        buttonPadding="15px 19px 15px 16px"
                ></cButton>
                <cButton
                        buttonValue="изменить"
                        buttonPadding="15px 27px 15px 24px"
                ></cButton>
                <cButton
                        buttonValue="обмен"
                        buttonColor="#FFA927"
                        buttonPadding="15px 39px 15px 37px"
                ></cButton>
            </div>
        </div>
        <div class="passengers">
            <div class="headline">
                <h5 class="headline-text">Пассажиры</h5>
            </div>
            <div class="item-row">
                <div class="item-standard">
                    <span class="standard-text">ФИО пассажира</span>
                </div>
                <div class="item-standard">
                    <span class="standard-text">Дата Рождения</span>
                </div>
                <div class="item-standard">
                    <span class="standard-text">Документ</span>
                </div>
            </div>
            <div class="item-content-row">
                <div class="item-standard">
                    <span class="bold-text">IVANOV IVAN IVANONICH</span>
                </div>
                <div class="item-standard">
                    <span class="bold-text">15.11.1985</span>
                </div>
                <div class="item-standard">
                    <span class="bold-text">1245 1234512</span>
                </div>
                <div class="remove-passenger">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.74609 12.2539C4.94141 13.4258 6.35938 14.0117 8 14.0117C9.64062 14.0117 11.0469 13.4258 12.2188 12.2539C13.4141 11.0586 14.0117 9.64062 14.0117 8C14.0117 6.35937 13.4141 4.95312 12.2188 3.78125C11.0469 2.58594 9.64062 1.98828 8 1.98828C6.35938 1.98828 4.94141 2.58594 3.74609 3.78125C2.57422 4.95312 1.98828 6.35937 1.98828 8C1.98828 9.64062 2.57422 11.0586 3.74609 12.2539ZM2.69141 2.72656C4.16797 1.25 5.9375 0.511719 8 0.511719C10.0625 0.511719 11.8203 1.25 13.2734 2.72656C14.75 4.17969 15.4883 5.9375 15.4883 8C15.4883 10.0625 14.75 11.832 13.2734 13.3086C11.8203 14.7617 10.0625 15.4883 8 15.4883C5.9375 15.4883 4.16797 14.7617 2.69141 13.3086C1.23828 11.832 0.511719 10.0625 0.511719 8C0.511719 5.9375 1.23828 4.17969 2.69141 2.72656ZM4.23828 7.26172H11.7617V8.73828H4.23828V7.26172Z" fill="#FF5B27"/>
                    </svg>
                </div>
            </div>
            <div class="item-content-row">
                <div class="item-standard">
                    <span class="bold-text">IVANOVA SVETLANA</span>
                </div>
                <div class="item-standard">
                    <span class="bold-text">14.04.1986</span>
                </div>
                <div class="item-standard">
                    <span class="bold-text">1245 1234817</span>
                </div>
                <div class="remove-passenger">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.74609 12.2539C4.94141 13.4258 6.35938 14.0117 8 14.0117C9.64062 14.0117 11.0469 13.4258 12.2188 12.2539C13.4141 11.0586 14.0117 9.64062 14.0117 8C14.0117 6.35937 13.4141 4.95312 12.2188 3.78125C11.0469 2.58594 9.64062 1.98828 8 1.98828C6.35938 1.98828 4.94141 2.58594 3.74609 3.78125C2.57422 4.95312 1.98828 6.35937 1.98828 8C1.98828 9.64062 2.57422 11.0586 3.74609 12.2539ZM2.69141 2.72656C4.16797 1.25 5.9375 0.511719 8 0.511719C10.0625 0.511719 11.8203 1.25 13.2734 2.72656C14.75 4.17969 15.4883 5.9375 15.4883 8C15.4883 10.0625 14.75 11.832 13.2734 13.3086C11.8203 14.7617 10.0625 15.4883 8 15.4883C5.9375 15.4883 4.16797 14.7617 2.69141 13.3086C1.23828 11.832 0.511719 10.0625 0.511719 8C0.511719 5.9375 1.23828 4.17969 2.69141 2.72656ZM4.23828 7.26172H11.7617V8.73828H4.23828V7.26172Z" fill="#FF5B27"/>
                    </svg>
                </div>
            </div>
            <div class="add-passenger">
                <cInput inputPlaceholder="Добавить пассажира">
                    <svg slot="icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.70312 12.1406C5.54688 11.3906 7.3125 11.0156 9 11.0156C10.6875 11.0156 12.4375 11.3906 14.25 12.1406C16.0938 12.8594 17.0156 13.8125 17.0156 15V17.0156H0.984375V15C0.984375 13.8125 1.89062 12.8594 3.70312 12.1406ZM11.8125 7.82812C11.0312 8.60938 10.0938 9 9 9C7.90625 9 6.96875 8.60938 6.1875 7.82812C5.40625 7.04688 5.01562 6.10938 5.01562 5.01562C5.01562 3.92188 5.40625 2.98438 6.1875 2.20312C6.96875 1.39062 7.90625 0.984375 9 0.984375C10.0938 0.984375 11.0312 1.39062 11.8125 2.20312C12.5938 2.98438 12.9844 3.92188 12.9844 5.01562C12.9844 6.10938 12.5938 7.04688 11.8125 7.82812Z" fill="#1F2041" fill-opacity="0.5"/>
                    </svg>
                </cInput>
                <cButton buttonValue="Добавить" buttonPadding="13px 25px 13px 22px"></cButton>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/orders/types";

    import cButton from "@/components/base_components/cButton";
    import cInput from "@/components/base_components/cInput";
    import moment from 'moment'

    export default {
        name: "OrderNumber",
        components: {
            cButton,
            cInput
        },
        data() {
            return {

            }
        },
        mounted() {

        },
        methods: {

        },
        computed: {
            getTimeCreated() {
                let time = this.orderData ? moment(this.orderData.created_at).locale('ru').format('DD MMMM YYYY | HH:mm') : '-';
                return time
            },
            getTimeUpdated() {
                let time = this.orderData ? moment(this.orderData.updated_at).locale('ru').format('DD MMMM YYYY | HH:mm') : '-';
                return time
            },
            orderData() {
                return this.$store.getters['orders/getOrder'] != null ? this.$store.getters['orders/getOrder'] : '';
            },
            ordersData() {
                console.log(this.$store.getters['orders/getOrders'])
                return this.$store.getters['orders/getOrders'] != null ? this.$store.getters['orders/getOrders'] : '';
            },
            getCompany() {
                let company = '-';
                if (this.ordersData){
                    this.ordersData.companies.filter( val => {
                        if (val.id == this.orderData.company_registry_id){
                            company = val.company_name;
                        }
                    })
                }
                return company
            },
            getAuthor(){
                if (this.ordersData){
                    return this.ordersData.user.profile.first_name
                } else {
                    return '-'
                }
            },
            getCash() {
                if (this.orderData.type_payment == null){
                    return '-'
                } else if (this.orderData.type_payment == 2){
                    return 'Наличные'
                }else {
                    return '-'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .order-number-content{
        padding-bottom: 70px;

        .headline{
            padding: 26px 0;
            h5{
                margin: 0;
            }
        }
        .order-info-content{

            .item-row{
                max-width: 682px;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                padding-bottom: 11px;
                &:not(:last-child){
                    border-bottom: 1px dashed rgba(31, 32, 65, 0.25);
                }
                &:not(:first-child){
                    padding-top: 10px;
                }
                .amount-text{
                    font-family: "Montserrat";
                    font-weight: bold;
                    font-size: 12px;
                    line-height: normal;
                    text-transform: uppercase;
                    color: #4DC56F;
                }
                .status-text{
                    width: max-content;
                    border: 2px solid #5CDF81;
                    box-sizing: border-box;
                    border-radius: 2px;
                    padding: 2px 13px;
                    font-family: "Montserrat";
                    font-weight: normal;
                    font-size: 10px;
                    line-height: normal;
                    color: #1F2041;
                    &.orange-text{
                        border: 2px solid #FF5B27;
                    }
                }
                span{
                    display: block;
                    &.standard-text{
                        padding-bottom: 4px;
                    }
                }
            }
        }

        .helper-button{
            display: inline-grid;
            grid-template-columns: auto auto auto;
            grid-gap: 21px;
            padding: 13px 0 48px;
        }

        .passengers{
            max-width: 682px;

            .item-row{
                display: grid;
                grid-template-columns: 220px 220px 220px;
                padding-bottom: 6px;
            }
            .item-content-row{
                display: grid;
                grid-template-columns: 220px 220px 220px auto;
                border-bottom: 1px dashed rgba(31, 32, 65, 0.25);
                padding: 3px 0;
            }
            .add-passenger{
                display: inline-grid;
                grid-template-columns: auto auto;
                grid-gap: 22px;
                padding-top: 34px;
            }
        }
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
</style>