<style lang="scss" scoped>
  @font-face {
    font-family: "iconfont";
    src:url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAT4AAsAAAAAB0wAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFZW7kkCY21hcAAAAYAAAABeAAABhp2YBr5nbHlmAAAB4AAAASwAAAE4TEDxPGhlYWQAAAMMAAAALwAAADYRa1KGaGhlYQAAAzwAAAAcAAAAJAfeA4RobXR4AAADWAAAAAwAAAAMC+kAAGxvY2EAAANkAAAACAAAAAgAdgCcbWF4cAAAA2wAAAAfAAAAIAESAF1uYW1lAAADjAAAAUUAAAJtPlT+fXBvc3QAAATUAAAAIQAAADJlgvF4eJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2Bk/sE4gYGVgYOpk+kMAwNDP4RmfM1gxMjBwMDEwMrMgBUEpLmmMDgwVDyXYG7438AQw9zA0AAUZgTJAQAlOAyFeJzFkMENgDAMAy9t6QMxQEfgwUC8mKMbd4xiQnkwQS05VhxLiQIsQBQPMYFdGA9OueZ+ZHU/eSZLjUBtpXf1nyqiWXYNKplpsHmr/9i87qPTV6iDOrGVl4QbjZsL8wAAeJwVj7tOw0AURO9d41dIbLzrd+I4tuMsyBAZY0KBSChoQBRIVJS0QdChNBRpkCgoqOhoEBI/ESR+BcFvYHBGoynONDMgAvx9CQvBBQbrsA1HcAaAUoaxRgKMeDkkGVqRaDmmJvCER3ISD4UDdGLJtItROXAkWdJRwy7uRMWIDwnH3XJM9rGwA0Sv7Z/TtEOFJ2y4vHtfnZBXtMKko4+3quPNiVn0mDJrUupR+qhIoqgQsqJreO3Yqqg2pOpN1H1rEW6QEJse908vWr02vXwob4LUURHnc2TtnvY+MXyj9p1vM+rJay3F9VtJ38TZz6rLmsHgG2rhMoRf8gIUIB3tYT0/llUc1F8ctAuSEcQP2s9ZdVVNaZ5S/GT57RKyvG9UU3w2luWhAf8tXDGZeJxjYGRgYADip5M3/onnt/nKwM3CAALX1dg9EPT/hywMzBJALgcDE0gUAC9cCXcAeJxjYGRgYG7438AQw8IAAkCSkQEVMAMARwkCbAQAAAAD6QAABAAAAAAAAAAAdgCceJxjYGRgYGBmCGRgZQABJiDmAkIGhv9gPgMAEPcBcAB4nGWPTU7DMBCFX/oHpBKqqGCH5AViASj9EatuWFRq911036ZOmyqJI8et1ANwHo7ACTgC3IA78EgnmzaWx9+8eWNPANzgBx6O3y33kT1cMjtyDRe4F65TfxBukF+Em2jjVbhF/U3YxzOmwm10YXmD17hi9oR3YQ8dfAjXcI1P4Tr1L+EG+Vu4iTv8CrfQ8erCPuZeV7iNRy/2x1YvnF6p5UHFockikzm/gple75KFrdLqnGtbxCZTg6BfSVOdaVvdU+zXQ+ciFVmTqgmrOkmMyq3Z6tAFG+fyUa8XiR6EJuVYY/62xgKOcQWFJQ6MMUIYZIjK6Og7VWb0r7FDwl57Vj3N53RbFNT/c4UBAvTPXFO6stJ5Ok+BPV8bUnV0K27LnpQ0kV7NSRKyQl7WtlRC6gE2ZVeOEXpc0Yk/KGdI/wAJWm7IAAAAeJxjYGKAAC4G7ICZkYmRmZGFgbGCJSW/PI+BAQAOigJRAAAA') format('woff');
  }

  .iconfont {
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-down:before { content: "\e718"; }

  .toggle-box + .toggle-box{
    border-top: 1px solid #f0f0f0;
  }

  .toggle-box{
    .toggle-cell{
      overflow: hidden;
      line-height: 2em;
      cursor: pointer;
      position: relative;
      padding-left: 15px;
      .toggle-title{
        margin-left: -15px;
        width: 100%;
      }
      .iconfont{
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        line-height: 2em;
        transition: 0.3s transform cubic-bezier(0.12, 0.4, 0.29, 1.46);
        font-size: 0.8em;
        color: #aaa;
      }
      &.active{
        border-bottom: 1px solid #f0f0f0;
        .iconfont{
          transform: translateY(-50%) rotate(180deg) ;
        }
      }
    }

    .toggle-content{
      transition: 0.3s height cubic-bezier(0.12, 0.4, 0.29, 1.46);
      overflow:hidden;
    }
  }
</style>

<template>
  <div class="toggle-box">
      <div class="toggle-cell" @click="height= (height ? 0 : _height)"  :class="height&&'active'"><div class="toggle-title"><slot name="title"></slot></div><i class="iconfont icon-down"></i></div>
      <div class="toggle-content" ref="content" :style="{height:height+'px'}">
        <slot></slot>
     </div>
  </div>
</template>

<script>
  export default {
    name: "toggle-box",
    data() {
      return {
        height:'auto'
      }
    },
    mounted() {
      this._height = this.$refs.content.offsetHeight;
      this.height = 0;
    }
  }
</script>

