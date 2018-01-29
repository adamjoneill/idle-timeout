const timeout = 10000; // 10 seconds
const callback = function() {
    alert("Session has been idle for " + timeout / 1000 + " seconds");
};
const timer = new IdleTimer(timeout, callback);

var state = "stopped";
function toggleStartStop() {
    if (state === "stopped") {
        state = "started";
        timer.start();
        document.getElementById("stop-start").value = "Stop";
    } else if (state === "started") {
        state = "stopped";
        timer.stop();
        document.getElementById("stop-start").value = "Start";
    }
}

function startDisplayTimer(duration, display) {
    var timer = duration;
    var minutes = 0;
    var seconds = 0;
    setInterval(function() {
        seconds += 1;
        if (seconds === 60) {
            seconds = 0;
            minutes += 1;
        }

        var minutesDisplay = parseInt(minutes) < 10 ? "0" + minutes : minutes;
        var secondsDisplay = parseInt(seconds) < 10 ? "0" + seconds : seconds;

        document.getElementById("simple-timer").innerHTML =
            minutesDisplay + ":" + secondsDisplay;
    }, 1000);
}

startDisplayTimer();
