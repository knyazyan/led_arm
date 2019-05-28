<template>
    <div class="c-select">
        <input type="checkbox" id="select" v-model="text">
        <label for="select" class="select-label">{{inputLabel}}</label>
    </div>
</template>

<script>
    export default {
        name: 'c-select',
        props: {
            inputLabel: {
                type: String,
                default: ''
            },
            inputData: {
                type:Boolean,
                default: false
            }
        },
        data() {
            return {
                text: this.inputData
            }
        },
        watch: {
            text(val) {
                this.$emit('selected', val);
            }
        }
    }
</script>
<style lang="scss" scoped>
    #select{
        display: none;
    }

    .select-label{
        display: grid;
        grid-template-columns: 50px 1fr;
        align-items: center;
        cursor: pointer;
        font-family: "Montserrat";
        font-size: 12px;
        position: relative;
    }

    .select-label::before{
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 40px;
        height: 20px;
        background: #C4C4C4;
        border-radius: 10px;
        transition: 0.2s all;
    }

    .select-label::after{
        content: '';
        position: absolute;
        left: 4px;
        top: 3px;
        width: 15px;
        height: 14px;
        border-radius: 50%;
        background-color: #fff;
        transition: 0.2s all;
    }

    #select:checked + label{
        &::before{
            background-color: #5CDF81;
        }
        &::after{
            left: 21px;
        }
    }
</style>