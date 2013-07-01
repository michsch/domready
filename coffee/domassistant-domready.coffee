###*
 * DOMAssistant.DOMLoad
 * found here: https://code.google.com/p/domassistant/source/browse/trunk/modules/DOMAssistantLoad.js
 *
 * Developed by Robert Nyman/DOMAssistant team,
 * code/licensing: http://domassistant.googlecode.com/,
 * documentation: http://www.domassistant.com/documentation.
 *
 * Module inspiration by Dean Edwards, Matthias Miller,
 * and John Resig: http://dean.edwards.name/weblog/2006/06/again/
###

### jshint evil:true, nonew:true, unused:false ###
### global
  define,
  exports,
  module
###

( ( root, factory, sr ) ->
  "use strict"

  if typeof exports is 'object'
    module.exports = factory()
  else if typeof define is 'function' and define.amd
    define factory
  else
    exports = root.DOMAssistant or {}
    factory exports

    root.DOMAssistant = exports
    root[sr] = exports.DOMReady

  return
) ( typeof window is 'object' and window ) or @, ( exports ) ->
  "use strict"

  exports = exports or {}
  errorHandling = errorHandling or undefined

  #global DOMAssistant
  exports.DOMLoad = do ->
    DOMLoaded = false
    functionsToCall = []
    addedStrings = {}

    execFunctions = ->
      i = 0
      il = functionsToCall.length

      while i < il
        try
          functionsToCall[i]()
        catch e
          errorHandling? e
        i++
      functionsToCall = []
      return

    DOMHasLoaded = ->
      return  if DOMLoaded
      DOMLoaded = true
      execFunctions()
      return

    ###
      Internet Explorer
    ###
    ###@cc_on
    @if (@_win32 || @_win64)
      document.write("<script id=\"ieScriptLoad\" defer src=\"//:\"><\/script>");
      document.getElementById("ieScriptLoad").onreadystatechange = function() {
        if (this.readyState === "complete") {
          DOMHasLoaded();
        }
      };
    @end @
    ###

    ###
     Mozilla, Chrome, Opera
    ###
    document.addEventListener "DOMContentLoaded", DOMHasLoaded, false  if document.addEventListener

    # Safari, iCab, Konqueror
    if /KHTML|WebKit|iCab/i.test(navigator.userAgent)
      DOMLoadTimer = setInterval ->
        if /loaded|complete/i.test(document.readyState)
          domHasLoaded = new DOMHasLoaded()
          clearInterval DOMLoadTimer
      , 10

    ###
     Other web browsers
    ###
    window.onload = DOMHasLoaded

    DOMReady : ->
      i = 0
      il = arguments.length
      funcRef = undefined

      while i < il
        funcRef = arguments[i]
        if not funcRef.DOMReady and not addedStrings[funcRef]
          if typeof funcRef is "string"
            addedStrings[funcRef] = true
            funcRef = new Function(funcRef)
          funcRef.DOMReady = true
          functionsToCall.push funcRef
        i++
      execFunctions()  if DOMLoaded

    setErrorHandling : (funcRef) ->
      errorHandling = funcRef

    #throw new Error "test"

  exports.DOMReady = exports.DOMLoad.DOMReady
  return
, 'domReady'
