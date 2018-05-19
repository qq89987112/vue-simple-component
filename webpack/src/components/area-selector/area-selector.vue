<template>
  <div class="area-selector-component" ref="component" :class="{'active':isActive}">
    <!--<div class="top-bar"><i class="iconfont icon-i-left" @click="onBackClick"></i></div>-->
    <div class="area-list">
      <div class="area-item" v-for="item in list" @click="onItemClick(item)" :class="{active:area[type]===item}">
        {{addrname[item]}}
      </div>
    </div>
    <!--<m-button bottom @click.native="onCompleteClick">完成</m-button>-->
  </div>
</template>
<script>
  import addr from "./addr"

  function is(value) {
    return value !== undefined;
  }

  export default {
    name: 'register-page',
    props: ["value"],
    data() {
      this.addrname = addr.addrname;
      let value = this.value;
      return {
        area: {
          country: value.country,
          city: value.city,
          province: value.province,
        },
        isActive: false
      }
    },
    computed: {
      list() {
        let addrobj = addr.addrobj,
          {province, city} = this.area;
        switch (this.type) {
          case "country":
            return addrobj[province][city];
            break;
          case "city":
            return Object.keys(addrobj[province]);
            break;
          case "province":
            return Object.keys(addrobj);
            break;
        }
      },
      type() {
        let {province, city} = this.area;


        let type;
        switch (true) {
          case is(province) && is(city):
            type = "country";
            break;
          case is(province):
            type = "city";
            break;
          default:
            type = "province";
            break;
        }
        return type;
      }
    },
    methods: {
      onBackClick() {
        let {province, city, country} = this.area;
        console.log("onBackClick", this.area);
        switch (true) {
          case is(country):
            this.$set(this.area, "city", undefined);
            this.$set(this.area, "country", undefined);
            break;
          case is(city):
            this.$set(this.area, "city", undefined);
            break;
          case is(province):
            this.$set(this.area, "province", undefined);
            break;
          default:
            this.isActive = false;
            break;
        }
      },
      onItemClick(item) {
        if (this.type === "country") {
          this.isActive = false;
        }
        this.$set(this.area, this.type, item);
        this.$nextTick(() => {
          this.$refs.component.scrollTop = 0;
        });


//
        let full = [],
          {province, city, country} = this.area;

        if (is(province)) {
          full.push(addr.addrname[province]);
        }

        if (is(city)) {
          full.push(addr.addrname[city]);
        }

        if (is(country)) {
          full.push(addr.addrname[country]);
        }
        console.log(full.join(","));
        this.area.full = full.join(",");
        this.$emit("input", Object.assign({},this.area));

      },
//      onCompleteClick() {
//
//      },
      toggle() {
        this.isActive = !this.isActive;
      }
    },
    created() {
      console.log(addr);
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .area-selector-component {
    display: none;
    height: 100vh;
    overflow: scroll;
    background-color: #EFEFF4;
    padding-bottom: R(50);

    &.active {
      display: block;
    }

    .top-bar {
      line-height: R(50);
      padding-left: R(15);
      background-color: #fff;
      margin-bottom:R(15);
    }
    .area-list {
      padding-top:R(1);
      background-color: #fff;
      .area-item {
        padding-left: R(15);
        margin-top:R(10);
        line-height: R(30);
        font-size: R(14);

        &.active {
          background-color: #34495e;
          color: white;
        }
      }
    }
  }
</style>
