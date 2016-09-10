var testTouch = document.querySelector(".testTouch"),
	span = testTouch.querySelector("span");
//触屏
testTouch.addEventListener("touchstart",function(e) {
	console.log("touchstartX"+e.touches[0].clientX+"Y"+e.touches[0].clientY);
},0);
var touchY;
//移动
testTouch.addEventListener("touchmove",function(e) {
	touchY = e.touches[0].clientY;
	if(touchY <= this.offsetHeight-span.offsetHeight/2  && touchY >= span.offsetHeight/2){
		span.style.left = e.touches[0].clientX-span.offsetWidth/2+"px";
		span.style.top = touchY-span.offsetHeight/2+"px";
	}
},0);
//离开屏幕
testTouch.addEventListener("touchend",function(e) {
	console.log("touchend"+"X"+e.changedTouches[0].clientX+"Y"+e.changedTouches[0].clientY);
	span.classList.add("rotate");
},0);
//动画开始
span.addEventListener("animationstart",function(){
	this.innerHTML = this.innerHTML + "6";
},0)
//关键帧动画结束 @keyframes
span.addEventListener("animationend",function(){
	span.classList.remove("rotate");
	span.classList.add("scale");
},0)
//过渡动画结束
span.addEventListener("transitionend",function(){
	span.classList.remove("scale");
	this.innerHTML = this.innerHTML.substring(0,this.innerHTML.length-1);
},0)
