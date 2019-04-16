```
// less语法
// 一像素边框
.media-border{
	position:relative;
	&:after{
		display: block;
		position: absolute;
		content: ' ';
		transform-origin: 0 0;
	}
}
.media-border-x(@color){
	&:after{
		width:100%;
		height: 1px;
		border-top:1px solid @color;
	}
	@media(-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
		&:after{
			transform: scaleY(0.5);
		}
	}
	@media(-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5) {
		&:after{
			transform: scaleY(0.7);
		}
	}
}
.media-border-y(@color){
	&:after{
		width:1px;
		height: 100%;
		border-left:1px solid @color;
	}
	@media(-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
		&:after{
			transform: scaleX(0.5);
		}
	}
	@media(-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5) {
		&:after{
			transform: scaleX(0.7);
		}
	}
}

.border-1px(@color){
	.media-border;
	.media-border-x(@color);
	&:after{
		left:0;
		bottom:-1px;
	}
}
.border-top-1px(@color){
	.media-border;
	.media-border-x(@color);
	&:after{
		left:0;
		top:0;
	}
}
.border-left-1px(@color){
	.media-border;
	.media-border-y(@color);
	&:after{
		left:0;
		top:0;
	}
}
.border-right-1px(@color){
	.media-border;
	.media-border-y(@color);
	&:after{
		right:0;
		top:0;
	}
}
```