/**
 * domReady
 *
 * @fileOverview
 *    Cross browser object to attach functions that will be called
 *    immediatly when the DOM is ready.
 *    Released under MIT license.
 * @version 3.0.0
 * @author Victor Villaverde Laan
 * @license MIT
 * @link http://www.freelancephp.net/domready-javascript-object-cross-browser/
 * @link https://github.com/freelancephp/DOMReady
*/

/** jshint*/

/* global
  define,
  exports,
  module
*/

(function(root, factory, sr) {
  "use strict";
  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    root[sr] = factory();
  }
})((typeof window === 'object' && window) || this, function() {
  "use strict";
  var args, call, document, domReady, errorHandler, exports, fns, init, isReady, run;
  exports = exports || {};
  document = window.document;
  fns = [];
  args = [];
  isReady = false;
  errorHandler = null;
  /**
   * Call a ready handler
   * @private
   * @param {function} fn
  */

  call = function(fn) {
    var e;
    try {
      /*
       call function
      */

      return fn.apply(this, args);
    } catch (_error) {
      e = _error;
      /*
       error occured while executing function
      */

      if (errorHandler !== null) {
        return errorHandler.call(this, e);
      }
    }
  };
  /**
   * Call all ready handlers
   * @private
  */

  run = function() {
    var x;
    x = void 0;
    isReady = true;
    x = 0;
    while (x < fns.length) {
      call(fns[x]);
      x = x + 1;
    }
    return fns = [];
  };
  /**
   * Initialize
   * @private
  */

  init = function() {
    var poll;
    if (window.addEventListener) {
      return document.addEventListener("DOMContentLoaded", function() {
        return run();
      }, false);
    } else {
      /*
       for IE
       code taken from http://javascript.nwbox.com/IEContentLoaded/
      */

      poll = function() {
        /*
         check IE's proprietary DOM members
        */

        var e, tempNode;
        if (!document.uniqueID && document.expando) {
          return;
        }
        /*
         you can create any tagName, even customTag like <document :ready />
        */

        tempNode = document.createElement("document:ready");
        try {
          /*
           see if it throws errors until after ondocumentready
          */

          tempNode.doScroll("left");
          /*
           call run
          */

          return run();
        } catch (_error) {
          e = _error;
          return window.setTimeout(poll, 10);
        }
      };
      /*
       trying to always fire before onload
      */

      document.onreadystatechange = function() {
        if (document.readyState === "complete") {
          document.onreadystatechange = null;
          return run();
        }
      };
      return poll();
    }
  };
  /**
   * @namespace domReady
   *
   * @public
   * @param {function} fn
   * @return {domReady}
  */

  domReady = function(fn) {
    return domReady.on(fn);
  };
  /**
   * Add code or function to execute when the DOM is ready
   * @public
   * @param {function} fn
   * @return {domReady}
  */

  domReady.on = function(fn) {
    /*
     call imediately when DOM is already ready
    */

    if (isReady) {
      call(fn);
    } else {
      /*
       add to the list
      */

      fns[fns.length] = fn;
    }
    return this;
  };
  /**
   * Set params that will be passed to every ready handler
   * @public
   * @param {Array.<*>} params
   * @return {domReady}
  */

  domReady.params = function(params) {
    args = params;
    return this;
  };
  /**
   * Set error callback
   * @public
   * @param {function([Error|string])} fn
   * @return {domReady}
  */

  domReady.error = function(fn) {
    errorHandler = fn;
    return this;
  };
  /*
   initialize
  */

  init();
  return exports.domReady = domReady;
}, 'domReady');
