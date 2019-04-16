> css
```
.wrap{
    position: relative;
    overflow: hidden;
}
.wrap::before{
    content: "";
    display: block;
    margin-top: 48%;//图片宽高比例:高/宽*100%
}
.pic{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.pic img{
    width: 100%;
    height: 100%;
}
```
> html
```
<div class="wrap">
    <div class="pic">
        <img crc="">
    </div>
</div>
```