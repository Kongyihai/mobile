var testTouch=document.querySelector(".testTouch"),span=testTouch.querySelector("span");testTouch.addEventListener("touchstart",function(t){console.log("touchstartX"+t.touches[0].clientX+"Y"+t.touches[0].clientY)},0);var touchY;testTouch.addEventListener("touchmove",function(t){touchY=t.touches[0].clientY,touchY<=this.offsetHeight-span.offsetHeight/2&&touchY>=span.offsetHeight/2&&(span.style.left=t.touches[0].clientX-span.offsetWidth/2+"px",span.style.top=touchY-span.offsetHeight/2+"px")},0),testTouch.addEventListener("touchend",function(t){console.log("touchendX"+t.changedTouches[0].clientX+"Y"+t.changedTouches[0].clientY),span.classList.add("rotate")},0),span.addEventListener("animationstart",function(){this.innerHTML=this.innerHTML+"6"},0),span.addEventListener("animationend",function(){span.classList.remove("rotate"),span.classList.add("scale")},0),span.addEventListener("transitionend",function(){span.classList.remove("scale"),this.innerHTML=this.innerHTML.substring(0,this.innerHTML.length-1)},0);