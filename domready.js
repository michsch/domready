
/**
 * DOMReady
 *
 * Cross browser object to attach functions that will be called
 * immediatly when the DOM is ready.
 *
 * @version   1.0
 * @author    Victor Villaverde Laan
 * @link      http://www.freelancephp.net/domready-javascript-object-cross-browser/
 * @license   MIT license
*/

var DOMReady;

DOMReady = (function() {
  var errorHandler, fns, getFunc, isReady, ready;
  fns = [];
  isReady = false;
  errorHandler = null;
  getFunc = function(fn) {
    if (typeof fn === "string") {
      return function() {
        return eval(fn);
      };
    }
    return fn;
  };
  ready = function() {
    var x, _results;
    isReady = true;
    x = 0;
    _results = [];
    while (x < fns.length) {
      try {
        fns[x]();
      } catch (err) {
        if (errorHandler) errorHandler(err);
      }
      _results.push(x++);
    }
    return _results;
  };
  /**
   * Setting error handler
   * @param {function|string} fn  When string will be run like code with eval()
   * @return {this} For chaining
  */
  this.setOnError = function(fn) {
    errorHandler = getFunc(fn);
    return this;
  };
  /**
   * Add code or function to execute when the DOM is ready
   * @param {function|string} fn  When string will be run like code with eval()
   * @return {this} For chaining
  */
  this.add = function(fn) {
    fn = getFunc(fn);
    if (isReady) {
      fn();
    } else {
      fns[fns.length] = fn;
    }
    return this;
  };
  if (window.addEventListener) {
    document.addEventListener("DOMContentLoaded", (function() {
      return ready();
    }), false);
  } else {
    (function() {
      var tempNode;
      if (!document.uniqueID && document.expando) return;
      tempNode = document.createElement("document:ready");
      try {
        tempNode.doScroll("left");
        return ready();
      } catch (err) {
        return setTimeout(arguments.callee, 0);
      }
    })();
  }
  return this;
})();
