// var colors=[
// 	"rgb(255, 0, 0)",
// 	"rgb(255, 255, 0)",
// 	"rgb(255, 0, 255)",
// 	"rgb(0, 255, 255)",
// 	"rgb(0, 255, 0)",
// 	"rgb(0, 0, 255)", 
// ]
var numSquares=6;

var colors = [];

var body = document.querySelector("body");

var squares = document.querySelectorAll(".square");

var pickedColor;

var rbgDisplay = document.getElementById("rgbDisplay");

var message = document.getElementById("message");

var h1 = document.querySelector("h1");
var modeButton =document.querySelectorAll(".mode");
var resetButton = document.querySelector("#reset");
init();

function init(){
	//set up mode buttons:
	for (var i = 0; i < modeButton.length; i++) {
		modeButton[i].addEventListener("click",function(){
			this.classList.add("selected");
			if(this.textContent==="Easy")
				numSquares=3;
			else
				numSquares=6;

			for (var j = 0; j < modeButton.length; j++) {
					if(modeButton[j]!=this)
						modeButton[j].classList.remove("selected");
			}

			reset();
		});
	}
	//setup squares:
	for (var i = 0; i < squares.length; i++) {
	// add click type event listener to the squares
		squares[i].addEventListener("click", function(){
			// compare this color with the picked color
			var clickedColor = this.style.backgroundColor;
			// console.log(pickedColor,clickedColor);
			if(clickedColor===pickedColor){
				message.textContent="Correct";
				changeColor(pickedColor);
				resetButton.textContent="Play Again?";
			}
			else{
				// why this is not working? :-
				// this.style.backgroundColor=body.style.backgroundColor;
				this.style.backgroundColor = "#232323";
				message.textContent="Try Again";
			}
		});
	}

	reset();
}

function reset(){
	//generate all new colors:
	colors=generateRandomColors(numSquares);
	//Pick a winning color
	pickedColor=colors[pickColor()];
	//set rgb display to the new one
	rgbDisplay.textContent = pickedColor;
	//change all squares to the new generated color:
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.backgroundColor=colors[i];
			//To make it appear again:
			squares[i].style.display="block";
		}
		else
			squares[i].style.display="none";
	}
	//If we wil win and then playing again we need to reset this too:
	//change color of header
	h1.style.backgroundColor="steelblue";
	resetButton.textContent="New Color";
	message.textContent="";
}

resetButton.addEventListener("click",function(){
	reset();
});

rgbDisplay.textContent = pickedColor;

function changeColor(color){
	//change color to the same the color.
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor=color;
	}
	h1.style.backgroundColor = color;
}
function pickColor(){
	// colors.length is 6
	var random = Math.floor(Math.random() * colors.length) ;
	return random;
}

function generateRandomColors(num){
	var arr= [];
	for (var i = 0; i < num ; i++){
		arr.push(randomColor());
	}
	return arr;
}
function randomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	var rgb= "rgb("+r+", "+g+", "+b+")";
	return rgb;
}