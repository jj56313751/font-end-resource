<template>
<!-- 分页插件 -->
  <div class="page-bar clearfix">
    <ul>
      <li>
        <a class="prev" :class="{banclick:cur==1}" @click="btnPrev">
          <i class="iconfont icon-jinrujiantou reverse"></i>
        </a>
      </li>
      <li v-for="index in indexs" v-bind:class="{ 'active': cur == index}">
        <a class="btn" @click="btnClick(index)">{{ index }}</a>
      </li>
      <li>
        <a class="next" :class="{banclick:cur==all}" @click="btnNext">
          <i class="iconfont icon-jinrujiantou"></i>
        </a>
      </li>
      <li class="total">
        共
        <i class="all">{{all}}</i>页
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "pagination",
  data() {
    return {
      cur: this.curpage //当前页码，如需修改应又父组建传入。在Vue2中组件的props的数据流动改为了只能单向流动
    };
  },
  props: {
    count: {
      //总数
      default: 10
    },
    pageSize: {
      //每页显示个数
      default: 2
    },
    curpage: {
      //当前页码
      default: 1
    }
  },
  watch: {
    //父组建数据重新获取后，重新传入默认值
    curpage(newVal, old) {
      this.cur = newVal;
    }
  },
  computed: {
    all() {
      //总页数
      return Math.ceil(this.count / this.pageSize);
    },
    indexs() {
      var left = 1;
      var right = this.all;
      var ar = [];
      if (this.all >= 5) {
        if (this.cur > 3 && this.cur < this.all - 2) {
          left = this.cur - 2;
          right = this.cur + 2;
        } else {
          if (this.cur <= 3) {
            left = 1;
            right = 5;
          } else {
            right = this.all;
            left = this.all - 4;
          }
        }
      }
      while (left <= right) {
        ar.push(left);
        left++;
      }
      return ar;
    }
  },
  methods: {
    btnClick(data) {
      //页码点击事件
      if (data != this.cur) {
        this.cur = data;
        this.$emit("btnclick", this.cur);
      }
    },
    btnPrev() {
      //上一页
      if (this.cur > 1) {
        this.cur--;
        this.$emit("btnprev", this.cur);
      } else {
        return false;
      }
    },
    btnNext() {
      //下一页
      if (this.cur !== this.all) {
        this.cur++;
        this.$emit("btnnext", this.cur);
      } else {
        return false;
      }
    }
    // pageClick(){
    //   console.log('现在在'+this.cur+'页');
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.page-bar {
  margin: 10px 0;
}
.page-bar ul {
  float: right;
  font-size: 0;
}
.page-bar li {
  display: inline-block;
  font-size: 1.4rem;
  vertical-align: top;
  height: 26px;
  line-height: 26px;
}
.page-bar li:first-child > a {
  margin-left: 0px;
}
.page-bar .prev,
.page-bar .next,
.page-bar .btn {
  display: block;
  border: 1px solid #ddd;
  text-decoration: none;
  color: #337ab7;
  cursor: pointer;
}
.page-bar .prev,
.page-bar .next {
  padding: 0 5px;
  background: #fff;
  .iconfont {
    position: relative;
    display: inline-block;
    font-size: 2.2rem;
    vertical-align: top;
    &.reverse {
      transform: rotate(180deg);
    }
  }
}
.page-bar .prev {
  border-radius: 3px 0 0 3px;
}
.page-bar .next {
  border-radius: 0 3px 3px 0;
  margin-left: -1px;
}
.page-bar .btn {
  background: #fff;
  width: 24px;
  text-align: center;
  position: relative;
  margin-left: -1px;
  font-family: Arial, Helvetica, sans-serif !important;
  font-size: 1.2rem;
}
.page-bar a:hover {
  background-color: #eee;
}
.page-bar a.banclick {
  cursor: not-allowed;
  color: #999;
  background: #f5f5f5;
}
.page-bar .active a {
  color: #fff;
  cursor: default;
  background-color: #337ab7;
}
.page-bar .total {
  font-size: 1.2rem;
  margin-left: 5px;
}
.page-bar .all {
  font-family: Arial, Helvetica, sans-serif !important;
  font-style: normal;
  color: #d44950;
  margin: 0px 2px;
  font-size: 12px;
}
</style>
