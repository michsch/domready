/**
 * DOMAssistant.DOMLoad
 * found here: https://code.google.com/p/domassistant/source/browse/trunk/modules/DOMAssistantLoad.js
 *
 * Developed by Robert Nyman/DOMAssistant team,
 * code/licensing: http://domassistant.googlecode.com/,
 * documentation: http://www.domassistant.com/documentation.
 *
 * Module inspiration by Dean Edwards, Matthias Miller,
 * and John Resig: http://dean.edwards.name/weblog/2006/06/again/
*/

/* jshint evil:true, nonew:true, unused:false*/

/* global
  define,
  exports,
  module
*/

(function(root, factory, sr) {
  "use strict";
  var exports;
  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    exports = root.DOMAssistant || {};
    factory(exports);
    root.DOMAssistant = exports;
    root[sr] = exports.DOMReady;
  }
})((typeof window === 'object' && window) || this, function(exports) {
  "use strict";
  var errorHandling;
  exports = exports || {};
  errorHandling = errorHandling || void 0;
  exports.DOMLoad = (function() {
    var DOMHasLoaded, DOMLoadTimer, DOMLoaded, addedStrings, execFunctions, functionsToCall;
    DOMLoaded = false;
    functionsToCall = [];
    addedStrings = {};
    execFunctions = function() {
      var e, i, il;
      i = 0;
      il = functionsToCall.length;
      while (i < il) {
        try {
          functionsToCall[i]();
        } catch (_error) {
          e = _error;
          if (typeof errorHandling === "function") {
            errorHandling(e);
          }
        }
        i++;
      }
      functionsToCall = [];
    };
    DOMHasLoaded = function() {
      if (DOMLoaded) {
        return;
      }
      DOMLoaded = true;
      execFunctions();
    };
    /*
      Internet Explorer
    */

    /*@cc_on
    @if (@_win32 || @_win64)
      document.write("<script id=\"ieScriptLoad\" defer src=\"//:\"><\/script>");
      document.getElementById("ieScriptLoad").onreadystatechange = function() {
        if (this.readyState === "complete") {
          DOMHasLoaded();
        }
      };
    @end @
    */

    /*
     Mozilla, Chrome, Opera
    */

    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", DOMHasLoaded, false);
    }
    if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) {
      DOMLoadTimer = setInterval(function() {
        var domHasLoaded;
        if (/loaded|complete/i.test(document.readyState)) {
          domHasLoaded = new DOMHasLoaded();
          return clearInterval(DOMLoadTimer);
        }
      }, 10);
    }
    /*
     Other web browsers
    */

    window.onload = DOMHasLoaded;
    return {
      DOMReady: function() {
        var funcRef, i, il;
        i = 0;
        il = arguments.length;
        funcRef = void 0;
        while (i < il) {
          funcRef = arguments[i];
          if (!funcRef.DOMReady && !addedStrings[funcRef]) {
            if (typeof funcRef === "string") {
              addedStrings[funcRef] = true;
              funcRef = new Function(funcRef);
            }
            funcRef.DOMReady = true;
            functionsToCall.push(funcRef);
          }
          i++;
        }
        if (DOMLoaded) {
          return execFunctions();
        }
      },
      setErrorHandling: function(funcRef) {
        return errorHandling = funcRef;
      }
    };
  })();
  exports.DOMReady = exports.DOMLoad.DOMReady;
}, 'domReady');
