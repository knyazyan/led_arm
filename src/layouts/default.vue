<template>
    <div>
        <div>
            <layout-nav-bar></layout-nav-bar>
            <div :class="['content',{'max-width':!menuShow}]">
                <layout-side-bar></layout-side-bar>
                <router-view/>
            </div>
<!--            <div v-show="batteryStatus" class="battery-wrap">-->
<!--                <div class="battery">-->
<!--                    <div class="progress">{{batteryStatus}}</div>-->
<!--                </div>-->
<!--            </div>-->
        </div>
    </div>
</template>

<script>
    import NavBar from '@/components/layout/navBar';
    import SideBar from '@/components/layout/sideBar';

    export default {
        name: 'defaultTemplate',
        components: {
            'layout-nav-bar': NavBar,
            'layout-side-bar': SideBar,
        },
        data() {
            return {
                batteryStatus: false,
            }
        },
        mounted() {
            // navigator.getBattery().then( (battery) => {
            //     function updateChargeInfo() {
            //         batteryInfo()
            //     }
            //
            //     battery.addEventListener('levelchange', function () {
            //         batteryInfo()
            //     })
            //
            //     function batteryInfo() {
            //         console.log("Yor battery level:" + (battery.level * 100).toFixed(0) + "%")
            //         if ((battery.level * 100) < 60) {
            //             this.batteryStatus = true
            //
            //             console.log(this.batteryStatus)
            //         }else if ((battery.level * 100) > 60) {
            //             this.batteryStatus = true
            //         }
            //     }
            // })
        },
        computed: {
            menuShow() {
                return this.$store.getters["layouts/getMenuShow"]
            }
        }
    }
</script>
<style lang="scss" scoped>
    .content{
        display: grid;
        grid-template-columns: auto 1fr;
        padding-top: 70px;
        transition: .2s all;
        &.max-width{
            grid-template-columns: 1fr;
        }
    }
    .battery-wrap{
        position: fixed;
        right: 10px;
        bottom: 10px;
        background-color: #f3f3f3;
        padding: 20px;
        border-radius: 4px;
        box-shadow: 0 0 3px 0 #777;
        .battery{
            position: relative;
            width: 16px;
            height: 30px;
            border: 2px solid #575870;
            border-radius: 3px;
            &::after{
                content: '';
                position: absolute;
                top: -5px;
                left: 2px;
                width: 8px;
                height: 5px;
                border: 2px solid #575870;
                border-bottom: 2px solid #f3f3f3;
                border-radius: 3px 3px 0 0;
            }
            .progress{
                position: absolute;
                bottom: 0;
                left: 0;
                background-color: red;
                width: 100%;
                height: 20%;
                border-radius: 0;
                animation-name: progress;
                animation-duration: 1s;
                animation-iteration-count: infinite;
            }
        }
    }

    @keyframes progress {
        50%{background-color: #bb0000;}
    }

</style>
