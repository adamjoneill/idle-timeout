// Create an immediately invoked functional expression to wrap our code
(function() {
    // Define our constructor
    this.IdleTimer = function(timeout, callback, options) {
        // Create global element references
        this.start = null;
        this.stop = null;

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

        // Utility method to extend defaults with user options
        function extendDefaults(source, properties) {
            var property;
            for (property in properties) {
                if (properties.hasOwnProperty(property)) {
                    source[property] = properties[property];
                }
            }
            return source;
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

// var idleTimer = function() {
//     var start = function(timeout, callback, options) {
//         var timer;
//         window.onload = resetTimer;
//         // DOM Events
//         if (options === undefined) {
//             options = {};
//         }
//
//         if (options.events === undefined) {
//             options.events = [
//                 "onmousemove",
//                 "onkeypress",
//                 "onload",
//                 "onmousemove",
//                 "onmousedown",
//                 "ontouchstart",
//                 "onclick",
//                 "onscroll",
//                 "onkeypress"
//             ];
//         }
//
//         for (var i = 0; i < options.events.length; i++) {
//             document[options.events[i]] = resetTimer;
//         }
//
//         function raiseTimeout() {
//             callback();
//         }
//
//         function resetTimer() {
//             clearTimeout(timer);
//             timer = setTimeout(raiseTimeout, timeout);
//         }
//     };
// };
