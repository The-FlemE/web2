/*
* @Author: acer
* @Date:   2019-12-12 19:28:06
* @Last Modified by:   acer
* @Last Modified time: 2019-12-12 19:59:00
*/
	var box = document.getElementById("box");
	var navList = document.getElementById("nav").children;
	var slider = document.getElementById("slider");
	var left = document.getElementById("left");
	var right = document.getElementById("right");
	var spans = document.getElementById("spans");
	var divs = document.getElementsByClassName("divs");
	var index = 1;
	var spanRight = window.getComputedStyle(spans).right;
	var timer;
	var isMoving = false;
	window.onload = function(){
		setInterval(function(){
			if(parseInt(window.getComputedStyle(spans).right) >=1100){
				spans.style.right = -250+'px';
			}
			spans.style.right = (parseInt(window.getComputedStyle(spans).right) + 1) + "px";
			console.log(getComputedStyle(spans).right);

		},10)
	}
	box.onmouseover = function(){
		animate(left, {opacity:50})
		animate(right, {opacity:50})
		clearInterval(timer);
	}
	box.onmouseout = function(){
		animate(left, {opacity:0})
		animate(right, {opacity:0})
		timer = setInterval(next, 3000);
	}
	for(var i=0; i<navList.length; ++i){
		navList[i].index = i;//这一步是在干嘛？
		navList[i].onclick = function(){
			index = this.index + 1;
			navMove();
			animate(slider, {left:-1200*index});
		}
	}		
	function next(){
		if(isMoving)
			return;
		isMoving = true;
		index++;
		navMove();
		animate(slider, {left:-1200*index}, function(){
			if(index == 6){
				slider.style.left = "-1200px";
				index = 1;
			}
			isMoving = false;
		})
	}	
	function prev(){
		if(isMoving)
			return;
		isMoving = true;
		index--;
		navMove();
		animate(slider, {left:-1200*index}, function(){
			if(index == 0){
				slider.style.left = "-6000px";
				index = 5;
			}
			isMoving = false;
		})
	}
	function navMove(){
		for(var i=0; i<navList.length; ++i)
			navList[i].className = "";
		if(index > 5)
			navList[0].className = "active";
		else if(index <= 0)
			navList[4].className = "active";
		else
			navList[index-1].className = "active";
	}
	right.onclick = next;
	left.onclick = prev;
	timer = setInterval(next, 3000);