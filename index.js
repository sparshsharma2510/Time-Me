let hours = 0;
let minutes = 0;
let seconds = 1;
let startHtml;
let pauseHtml;
let stopTimerFlag = false;
let initFlag = false;

document.querySelector("button.start").addEventListener('click', startTimer);

function startTimer(){
	if(initFlag === false){
		startHtml = (this);
		initFlag = true;
	}
	if(seconds === 1)
		removeStartAddPause();
	document.querySelector("button.pause").addEventListener('click', stopTimer);
	let driver = setInterval(function(){
		if(stopTimerFlag === true){
			splitPause();
			document.querySelector("button.resume").addEventListener('click', resumeTimer);
			document.querySelector("button.reset").addEventListener('click', resetTimer);	
			clearInterval(driver);
		}
		if(seconds === 60){
			if(minutes === 59){
				hours++;
				minutes = 0;
				seconds = 0;
			}
			else{
				seconds = 0;
				minutes++;
			}
		}
		
		let timer = "";
		if(hours < 10)
			timer = ("0"+hours+":");
		else
			timer = (hours+":");
		if(minutes < 10)
			timer += ("0"+minutes+":");
		else
			timer += (minutes+":");
		if(seconds < 10)
			timer += ("0"+seconds);
		else
			timer += seconds;

		document.querySelector(".start-stop p").innerHTML = timer;
		seconds++;

		if(hours === 23 && minutes === 59 && seconds === 59)
			return;
	},1000);
}

function stopTimer(){
	pauseHtml = this;
	stopTimerFlag = true;
}

function resetTimer(){
	document.querySelector(".start-stop p").textContent = "00:00:00";
	seconds = 1;
	minutes = 0;
	hours = 0;
	stopTimerFlag = false;
	document.querySelector("div.options").textContent = '';
	document.querySelector("div.options").appendChild(startHtml);
}

function resumeTimer(){
	document.querySelector("div.options").textContent = '';
	document.querySelector("div.options").appendChild(pauseHtml);
	stopTimerFlag = false;
	startTimer();
}

function removeStartAddPause(){
	document.querySelector("button.start").remove();
	let container = document.createElement('button');
	container.className =  "pause buttons";
	container.innerHTML = '<i class="fa fa-pause-circle"></i> Pause';
	document.querySelector("div.options").appendChild(container);
}

function splitPause(){
	document.querySelector("button.pause").remove();
	let container1 = document.createElement('button');
	container1.className =  "resume buttons";
	container1.innerHTML = '<i class="fa fa-play-circle"></i>';
	document.querySelector("div.options").appendChild(container1);

	let container2 = document.createElement('button');
	container2.className =  "reset buttons";
	container2.innerHTML = '<i class="fa fa-retweet"></i>';
	document.querySelector("div.options").appendChild(container2);
	return;
}