<template>
  <!-- 数字加减控件 -->
  <ul class="num-box">
    <li class="count-btn" :class="{ban:currentValue==min}" @click="handleMin">
      <span>-</span>
    </li>
    <li>
      <input
        class="num-input"
        type="number"
        :disabled="disabled"
        :value="currentValue"
        @input="handleInput"
        @focus="focus($event)"
      >
    </li>
    <li class="count-btn" :class="{ban:currentValue==max}" @click="handleAdd">
      <span>+</span>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      currentValue: parseInt(this.value)
    };
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    // 最小值
    min: {
      type: Number,
      default: 0
    },
    // 最大值
    max: {
      type: Number,
      default: 100
    },
    // 是否可控制
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(val, old) {
      if (typeof val !== "number") {
        this.currentValue = 0;
      } else {
        this.currentValue = val;
      }
    },
    currentValue(val, old) {
      if (val > this.max) {
        this.currentValue = this.max;
      }
      this.$emit("input", val);
    },
    max(val, old) {
      if (val < this.currentValue) {
        this.currentValue = val;
      }
    }
  },
  methods: {
    handleInput(evt) {
      if (evt.target.value <= this.max) {
        this.currentValue = evt.target.value;
        this.$emit("changeNum");
      } else {
        this.currentValue = evt.target.value;
        this.$emit("changeNum", true);
      }
    },
    focus(event) {
      event.currentTarget.select();
    },
    handleAdd() {
      if (this.value < this.max) {
        this.currentValue = parseInt(this.currentValue) + 1;
        this.$emit("changeNum");
      } else {
        this.$emit("changeNum", true);
      }
    },
    handleMin() {
      if (this.currentValue > this.min) {
        this.currentValue = parseInt(this.currentValue) - 1;
        this.$emit("changeNum");
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/var.less";
.num-box {
  height: 40px;
  line-height: 40px;
  display: flex;
  .count-btn {
    width: 40px;
    height: 40px;
    text-align: center;
    font-size: 2rem;
    span {
      background: @mainColor;
      color: #fff;
      border-radius: 50%;
      display: inline-block;
      width: 28px;
      height: 28px;
      line-height: 26px;
    }
    &.ban {
      span {
        background: #bbb;
      }
    }
  }
  .num-input {
    text-align: center;
    width: 30px;
    height: 40px;
    font-size: 1.6rem;
    color: #666;
  }
}
</style>
