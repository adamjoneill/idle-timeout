// Create an immediately invoked functional expression to wrap our code
(function() {
    // Define our constructor
    this.IdleTimer = function(timeout, callback, options) {
        var timer;
        var resetTimer;

        // Define option defaults
        var defaults = {
            events: [
                "onmousemove",
                "onkeypress",
                "onload",
                "onmousemove",
                "onmousedown",
                "ontouchstart",
                "onclick",
                "onscroll",
                "onkeypress"
            ]
        };

        if (options === undefined) {
            options = defaults;
        }

        if (options.events === undefined) {
            options.events = defaults.events;
        }

        var start = function() {
            // Store the value of this
            var _ = this;

            resetTimer = function() {
                clearTimeout(timer);
                timer = setTimeout(raiseTimeout, timeout);
            };

            for (var i = 0; i < options.events.length; i++) {
                document[options.events[i]] = resetTimer;
            }

            function raiseTimeout() {
                callback();
            }

            resetTimer();
        };

        var stop = function() {
            // Store the value of this
            var _ = this;

            clearTimeout(timer);
            timer = null;
            resetTimer = function() {
                // do nothing
            };
        };

        return {
            start,
            stop
        };
    };
})();
