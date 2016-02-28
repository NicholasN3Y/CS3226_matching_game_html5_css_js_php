function hide(sectionid){
	document.getElementById(sectionid).style.display = 'none';
}

function show(sectionid){
	document.getElementById(sectionid).style.display = 'block';
}

function show1(){
	hide('MenuPage');
	show('Example1');
	hide('Example2');
	hide('Example3');
	hide('Example4');
	hide('Example5');
	show('scenariobar');
}

function show2(){
	hide('MenuPage');
	hide('Example1');
	show('Example2');
	hide('Example3');
	hide('Example4');
	hide('Example5');
	show('scenariobar');
}

function show3(){
	hide('MenuPage');
	hide('Example1');
	hide('Example2');
	show('Example3');
	hide('Example4');
	hide('Example5');
	show('scenariobar');
}

function show4(){
	hide('MenuPage');
	hide('Example1');
	hide('Example2');
	hide('Example3');
	show('Example4');
	hide('Example5');
	show('scenariobar');
}

function show5(){
	hide('MenuPage');
	hide('Example1');
	hide('Example2');
	hide('Example3');
	hide('Example4');
	show('Example5');
	show('scenariobar');
}

function back2Main(){
	show('MenuPage');
	hide('Example1');
	hide('Example2');
	hide('Example3');
	hide('Example4');
	hide('Example5');
	hide('scenariobar');
}

function First(){
	for (var i = 0; i < 2; i++){
		document.getElementsByClassName("Scenario1")[i].addEventListener("click", function(){show1();});
		document.getElementsByClassName("Scenario2")[i].addEventListener("click", function(){show2();});
		document.getElementsByClassName("Scenario3")[i].addEventListener("click", function(){show3();});
		document.getElementsByClassName("Scenario4")[i].addEventListener("click", function(){show4();});
		document.getElementsByClassName("Scenario5")[i].addEventListener("click", function(){show5();});
	}
	document.getElementById("BackMenu").addEventListener("click", function(){back2Main();});
	document.getElementById("BackMenu").addEventListener("click", function(){randomizeAll();});
 	document.getElementById("reset1").addEventListener("click", function(){randomize("left", "right", 1);});
 	document.getElementById("reset2").addEventListener("click", function(){randomize("leftTwo", "rightTwo", 0);});
 	document.getElementById("reset3").addEventListener("click", function(){randomize("leftThree", "rightThree", 0);});
 	document.getElementById("reset4").addEventListener("click", function(){randomize("leftFour", "rightFour", 1);});
	document.getElementById("reset5").addEventListener("click", function(){randomize("leftFive", "rightFive", 0);});
	
	randomizeAll();
}

function randomizeAll(){
	randomize("left", "right", 1);
	randomize("leftTwo", "rightTwo", 0);
	randomize("leftThree", "rightThree", 0);
	randomize("leftFour", "rightFour", 1);
	randomize("leftFive", "rightFive", 0);
}

function randomy(list){
	for (var i = list.length - 1; i > 0; i--){
		var j = Math.floor(Math.random() * (i+1));
		var temp= list[i];
		list[i] = list[j];
		list[j] = temp;
	}
	return list;
}

/*same == 0  meaning right column does not have same.*/ 
function randomize(left, right, same){
	var l_column = document.getElementsByClassName(left);
	var list = [];
	for(var i = 0; i< l_column.length; i++){
		list[i] = l_column[i].firstChild.getAttribute("src");	
	}
	list = randomy(list);
	replace(list, left);
	if (same == 1){
		list = randomy(list);
		replace(list, right);
	}else{
		var r_column = document.getElementsByClassName(right);
		var rlist = [];
		for(var i = 0; i< r_column.length; i++){
			rlist[i] = r_column[i].firstChild.getAttribute("src");	
		}
	    rlist = randomy(rlist);
		replace(rlist, right);
	}
}

function replace(list, column){
	var images =  document.getElementsByClassName(column);
	for(var i = 0; i < list.length; i++){
		images[i].firstChild.setAttribute("src", list[i]);
	}
}

window.onload = First;


