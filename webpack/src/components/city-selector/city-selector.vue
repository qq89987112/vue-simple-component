<template>
  <div class="citiesLinkage">
    <select class="provinces" v-model="province" @change="m_province">
      <option value=""  style="display:none">请选择</option>
      <option v-for="(item,key) in provincesName" :value="key">{{item}}</option>
    </select>
    <select class="citys" v-model="city" v-if="province"  @change="m_city">
      <option value=""  style="display:none">请选择</option>
      <option v-for="(item,key) in citysName" :value="key">{{item}}</option>
    </select>
    <select class="countys" v-model="county" v-if="city" @change="m_county">
      <option value=""  style="display:none">请选择</option>
      <option v-for="(item,key) in countysName" :value="key">{{item}}</option>
    </select>
  </div>
</template>

<script>
  import {addrobj, addrname} from './addr.js'

  export default {
    data() {
      return {
        province: "",
        city: "",
        county: ""
      }
    },
    computed: {
      provincesName: function () {
        let provinceName = {};
        for (let i in addrobj) {
          provinceName[i] = addrname[i];
        }
        return provinceName
      },
      citysName: function () {
        let cityName = {};
        for (let i in addrobj[this.province]) {
          cityName[i] = addrname[i]
        }
        return cityName
      },
      countysName: function () {
        let
          city = this.city,
          province = this.province;

          if (city&&province) {
            let countyName = {};
            for (let i in addrobj[province][city]) {
              let county = addrobj[province][city][i];
              countyName[county] = addrname[county]
            }
            return countyName
          }

      }
    },
    methods: {
      emit() {

        let
          province = this.province,
          city = this.city,
          county = this.county;

        if(province&&city&&county){
          this.$emit("select",{
            province:addrname[province],
            city:addrname[city],
            county:addrname[county]
          })
        }

      },
      m_province: function () {
//        this.city = Object.getOwnPropertyNames(this.citysName)[0];
        this.emit();
        this.city = '';
        this.county = '';
      },
      m_city: function () {
//        this.county = Object.getOwnPropertyNames(this.countysName)[0];
        this.emit();
        this.county = '';
      },
      m_county: function () {
        this.emit();
      }
    }
  }
</script>


<style scoped>

</style>
