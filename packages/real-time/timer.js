"use strict";

module.exports = class Timer
{
  constructor(fn, interval) {
    this.fn = fn;
    this.interval = interval;
  }

  run() {
    var timer = this;
    var time_diff = this.interval;
    var now = new Date();

    if(typeof timer.interval != 'undefined' && timer.fn) {
      if(timer.last_time) {
        time_diff = now - timer.last_time;
      }
      timer.last_time = now;

      var new_interval = 2 * timer.interval - time_diff;

      timer.fn();
      timer.timeout = setTimeout(function() { timer.run(); }, new_interval);
    }
  }
}
