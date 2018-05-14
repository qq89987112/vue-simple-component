<template>
  <div class="tree" ref="tree" :style="{height:height+'px'}">
    <div class="tree-item" v-for="(item,idx) in value">
      <div class="tree-title" @click="onToggle(idx)">{{item.titleName}} <i v-if="item.list" class="iconfont icon-down"
                                                                           :class="item.$state==='up'&&'active'"/></div>
      <tree v-if="item.list" v-model="item.list" ref="treeChildren" :children="true" @change="onChange(idx,$event)"
            v-on="$listeners"></tree>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tree",
    props: ['value', 'children'],
    data() {
      return {
        // height: 'auto'
        height: 'auto'
      }
    },
    methods: {
      onToggle(idx) {
        let treeChildren = this.$refs.treeChildren;
        if (treeChildren) {
          treeChildren[idx].toggle();
        }
        this.$emit("itemClick", this.value[idx])
      },
      up() {
        this.height = this._height;
        this.$emit("change", "up");
      },
      down() {
        this.height = 0;
        this.$emit("change", "down");
      },
      toggle() {
        this.height ? this.down() : this.up();
      },
      onChange(idx, value) {
        this.value[idx].$state = value;
        this.$forceUpdate();
      }
    },
    mounted() {
      this._height = this.$refs.tree.offsetHeight;
      this.height = this.children ? 0 : 'auto';
    }
  }
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: "iconfont";
    src: url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAT4AAsAAAAAB0wAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFZW7kkCY21hcAAAAYAAAABeAAABhp2YBr5nbHlmAAAB4AAAASwAAAE4TEDxPGhlYWQAAAMMAAAALwAAADYRVlrQaGhlYQAAAzwAAAAcAAAAJAfeA4RobXR4AAADWAAAAAwAAAAMC+kAAGxvY2EAAANkAAAACAAAAAgAdgCcbWF4cAAAA2wAAAAfAAAAIAESAF1uYW1lAAADjAAAAUUAAAJtPlT+fXBvc3QAAATUAAAAIQAAADJlgvF4eJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2Bk/sE4gYGVgYOpk+kMAwNDP4RmfM1gxMjBwMDEwMrMgBUEpLmmMDgwVDyXYG7438AQw9zA0AAUZgTJAQAlOAyFeJzFkMENgDAMAy9t6QMxQEfgwUC8mKMbd4xiQnkwQS05VhxLiQIsQBQPMYFdGA9OueZ+ZHU/eSZLjUBtpXf1nyqiWXYNKplpsHmr/9i87qPTV6iDOrGVl4QbjZsL8wAAeJwVj7tOw0AURO9d41dIbLzrd+I4tuMsyBAZY0KBSChoQBRIVJS0QdChNBRpkCgoqOhoEBI/ESR+BcFvYHBGoynONDMgAvx9CQvBBQbrsA1HcAaAUoaxRgKMeDkkGVqRaDmmJvCER3ISD4UDdGLJtItROXAkWdJRwy7uRMWIDwnH3XJM9rGwA0Sv7Z/TtEOFJ2y4vHtfnZBXtMKko4+3quPNiVn0mDJrUupR+qhIoqgQsqJreO3Yqqg2pOpN1H1rEW6QEJse908vWr02vXwob4LUURHnc2TtnvY+MXyj9p1vM+rJay3F9VtJ38TZz6rLmsHgG2rhMoRf8gIUIB3tYT0/llUc1F8ctAuSEcQP2s9ZdVVNaZ5S/GT57RKyvG9UU3w2luWhAf8tXDGZeJxjYGRgYADip3sXZsTz23xl4GZhAIHr0t25CPr/QxYGZgkgl4OBCSQKADhiCjkAeJxjYGRgYG7438AQw8IAAkCSkQEVMAMARwkCbAQAAAAD6QAABAAAAAAAAAAAdgCceJxjYGRgYGBmCGRgZQABJiDmAkIGhv9gPgMAEPcBcAB4nGWPTU7DMBCFX/oHpBKqqGCH5AViASj9EatuWFRq911036ZOmyqJI8et1ANwHo7ACTgC3IA78EgnmzaWx9+8eWNPANzgBx6O3y33kT1cMjtyDRe4F65TfxBukF+Em2jjVbhF/U3YxzOmwm10YXmD17hi9oR3YQ8dfAjXcI1P4Tr1L+EG+Vu4iTv8CrfQ8erCPuZeV7iNRy/2x1YvnF6p5UHFockikzm/gple75KFrdLqnGtbxCZTg6BfSVOdaVvdU+zXQ+ciFVmTqgmrOkmMyq3Z6tAFG+fyUa8XiR6EJuVYY/62xgKOcQWFJQ6MMUIYZIjK6Og7VWb0r7FDwl57Vj3N53RbFNT/c4UBAvTPXFO6stJ5Ok+BPV8bUnV0K27LnpQ0kV7NSRKyQl7WtlRC6gE2ZVeOEXpc0Yk/KGdI/wAJWm7IAAAAeJxjYGKAAC4G7ICZkYmRmZGFgbGCJSW/PI+BAQAOigJRAAAA') format('woff');
  }

  .tree {
    transition: .3s height ease;
    overflow: hidden;

    .iconfont {
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .icon-down:before {
      content: "\e718";
    }

    .tree-item + .tree-item {
      border-top: 1px solid #efefef;
    }
    .tree-item {
      line-height: 2.5em;
      background-color: #fff;
      cursor: pointer;

      .tree-title {
        .iconfont {
          font-size: 0.8em;
          float: right;
          transition: .3s transform ease;
          &.active {
            transform: rotate(180deg);
          }
        }
      }
    }

    .tree {
      padding-left: 15px;
    }
  }
</style>
