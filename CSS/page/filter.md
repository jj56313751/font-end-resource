> 实现思路

1. 毛玻璃效果只能应用于元素本身。
2. 因此在半透明遮罩层显示时，只能在底下被遮住的div上加上滤镜效果。


> html

```
<!--遮罩层隐藏-->
<div>
    <p>被遮住的内容</p>
</div>
<div class="masker"></div>

<!--遮罩层显示-->
<div class="filter">
    <p>被遮住的内容</p>
</div>
<div class="masker" style="display: inline-block"></div>
```


> css

```
.masker{
  display:none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background:#000;
  opacity: .8;
  z-index: 998;
}
.filter{
  filter: blur(2px)
}
```
