<template>
    <div class="nav-bar">
        <div class="menu">
            <div class="menu-icon"
                 @click="menuToggle"
            >
                <svg width="22" height="22" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H18V2.01562H0V0ZM0 6.98438V5.01562H18V6.98438H0ZM0 12V9.98438H18V12H0Z" fill="#1F2041" fill-opacity="0.5"/>
                </svg>
            </div>
            <router-link tag="a" to="/dashboard" class="logo">
                <img src="../../assets/images/logo_itm.png" alt="">
                <span>system</span>
            </router-link>
        </div>
        <div class="nav-bar-content">
            <div class="balance-wrap">
                <div class="balance">
                    <span>Баланс</span>
                    <p>&#8381; {{companyData.account.balance}}</p>
                </div>
                <div class="company">
                    <span>Компания</span>
                    <p>{{companyData.company_name}}</p>
                </div>
            </div>
            <div class="alert-search">
                <a href="#" class="alert">
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.9844 15.0156V9.01562C12.9844 7.73438 12.625 6.67188 11.9062 5.82812C11.1875 4.95312 10.2188 4.51562 9 4.51562C7.78125 4.51562 6.8125 4.95312 6.09375 5.82812C5.375 6.67188 5.01562 7.73438 5.01562 9.01562V15.0156H12.9844ZM15 13.9844L17.0156 16V16.9844H0.984375V16L3 13.9844V9.01562C3 7.45312 3.39062 6.09375 4.17188 4.9375C4.98438 3.78125 6.09375 3.03125 7.5 2.6875V1.98438C7.5 1.57812 7.64062 1.23438 7.92188 0.953125C8.20312 0.640625 8.5625 0.484375 9 0.484375C9.4375 0.484375 9.79688 0.640625 10.0781 0.953125C10.3594 1.23438 10.5 1.57812 10.5 1.98438V2.6875C11.9062 3.03125 13 3.78125 13.7812 4.9375C14.5938 6.09375 15 7.45312 15 9.01562V13.9844ZM10.4062 19.4219C10 19.7969 9.53125 19.9844 9 19.9844C8.46875 19.9844 8 19.7969 7.59375 19.4219C7.1875 19.0156 6.98438 18.5469 6.98438 18.0156H11.0156C11.0156 18.5469 10.8125 19.0156 10.4062 19.4219Z" fill="#1F2041" fill-opacity="0.5"/>
                    </svg>
                    <span class="alert-count">5</span>
                </a>
                <a href="#" class="search">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.32812 9.70312C4.20312 10.5781 5.26562 11.0156 6.51562 11.0156C7.76562 11.0156 8.82812 10.5781 9.70312 9.70312C10.5781 8.82812 11.0156 7.76562 11.0156 6.51562C11.0156 5.26562 10.5781 4.20313 9.70312 3.32812C8.82812 2.45312 7.76562 2.01562 6.51562 2.01562C5.26562 2.01562 4.20312 2.45312 3.32812 3.32812C2.45312 4.20313 2.01562 5.26562 2.01562 6.51562C2.01562 7.76562 2.45312 8.82812 3.32812 9.70312ZM12.5156 11.0156L17.4844 15.9844L15.9844 17.4844L11.0156 12.5156V11.7188L10.7344 11.4375C9.54688 12.4688 8.14062 12.9844 6.51562 12.9844C4.70312 12.9844 3.15625 12.3594 1.875 11.1094C0.625 9.85938 0 8.32812 0 6.51562C0 4.70312 0.625 3.17188 1.875 1.92188C3.15625 0.640625 4.70312 0 6.51562 0C8.32812 0 9.85938 0.640625 11.1094 1.92188C12.3594 3.17188 12.9844 4.70312 12.9844 6.51562C12.9844 7.17188 12.8281 7.92188 12.5156 8.76562C12.2031 9.57812 11.8438 10.2344 11.4375 10.7344L11.7188 11.0156H12.5156Z" fill="#1F2041" fill-opacity="0.5"/>
                    </svg>
                </a>
                <v-menu
                        bottom
                        origin="center center"
                        transition="scale-transition"
                >
                    <template v-slot:activator="{ on }">
                        <v-btn
                                color="transparent"
                                dark
                                v-on="on"
                        >
                            <img :src="'http://test-redchain.ru/storage/avatars/' + getCompanyAvatar" alt="">
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-tile
                                v-for="(item, i) in settings"
                                :key="i"
                                @click=""
                        >
                            <v-list-tile-title>{{ item }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from '@/stores/modules/layouts/types';
    export default {
        name: "nav-bar",
        data() {
            return {
                settings: {
                    profile: "Редактировать Профиль",
                    logout: "Выход",
                },
                balance: "23,540",
                company: "Tez Tour",
            }
        },
        computed: {
          getCompanyAvatar() {
              return this.$store.state.auth.user.profile.avatar;
          },
          companyData() {
              return this.$store.state.auth.user.admincompany;
          }
        },
        methods: {
            menuToggle() {
                this.$store.dispatch('layouts/' + types.A_MENU_SHOW);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .nav-bar{
        position: fixed;
        width: 100%;
        height: 70px;
        display: grid;
        grid-template-columns: 220px 1fr;
        padding: 5px 0 5px 10px;
        background-color: #fff;
        box-shadow: 0px 2px 10px rgba(31, 32, 65, 0.1);
        z-index: 10;

        .menu{
            display: flex;
            align-items: center;
            align-self: center;

            svg{
                margin: 0px 3px 0px 23px;
                cursor: pointer;
            }
        }
        .logo{
            padding: 5px 10px;
            text-decoration: none;
            cursor: pointer;

            img{
                width: 85px;
            }
            span{
                font-size: 10px;
                font-family: "Montserrat";
                background: rgba(31, 32, 65, 0.25);
                border-radius: 4px;
                color: #ffffff;
                font-weight: bold;
                padding: 3px 7px;
                margin-left: 14px;
            }
        }

        .nav-bar-content, .balance-wrap{
            display: flex;
        }

        .nav-bar-content{
            justify-self: end;
        }

        .balance-wrap{
            border-right: 2px solid rgba(31, 32, 65, 0.1);
            align-self: center;
            padding-right: 10px;

            .balance, .company{
                text-align: end;
                padding: 0 22px;
                display: grid;
                align-items: start;
            }
        }

        .alert-search{
            display: grid;
            grid-template-columns: repeat(3, auto);
            align-items: center;

            .alert{
                position: relative;
                margin: 0;

                span{
                    position: absolute;
                    top: 2px;
                    right: 11px;
                    width: 14px;
                    height: 14px;
                    background-color: #FF5B27;
                    text-align: center;
                    border-radius: 50%;
                    padding: 2px 0;
                    font-family: "Montserrat";
                    font-style: normal;
                    font-weight: bold;
                    font-size: 9px;
                    line-height: 9px;
                    text-align: center;
                    color: #FFFFFF;
                }
            }
            a{
                text-decoration: none;
                color: #333;
                font-size: 16px;
                padding: 0.75rem 1.25rem;
                transition: .1s all;

                &:hover{
                    opacity: .6;
                }
                &:last-child{
                    padding: 0 8px;
                }
            }
            /deep/.v-btn:not(.v-btn--depressed):not(.v-btn--flat){
                box-shadow: none;
                outline: none;
                margin: 0;
                padding: 0;
            }
            .alert{
                padding: 8px 19px 8px 20px;
            }
            .search{
                padding: 8px 0;
            }
            img{
                width: 34px;
                height: 34px;
                border-radius: 50%;
            }
        }
    }

    .balance, .company{
        span{
            font-family: "Montserrat";
            font-weight: bold;
            font-size: 10px;
            color: #575870;
            line-height: normal;
        }
        p{
            font-family: "Montserrat";
            font-weight: bold;
            font-size: 14px;
            line-height: 1;
            margin: 0;
            line-height: normal;
        }
    }
    .balance p{
        color: #6DE18D;
    }
    .company p{
        color: #FF8227;
    }
</style>