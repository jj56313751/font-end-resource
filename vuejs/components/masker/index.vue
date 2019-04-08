<template>
  <transition name="masker-fade">
    <div class="masker" v-show="showMasker" @click="handleClick" @touchmove.prevent>
      <div class="head">
        <slot name="head"></slot>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="bottom">
        <slot name="bottom"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "masker",
  props: {
    showMasker: Boolean,
    maskerStyle: String,
    clickable: {
      //是否可点击
      default: true,
      type: Boolean
    }
  },
  methods: {
    handleClick() {
      if (this.clickable) {
        this.$emit("close");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.masker {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.8;
  z-index: 998;
  display: flex;
  flex-direction: column;
  .content {
    overflow-y: auto;
    flex: 1;
  }
  .head,
  .bottom {
    flex-shrink: 0;
  }
}
.masker-fade-enter-active,
.masker-fade-leave-active {
  transition: opacity 0.2s;
}
.masker-fade-enter,
.masker-fade-leave-to {
  opacity: 0;
}
</style>
