<template>
  <div>
    <transition :name="position">
      <div class="popup-wrap" :class="'position-'+position" v-show="popup" :style="popstyle">
        <div class="head">
          <slot name="head"></slot>
        </div>
        <div class="popupBox">
          <slot name="content"></slot>
        </div>
        <div class="tabs">
          <slot name="tabs"></slot>
        </div>
      </div>
    </transition>
    <masker-wrap :showMasker="popup" v-on:close="hideMasker" :clickable="maskerClickable"></masker-wrap>
  </div>
</template>

<script>
import maskerWrap from "@/components/masker";
export default {
  props: {
    popup: {
      type: Boolean,
      default: false
    },
    // 弹出位置
    position: {
      type: String,
      default: "top"
    },
    // 遮罩层是否可点击
    maskerClickable: {
      type: Boolean,
      default: true
    },
    popstyle: String
  },
  methods: {
    hideMasker() {
      this.$emit("hideMasker");
      this.$common.ModalHelper.beforeClose(); //启用滚动
    }
  },
  components: { maskerWrap }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.popup-wrap {
  width: 100%;
  min-width: 320px;
  max-width: 640px;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 999;
  background: #fff;
  max-height: 75%;
  display: flex;
  flex-direction: column;
  .head,
  .tabs {
    flex-shrink: 0;
  }
  .popupBox {
    overflow-y: auto;
  }
}
.position-top {
  top: 0;
}
.position-bottom {
  bottom: 0;
}
// 从上弹出
.top-leave-active,
.top-enter-active {
  opacity: 1;
  transition: all 0.2s ease;
  transform: translate3d(0, 0, 0);
}
.top-leave-active,
.top-enter {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
// 从下弹出
.bottom-leave-active,
.bottom-enter-active {
  opacity: 1;
  transition: all 0.2s ease;
  transform: translate3d(0, 0, 0);
}
.bottom-leave-active,
.bottom-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
// // 从左弹出
// .left-leave-active,.left-enter-active{
//   opacity: 1;
//   transition: all .2s ease;
//   transform: translate3d(0, 0, 0);
// }
// .left-leave-active,.left-enter{
//   opacity: 0;
//   transform: translate3d(-100%, 0, 0);
// }
// // 从右边弹出
// .right-leave-active,.right-enter-active{
//   opacity: 1;
//   transition: all .2s ease;
//   transform: translate3d(0, 0, 0);
// }
// .right-leave-active,.right-enter{
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }
</style>
