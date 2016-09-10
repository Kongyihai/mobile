function Banner(option){
	var position =option.position,
		option =option.option,
		adLen = option.length,
		bannerWidth = position.offsetWidth,
		arrAd,
		arrButton,
		currentIndex = 0,
		previousIndex = adLen-1,
		nextIndex = 1,
		time;
	function createBanner(){
		var fragment = document.createDocumentFragment();
		arrAd = option.map(function(list,index){
			var ad =document.createElement("a");
			ad.title =list.name;
			ad.href =list.anchorHref;
			ad.style.backgroundImage = "url("+list.imageUrl+")";
			fragment.appendChild(ad);
			var startX,
				endX,
				distance,
				direction;
			//监听事件
			ad.addEventListener("touchstart",function(e){
				startX = e.touches[0].clientX;
			},0);
			ad.addEventListener("touchmove",function(e){
				nextIndex = currentIndex > adLen -1 ? 0 : currentIndex +1;
				//移动距离
				distance = e.touches[0].clientX - startX;
				direction = distance > 0;
				console.log(this);
				this.style.left = distance +"px";
				if(distance){
					arrAd[previousIndex].style.left = distance - bannerWidth +"px";
				}else{
					arrAd[nextIndex].style.left = distance + bannerWidth +"px";
				}
			},0);
			ad.addEventListener("touchend",function(e){
				endX = e.changedTouches[0].clientX;
				console.log(Math.abs(distance) > bannerWidth/2);
				if(Math.abs(distance) > bannerWidth/2 ){
					this.classList.add(distance?"ltr":"rtl");
					if(distance){
						arrAd[previousIndex].style.left = null;
					}else{
						arrAd[nextIndex].style.left = null;
					}
				}else{
					this.classList.add("init");
				}
			},0);
			ad.addEventListener("animationend",function(){
				this.style.left = null;
				this.classList.remove("init");
			})
			return ad;
		})
		position.appendChild(fragment);	
	}
	function createIndicator(){
		var indicator = document.createElement("div");
		indicator.className = "indicator";
		arrButton = option.map(function(list,index){
			var button = document.createElement("em");
			button.appendChild(document.createTextNode(index+1));
			indicator.appendChild(button);
			button.addEventListener("touchend",function() {
				previousIndex =  currentIndex;
				currentIndex = index;
				setView();
				// clearInterval(time);
				// autoChange();
			},0);
			return button
		})
		arrButton[0].classList.add("current");
		position.appendChild(indicator);
	}
	function setView(){
		arrAd[previousIndex].classList.remove("current");
		arrAd[currentIndex].classList.add("current");
		arrAd[previousIndex].classList.add("previous");
		arrAd[currentIndex].classList.remove("previous");
		arrButton[previousIndex].classList.remove("current");
		arrButton[currentIndex].classList.add("current");
	}
	function autoChange(){
		time =setInterval(function(){
			currentIndex = currentIndex < adLen -1 ? currentIndex +1 : 0 ;
			previousIndex = currentIndex > 0 ? currentIndex -1 : adLen - 1;
			console.log(currentIndex,previousIndex);
			setView();
		},2000);
	}
	createBanner();
	createIndicator();
	// autoChange();
}

var banner = document.querySelector('.banner');
ajax({
	url : "http://www.ikindness.cn/api/test/get",
	success : function (data) {
		new Banner({
			position :banner,
			option :data.data
		});
	}
})
