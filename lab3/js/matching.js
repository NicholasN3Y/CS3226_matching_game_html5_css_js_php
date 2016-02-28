var PICTURES1 = ["images/bear.png", "images/chick.png", 
						"images/cow.png", "images/dog.png", 
						"images/elephant.png", "images/fox.png", 
						"images/koala.png", "images/monkey.png", 
						"images/mouse.png", "images/owl.png", 
						"images/panda.png", "images/penguin.png", 
						"images/pig.png", "images/racoon.png", 
						"images/sheep.png", "images/tiger.png"]

	
	
var matchset={}	
var leftset ={}
var rightset ={}
var leftchosen = null;
var rightchosen = null;
var puzzlesize = 4;
var SIZE = 4;
var timecount = null;
var totalSec = 0;
var initinstruction;
function First(){ 
	$("#BackMenu").click(function(){back2Main();});
	timer();
 	generateTable(4);
	$("#gensize").change(function(){SIZE = $('#gensize').find(':selected').text();
					startSequence();});
	gamestart(4);
	$(window).resize(function(){startSequence();});
}

function startSequence(){
		clearTable();
                var n = SIZE;
                puzzlesize = n;
                generateTable(n);
		$("footer").css({"position":"", "bottom":""});
                gamestart(n);

}

function clearTable(){
	$("#scoreboard").removeAttr('style');
	$("#dynamictable").empty();
}

var canvas;
var ctx;
function setCanvas(n){
	canvas = document.getElementById("cvs");
	//dynamically shifts
	var parent=document.getElementById("space");
	canvas.width=$("#space").width();
	$(canvas).css("padding", "0");
	canvas.height=$("#space").height();
	ctx=canvas.getContext("2d");
	ctx.lineWidth=2;
}

function drawStraightLine(l,r){
//draws straight line on cvs from l-th row to r-th row	
	var rowheight = canvas.height/SIZE;
	var lheight = l*rowheight + rowheight/2;
	var rheight = r*rowheight + rowheight/2;
	ctx.beginPath();
	ctx.moveTo(0, lheight);
	ctx.lineTo(canvas.width, rheight);
	ctx.stroke();
}

function drawCurveLine(l,r){
//draws bezier curve
	var rowheight = canvas.height/SIZE;
        var lheight = l*rowheight + rowheight/2;
        var rheight = r*rowheight + rowheight/2;
        ctx.beginPath();
        ctx.moveTo(0, lheight);
        ctx.bezierCurveTo(canvas.width*0.45, Math.abs(lheight-rheight)/3 + lheight , canvas.width*0.55, rheight-Math.abs(lheight-rheight)/5,canvas.width, rheight);
        ctx.stroke();
}


function generateTable(n){
	$("#Example1").fadeIn(1000);
	$("#scoreboard").empty();
	$("#won").css("display", "none");
	var table = $("#dynamictable");
	table.append("<tr><td class='left'><img class='image' draggable='true'></td><td id='space' rowspan = '"+n+"'><canvas id='cvs'></canvas></td><td class='right'><img class='image' draggable='true'></td></tr>"); 
	for (var i = 1; i < n; i++){
		table.append("<tr><td class='left'><img class='image' draggable='true'></td><td class='right'><img class='image' draggable='true'></td></tr>");
	}	
	randomize("left", "right", 1, n);
	SIZE = n;
	initializeMatchSet(n);
}

function initializeMatchSet(n){
	matchset = new Array();
	for (var i=0; i < n; i++){
		matchset[i] = -1;
	}
	setCanvas(n);
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
	console.log($("table").height());
	totalSec=0;
	clearInterval(timecount);
	timecount = setInterval(setTime, 1000);
	todrop(".image");
	tobind(".image", "down");
}

function tobind(name, event){
	if (event=="down"){
		$(name).bind("touchstart", function(){	clicked($(this), name, "clickdown");});
	}else{
		$(name).bind("touchend", function(){	clicked($(this), name, "clickup");});
	}
	//$(name).bind("click", function(){clicked($(this), name);});	
}

function clicked(e, name, event){
	var element = e;
	$(element).css("-webkit-filter", "invert(100%) blur(1px)");
	if ($(element).parent().attr("class") == "left"){
		leftchosen = element;
		if (event == "clickdown"){
			$(name).unbind("touchstart");
			tobind(".right>"+name, "up")
		}
		if (event == "clickup"){
			$(name).unbind("touchend");
		}

	}
	if ($(element).parent().attr("class") == "right"){
		rightchosen = element;
		if (event == "clickdown"){
                        $(name).unbind("touchstart");
                        tobind(".left>"+name, "up")
                }
                if (event == "clickup"){
                        $(name).unbind("touchend");
                }
	}
	check();
}



