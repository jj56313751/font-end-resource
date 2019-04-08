<template>
  <!-- 左右滑动模块，可用于滑动删除 -->
  <div
    class="cell-swpie"
    v-clickoutside:touchstart="swipeMove"
    @click="swipeMove()"
    @touchstart="startDrag"
    @touchmove="onDrag"
    @touchend="endDrag"
  >
    <div class="cell-swpie-btn left" ref="left">
      <a
        v-for="btn in left"
        :style="btn.style"
        v-html="btn.content"
        @click.prevent.stop="btn.handler && btn.handler()"
      ></a>
    </div>
    <div ref="content" class="cell-swpie-content">
      <!-- 插槽中放具体项目中需要内容  -->
      <slot></slot>
    </div>

    <div class="cell-swpie-btn right" ref="right">
      <a
        v-for="btn in right"
        :style="btn.style"
        v-html="btn.content"
        @click.prevent.stop="btn.handler && btn.handler()"
      ></a>
    </div>
  </div>
</template>

<script>
import Clickoutside from "@/utils/clickoutside";

export default {
  name: "cellSwipe",

  directives: { Clickoutside },

  props: {
    left: Array,
    right: Array
  },

  data() {
    return {
      start: { x: 0, y: 0 },
      ban: false
    };
  },
  mounted() {
    this.wrap = this.$refs.content;
    // this.leftElm = this.$refs.left;
    // this.rightElm = this.$refs.right;
    // this.leftWrapElm = this.leftElm.parentNode;
    this.leftWrapElm = this.$refs.left;
    // this.rightWrapElm = this.rightElm.parentNode;
    this.rightWrapElm = this.$refs.right;
    this.leftWidth = this.leftWrapElm.getBoundingClientRect().width;
    this.rightWidth = this.rightWrapElm.getBoundingClientRect().width;

    this.leftDefaultTransform = this.translate3d(-this.leftWidth - 1);
    this.rightDefaultTransform = this.translate3d(this.rightWidth);

    this.rightWrapElm.style.webkitTransform = this.rightDefaultTransform;
    this.leftWrapElm.style.webkitTransform = this.leftDefaultTransform;
  },

  methods: {
    resetSwipeStatus() {
      this.swiping = false;
      this.opened = true;
      this.offsetLeft = 0;
    },

    translate3d(offset) {
      return `translate3d(${offset}px, 0, 0)`;
    },

    setAnimations(val) {
      this.wrap.style.transitionDuration = val;
      this.rightWrapElm.style.transitionDuration = val;
      this.leftWrapElm.style.transitionDuration = val;
    },

    swipeMove(offset = 0) {
      this.wrap.style.webkitTransform = this.translate3d(offset);
      this.rightWrapElm.style.webkitTransform = this.translate3d(
        this.rightWidth + offset
      );
      this.leftWrapElm.style.webkitTransform = this.translate3d(
        -this.leftWidth + offset
      );
      offset && (this.swiping = true);
      // console.log(this.swiping)
      if (this.swiping) {
        //滑动以后是否允许点击
        this.ban = true;
        // this.$emit('close')
      } else {
        this.ban = false;
        // this.$emit('open')
      }
    },

    swipeLeaveTransition(direction) {
      setTimeout(() => {
        this.swipeLeave = true;
        // left
        if (direction > 0 && -this.offsetLeft > this.rightWidth * 0.4) {
          this.swipeMove(-this.rightWidth);
          this.resetSwipeStatus();
          this.$emit("sleft");
          return;
          // right
        } else if (direction < 0 && this.offsetLeft > this.leftWidth * 0.4) {
          this.swipeMove(this.leftWidth);
          this.resetSwipeStatus();
          this.$emit("sright");
          return;
        }

        this.swipeMove(0);

        this.$common.once(this.wrap, "webkitTransitionEnd", _ => {
          this.wrap.style.webkitTransform = "";
          this.rightWrapElm.style.webkitTransform = this.rightDefaultTransform;
          this.leftWrapElm.style.webkitTransform = this.leftDefaultTransform;
          this.swipeLeave = false;
          this.swiping = false;
        });
      }, 0);
    },

    startDrag(evt) {
      evt = evt.changedTouches ? evt.changedTouches[0] : evt;
      this.dragging = true;
      this.start.x = evt.pageX;
      this.start.y = evt.pageY;
      this.direction = "";
    },

    onDrag(evt) {
      if (this.opened) {
        if (!this.swiping) {
          this.swipeMove(0);
          this.setAnimations("");
          // this.$emit('s0')// 滑动前
        }
        this.opened = false;
        return;
      }
      if (!this.dragging) return;

      let swiping;
      const e = evt.changedTouches ? evt.changedTouches[0] : evt;
      const offsetTop = e.pageY - this.start.y;
      const offsetLeft = (this.offsetLeft = e.pageX - this.start.x);
      const y = Math.abs(offsetTop);
      const x = Math.abs(offsetLeft);

      this.setAnimations("0ms");

      if (this.direction === "") {
        this.direction = x > y ? "horizonal" : "vertical";
      }

      if (this.direction === "horizonal") {
        evt.preventDefault();
        evt.stopPropagation();

        swiping = !(x < 5 || (x >= 5 && y >= x * 1.73));
        if (!swiping) return;

        if (
          (offsetLeft < 0 && -offsetLeft > this.rightWidth) ||
          (offsetLeft > 0 && offsetLeft > this.leftWidth) ||
          (offsetLeft > 0 && !this.leftWidth) ||
          (offsetLeft < 0 && !this.rightWidth)
        ) {
        } else {
          this.swipeMove(offsetLeft);
        }
      }
      this.ban = false;
    },

    endDrag() {
      this.direction = "";
      this.setAnimations("");
      if (!this.swiping) return;
      this.swipeLeaveTransition(this.offsetLeft > 0 ? -1 : 1);
      // this.$emit('close')// 滑动后
    }
  }
};
</script>

<style lang="less" >
@import "../assets/css/var.less";
.cell-swpie {
  min-height: 48px;
  display: block;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  .cell-swpie-content {
    position: relative;
    z-index: 2;
  }
  .cell-swpie-btn {
    height: 100%;
    position: absolute;
    top: 0;
    text-align: center;
    z-index: 1;
    a {
      display: flex;
      height: 100%;
      padding: 0 15px;
      align-items: center;
    }
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }
  }
  // a{
  //   pointer-events:none;
  // }
  .cell-swpie-content,
  .cell-swpie-btn {
    transition: transform 150ms ease-in-out;
  }
}
</style>
