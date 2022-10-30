//
//http://alexkatz.me/posts/building-a-custom-html5-audio-player-with-javascript/
//

var music = document.getElementById('music1'); // id for audio element
var pButton1 = document.getElementById('pButton1'); // play button
var pButton2 = document.getElementById('pButton2'); // play button
var pButton3 = document.getElementById('pButton3'); // play button

var duration = music.duration; // Duration of audio clip, calculated here for embedding purposes
var playhead = document.getElementById('playhead'); // playhead
var timeline = document.getElementById('timeline'); // timeline

// timeline width adjusted for playhead
//var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

// play button event listenter
pButton1.addEventListener("click", function(){
		play(1);
	}, false);
pButton2.addEventListener("click", function(){
		play(2);
	}, false);
pButton3.addEventListener("click", function(){
		play(3);
	}, false);

// timeupdate event listener
//music.addEventListener("timeupdate", timeUpdate, false);

// makes timeline clickable
if (timeline !== null) {
timeline.addEventListener("click", function(event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
}, false);
}

// returns click as decimal (.77) of the total timelineWidth
function clickPercent(event) {
    return (event.clientX - getPosition(timeline)) / timelineWidth;
}

// makes playhead draggable
//playhead.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

// Boolean value so that audio position is updated only when the playhead is released
var onplayhead = false;

// mouseDown EventListener
function mouseDown() {
    onplayhead = true;
    window.addEventListener('mousemove', moveplayhead, true);
    music.removeEventListener('timeupdate', timeUpdate, false);
}

// mouseUp EventListener
// getting input from all mouse clicks
function mouseUp(event) {
    if (onplayhead == true) {
        moveplayhead(event);
        window.removeEventListener('mousemove', moveplayhead, true);
        // change current time
        music.currentTime = duration * clickPercent(event);
        music.addEventListener('timeupdate', timeUpdate, false);
    }
    onplayhead = false;
}
// mousemove EventListener
// Moves playhead as user drags
function moveplayhead(event) {
    var newMargLeft = event.clientX - getPosition(timeline);

    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.marginLeft = newMargLeft + "px";
    }
    if (newMargLeft < 0) {
        playhead.style.marginLeft = "0px";
    }
    if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + "px";
    }
}

// timeUpdate
// Synchronizes playhead position with current point in audio
function timeUpdate() {
    var playPercent = timelineWidth * (music.currentTime / duration);
    playhead.style.marginLeft = playPercent + "px";
    if (music.currentTime == duration) {
        pButton.className = "";
        pButton.className = "play";
    }
}

//Play and Pause
function play(id) {
	console.log(document.getElementById('music' + id));
	music = document.getElementById('music' + id);
    pButton = document.getElementById('pButton' + id); // play button
    // start music
    if (music.paused) {
        music.play();
        // remove play, add pause
        pButton.className = "";
        pButton.className = "pause";
    } else { // pause music
        music.pause();
        // remove pause, add play
        pButton.className = "";
        pButton.className = "play";
    }
}

// Gets audio file duration
music.addEventListener("canplaythrough", function() {
    duration = music.duration;
}, false);

// getPosition
// Returns elements left position relative to top-left of viewport
function getPosition(el) {
    return el.getBoundingClientRect().left;
}