function showMessage(dragged){
	initinstruction = $('#instruction').text();
	if($(dragged).parent().attr("class") == "left"){
		$("#instruction").text("Drag to match on the RIGHT");
	}else{
		$("#instruction").text("Drag to match on the LEFT");
	}
	$("#instruction").css("display", "block");
}



function todrop(name){
	var dragged;
	var dragging = false;
	$(name).bind("mousedown", function(e){showMessage(e.target);});
	$(name).bind("drag", function(e){});
	$(name).bind("dragstart", function(e){
                                        dragged = e.target;
                                        $(e.target).css("-webkit-filter","invert(100%) blur(1px)");
                                });
	$(name).bind("dragend", function(e){
					$('#instruction').text(initinstruction);
					$(e.target).css("-webkit-filter", "");});
	
	$(name).bind("dragover", function(e){
				e.preventDefault();});


	$(name).bind("dragenter", function(e){
			if ($(e.target).parent().attr("class") == "right" && $(dragged).parent().attr("class") == "left"){
				$(e.target).css("-webkit-filter", "invert(100%) blur(1px)");	
			}else if ($(e.target).parent().attr("class") == "left" && $(dragged).parent().attr("class") == "right"){
				$(e.target).css("-webkit-filter", "invert(100%) blur(1px)");	
			}
	});
	
	$(name).bind("dragleave", function(e){
			if ($(e.target).parent().attr("class") == "right" && $(dragged).parent().attr("class") == "left"){
				$(e.target).css("-webkit-filter", "");	
			}else if ($(e.target).parent().attr("class") == "left" && $(dragged).parent().attr("class") == "right"){
				$(e.target).css("-webkit-filter", "");	
			}
	});
	

	$(name).bind("drop", function(e){
		e.preventDefault();
		if ($(e.target).parent().attr("class") == "right" && $(dragged).parent().attr("class") == "left"){
			rightchosen = e.target;
			leftchosen = dragged;
			check();
		}else if ($(e.target).parent().attr("class") == "left" && $(dragged).parent().attr("class") == "right"){
			rightchosen = dragged;
			leftchosen = e.target;
			check();	
		}
	});	

}

function obtainIndex(item){
	return $(item).parent().parent().index(); 
}

function storeMatch(l,r){
	matchset[l] = r;
	drawMatch();
}

function drawMatch(){
	for(var i=0; i<SIZE; i++){
		var selection = matchset[i];
		if (selection != -1){
			(Math.abs(i-selection) <= 1)? drawStraightLine(i, selection):drawCurveLine(i, selection);
		}	
	}
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
			$(leftchosen).attr("class","sil");
			$(rightchosen).attr("class","sil");
			storeMatch(obtainIndex(leftchosen), obtainIndex(rightchosen));
			$("#match").css("display", "block");
			setTimeout(function(){$('#match').fadeOut();}, 2000);
			puzzlesize--;
			updatescore(SIZE - puzzlesize, SIZE);
			if (puzzlesize == 0){
				endgame(1);
			}
			
		}else{
			$("#mismatch").css("display", "block");
			updatescore(SIZE - puzzlesize, SIZE);
			setTimeout(function(){$("#mismatch").fadeOut();}, 2000);
			$(leftchosen).css("-webkit-filter", "");
			$(rightchosen).css("-webkit-filter", "");	
		}
		leftchosen = null;
		rightchosen = null;
		tobind(".image", "down");
}
}

function endgame(mode){
	clearInterval(timecount);
	var time = $('#minutes').html()+" minutes "+$('#seconds').html()+" seconds";
	$("#won").empty();
	$("#won").append('Puzzle completed!  Time taken '+ time);
	$("#won").css("display", "block");
	$("#Example1").fadeOut(2000);
	$("footer").css({"position":"fixed", "bottom":"0"});
	$("html, body").animate({scrollTop:0},"slow");
	$("#scoreboard").append('<button id="another">Play Another</button>');
	$("#another").click(function(){startSequence();});
	$("#scoreboard").css({"width": "100%", "text-align":"center"});
	$("#scoreboard").css("position", "absolute").animate({top: 100}); 
}

function updatescore(i, n){
	$("#scoreboard").empty();
	$("#scoreboard").append('<h4>Score: ' +i+ ' / ' +n+'</h4>'); 	
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
// Get a regular interval for drawing to the screen


