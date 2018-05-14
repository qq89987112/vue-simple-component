<template>
  <div class="calendar-components">
    <p class="top-bar">
      <span class="left" @click="onLastMonthClick" :class="{invalid:isHead}"><i class="iconfont icon-i-left"></i>前一个月</span>
      <span class="center">{{title}}</span>
      <span class="right" @click="onNextMonthClick">后一个月<i class="iconfont icon-right"></i></span>
    </p>
    <div class="content">
      <p class="week-bar">
        <span>周日</span><span>周一</span><span>周二</span><span>周三</span><span>周四</span><span>周五</span><span>周六</span></p>
      <p class="days">
        <span class="day" v-for="item in days" :class="{invalid:isInvalid(item),active:item===activeItem}" @click="onDayClick(item)">{{item}}</span>
      </p>
    </div>
    <m-button bottom @click.native="onResultClick">选好了</m-button>
  </div>
</template>

<script>
  import moment from "moment"
  import "./zh-cn"

  export default {
    name: 'calendar',
    props:["value"],
    data(){
      // this.moment = moment(this.value||undefined);
      this.moment = moment().add(1,'d');
      this.selected = '';
      return {
        days:[],
        title:'',
        isHead:true,
        today:50,
        activeItem:undefined
      }
    },
    components:{
    },
    created() {
//      let moment2 = moment();
//      console.log(moment2.daysInMonth());
//      console.log(moment2.subtract(1,"month").date(1).day());
      this.show(this.moment);
    },
    methods:{
      onResultClick(){
        this.$emit("result",this.selected);
      },
      onDayClick(item){
        if(!this.isInvalid(item)) {
          this.activeItem = item;
          let clone = moment(this.moment);
          clone.date(item);
          this.selected = clone.format("YYYY-MM-DD");
        }
      },
      isInvalid(item){
        if(item){
          let clone = moment(this.moment);
          clone.date(item);
          // let day = clone.day();
          // return clone.isBefore(moment(),"day") ||  day===0 || day ===6;
          return clone.isBefore(moment(),"day");
        }
        return false;
      },
      onLastMonthClick(){
        if(this.isHead){
          return;
        }
        this.activeItem = undefined;
        this.moment.subtract(1,"month");
        this.isHead = this.moment.isSame(moment(),"month");
        this.show(this.moment);
      },
      onNextMonthClick(){
        this.activeItem =undefined;
        this.isHead = false;
        this.moment.add(1,"month");
        this.show(this.moment);
      },
      show(momentArg){
        momentArg = moment(momentArg);
          let
          day = momentArg.date(1).day() || 7;
//        填充前面几个
        let arr = Array(day%7).fill('');

//        填充时间

        let daysInMonth = momentArg.daysInMonth();
        for(let i=1;i<=daysInMonth;i++){
          arr.push(i);
        }

//      填充后面几个
        let footer = momentArg.date(daysInMonth).day() || 7;

        for(let i=0;i<=7-footer;i++){
          arr.push("");
        }
        console.log(arr);
        this.days = arr;
        this.title=momentArg.format("YYYY年MM月");
        this.today = +momentArg.date();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .calendar-components {
    .top-bar {
      line-height:R(50);
      text-align: center;

      .iconfont{
        font-size:R(14);
        font-weight:bold;
        color: #cccccc;
      }
      .left {
        float: left;
        &.invalid{
          color: #cccccc;
        }
      }
      .center {
      }
      .right {
        float: right;
      }
    }
    .content {
      margin-top:R(15);
      .week-bar {
        line-height:R(40);
        span{
          display: inline-block;
          width: (100%/7);
          text-align: center;
          font-size:R(14);
          &:first-child{
            color: #ee554d;
          }
          &:last-child{
            color: #ee554d;
          }
        }
      }
      .days {
        overflow: hidden;
        .day{
          float: left;
          width: (100%/7);
          text-align: center;
          font-size:R(14);
          line-height:R(30);
          height:R(30);
          margin: R(8) 0;
          position: relative;

          &.invalid{
            text-decoration: line-through;
            color: #bbbbbb;
          }

          &.active::before{
            content: '';
            display: inline-block;
            border-radius: 50%;
            width:R(25);
            height:R(20);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            border: R(1) solid red;
          }

          /*<!--&:nth-child(7n),&:nth-child(7n-6){-->*/
            /*<!--@extend .invalid;-->*/
          /*<!--}-->*/
          &:last-child{
          }
        }

      }
      .day {
      }
    }
  }
</style>
