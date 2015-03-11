


var loopTimeout = function (i, max, interval, func) {
    if (i >= max) {
        return;
    }
    if (typeof func === 'function') {
        func(i++);
    }

    setTimeout(function() {
        loopTimeout(i, max, interval, func);
    }, interval);
};
