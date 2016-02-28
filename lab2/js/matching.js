
var PICTURES1 = ["images/bear.png", "images/chick.png", 
						"images/cow.png", "images/dog.png", 
						"images/elephant.png", "images/fox.png", 
						"images/koala.png", "images/monkey.png", 
						"images/mouse.png", "images/owl.png", 
						"images/panda.png", "images/penguin.png", 
						"images/pig.png", "images/racoon.png", 
						"images/sheep.png", "images/tiger.png"]

	
	
	
var leftset ={}
var rightset ={}
var leftchosen = null;
var rightchosen = null;
var puzzlesize = 4;
var wrong = 0;
var SIZE = 4;
var timecount = null;
var totalSec = 0;
function First(){ 
	$("#BackMenu").click(function(){back2Main();});
	timer();
 	generateTable(4);
	$("#gensize").change(function(){SIZE = $('#gensize').find(':selected').text();
					startSequence();});
	gamestart(4);
}

function startSequence(){
		clearTable();
                var n = SIZE;
                puzzlesize = n;
                wrong = 0;
                generateTable(n);
                gamestart(n);
}

function clearTable(){
	$("#scoreboard").removeAttr('style');
	$("#dynamictable").empty();
}

function generateTable(n){
	$("#scoreboard").empty();
	$("#won").css("display", "none");
	var table = $("#dynamictable");
	for (var i = 0; i < n; i++){
		table.append("<tr><td class='left'><img class='image'></td><td class='right'><img class='image'></td></tr>");
	}	
	randomize("left", "right", 1, n);
	SIZE = n;
	$("#scoreboard").append('<h4>Chances: 3 / 3</h4>'); 	
}


function randomy(list){
	for (var i = list.length - 1; i > 0; i--){
		var j = Math.floor(Math.random() * (i+1));
		while(i==j){
			j = Math.floor(Math.random() * (i+1));
		}
		var temp= list[i];
		list[i] = list[j];
		list[j] = temp;
	}
	
	return list;
}


/*same == 0  meaning right column does not have same.*/ 
function randomize(left, right, same, size){
	if (size < 2){
		var n = $('#gensize').find(':selected').text();
		generateTable(n);
	} else {
		var l_column = PICTURES1;
		leftset = l_column;
		var list = [];
		list = randomy(l_column);
		list = list.slice(0, size);
		replace(list, left);
		if (same == 1){
			var r_column = l_column;
			rightset = r_column;
			list=randomy(list);
			replace(list, right);
			
		}else{
			;
		}
	}
}

function replace(list, column){
	var imageplaceholders =  document.getElementsByClassName(column)
	for(var i = 0; i < list.length; i++){
		imageplaceholders[i].firstChild.setAttribute("src",list[i]);
	}
}

function gamestart(n){
	totalSec=0;
	clearInterval(timecount);
	timecount = setInterval(setTime, 1000);
	tobind(".image");
}

function tobind(name){
	$(name).bind("click", function(){clicked($(this), name);});
}

function clicked(e, name){
	var element = e;
	$(element).css("-webkit-filter", "invert(100%) blur(1px)");
	if ($(element).parent().attr("class") == "left"){
		leftchosen = element;
		$(".left>" + name).unbind("click");
	}
	if ($(element).parent().attr("class") == "right"){
		rightchosen = element;
		$(".right>" + name).unbind("click");
	}
	check();
}


function check(){
	if (rightchosen != null && leftchosen != null){
		var src1 = $(leftchosen).attr("src");
		var src2 = $(rightchosen).attr("src");
		var a = leftset.indexOf(src1);
		var b = rightset.indexOf(src2);
		if (a == b){
			$(leftchosen).css("-webkit-filter", "");
			$(rightchosen).css("-webkit-filter", "");
			$(leftchosen).attr("class", "sil");
			$(rightchosen).attr("class", "sil");
			$("#match").css("display", "block");
			setTimeout(function(){$('#match').fadeOut();}, 2000);
			puzzlesize -= 1;
			updatescore(SIZE - puzzlesize, SIZE, 3-wrong);
			if (puzzlesize == 0){
				endgame(1);
			}
		}else{
			wrong++;
			$("#mismatch").css("display", "block");
			updatescore(SIZE - puzzlesize, SIZE, 3-wrong);
			setTimeout(function(){$("#mismatch").fadeOut();}, 2000);
			$(leftchosen).css("-webkit-filter", "");
			$(rightchosen).css("-webkit-filter", "");	
			if (wrong == 3){
				endgame(0);
			}
		}
		leftchosen = null;
		rightchosen = null;
		tobind(".image");
	}
}

function endgame(mode){
	clearInterval(timecount);
	var time = $('#minutes').html()+" minutes "+$('#seconds').html()+" seconds";
	$("#won").empty();
	if (mode==1){
		$("#won").append('Puzzle completed!  Time taken '+ time+'<br>Click on worksheet to generate new worksheet!');
	}else{	
		$('#won').append('Game Over!');
	}
	$("#won").css("display", "block");
	$("img").fadeOut(5000);
	$("html, body").animate({scrollTop:0},"slow");
	$("#scoreboard").append('<button id="another">Play Another</button>');
	$("#another").click(function(){startSequence();});
	$("#scoreboard").css({"width": "100%", "text-align":"center"});
	$("#scoreboard").css("position", "absolute").animate({top: 100}); 
}

function updatescore(i, n, c){
	$("#scoreboard").empty();
	$("#scoreboard").append('<h4>Score: ' +i+ ' / ' +n+'</h4>');
	$("#scoreboard").append('<h4>Chances: ' + c + ' / 3</h4>'); 	
}

function timer(){
	$('#Example1').prepend('<div id="clock"><label id="minutes">00</label>:<label id="seconds">00</label></div>');
	totalSec = 0;
}
function setTime(){	
	++totalSec;
	$('#clock > #seconds').html(pad(totalSec%60));
	$('#clock > #minutes').html(pad(parseInt(totalSec/60)));
}
function pad(value){
		var valString = value+ "";
		if(valString.length < 2){
			return "0"+ valString;
		}else{
		return valString;
		}		
}	










window.onload = First;


