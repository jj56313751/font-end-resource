<template>
  <div>
    <transition name="modal-move">
      <div class="md-modal" v-show="mdShow">
        <div class="md-modal-inner">
          <div class="md-top" v-show="titleShow">
            <h3 class="md-title">{{title}}</h3>
          </div>
          <div class="md-content">
            <div class="content" v-html="content"></div>
            <div class="btn-wrap">
              <button class="confirm" @click="closeModal">{{buttonText}}</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <masker-wrap :showMasker="mdShow" :clickable="maskerClickable" v-on:close="closeModal"></masker-wrap>
  </div>
</template>

<script>
import maskerWrap from "@/components/masker";

export default {
  name: "modal",
  data() {
    return {};
  },
  props: {
    mdShow: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: "信息"
    },
    // 是否显示标题
    titleShow: {
      type: Boolean,
      default: true
    },
    // 内容
    content: {
      type: String
    },
    // 按钮文字
    buttonText: {
      type: String,
      default: "确定"
    },
    // 点击遮罩关闭
    maskerClickable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    }
  },
  components: {
    maskerWrap
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/var.less";

.md-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  max-height: 100%;
  transform: translate(-50%, -50%);
  z-index: 999;
  .md-modal-inner {
    background: #fff;
    border-radius: 5px;
    .md-top {
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      .md-title {
        font-size: 1.6rem;
        text-align: center;
      }
    }
    .md-content {
      .content {
        max-height: 100vw;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 10px 15px;
        font-size: 1.2rem;
        color: #666;
        line-height: 1.8;
      }
      .btn-wrap {
        border-top: @border1px;
        height: 40px;
        line-height: 40px;
        .confirm {
          color: @mainColor;
          text-align: center;
          display: block;
          width: 100%;
          height: 40px;
          font-size: 1.4rem;
        }
      }
    }
  }
}
.modal-move-enter-active,
.modal-move-leave-active {
  transition: all 0.2s ease-in-out;
  transform: translate(-50%, -50%);
}
.modal-move-enter,
.modal-move-leave-to {
  transform: translate3d(-50%, 100%, 0);
}
</style>