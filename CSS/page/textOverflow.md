
#### 单行
```
{
  text-overflow:ellipsis;
  white-space: nowrap;
  overflow: hidden;
  overflow: hidden;//溢出隐藏
  white-space: nowrap;//文字不能转行
  text-overflow:ellipsis;//隐藏的部分用...表示
}
```
> less代码
```
.text-ellipsis(@width:100px){
	width:@width;
	display:block;
	white-space:nowrap; 
	overflow:hidden; 
	text-overflow:ellipsis;
}
```

#### 多行

```
{
  overflow: hidden;首先是溢出隐藏，不可或缺
  display: -webkit-box;弹性盒模型显示
  -webkit-box-orient: vertical;盒模型元素的排列方式
  -webkit-line-clamp: 3;显示行数
  text-overflow: ellipsis;
}
```
但是问题来了，本地运行是成功的，但是webpack编译之后，奇怪的事情的发生了，
-webkit-box-orient: vertical;这句css消失了，就这样莫名其妙的消失了。

> 不编译这句
```
/*! autoprefixer: off */
-webkit-box-orient: vertical;
/* autoprefixer: on */
```
> 最终less代码
```
.line-clamp(@line:2){
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: @line;
	/*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
}
```
[原文地址](https://blog.csdn.net/mnhn456/article/details/80543792)
