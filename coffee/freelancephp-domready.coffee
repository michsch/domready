###*
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
###

###* jshint ###
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
    root[sr] = factory()

  return
) ( typeof window is 'object' and window ) or @, () ->
  "use strict"

  exports = exports || {}

  document = window.document
  fns = []
  args = []
  isReady = false
  errorHandler = null

  ###*
   * Call a ready handler
   * @private
   * @param {function} fn
  ###
  call = (fn) ->
    try
      ###
       call function
      ###
      fn.apply this, args
    catch e
      ###
       error occured while executing function
      ###
      errorHandler.call this, e  if errorHandler isnt null


  ###*
   * Call all ready handlers
   * @private
  ###
  run = ->
    x = undefined
    isReady = true

    # call all registered functions
    x = 0
    while x < fns.length
      call fns[x]
      x = x + 1
    # clear handlers
    fns = []

  ###*
   * Initialize
   * @private
  ###
  init = ->
    if window.addEventListener
      # for all browsers except IE
      document.addEventListener "DOMContentLoaded", ->
        run()
      , false
    else

      ###
       for IE
       code taken from http://javascript.nwbox.com/IEContentLoaded/
      ###
      poll = ->
        ###
         check IE's proprietary DOM members
        ###
        return  if not document.uniqueID and document.expando

        ###
         you can create any tagName, even customTag like <document :ready />
        ###
        tempNode = document.createElement("document:ready")
        try
          ###
           see if it throws errors until after ondocumentready
          ###
          tempNode.doScroll "left"
          ###
           call run
          ###
          run()
        catch e
          window.setTimeout poll, 10

      ###
       trying to always fire before onload
      ###
      document.onreadystatechange = ->
        if document.readyState is "complete"
          document.onreadystatechange = null
          run()

      poll()

  ###*
   * @namespace domReady
   *
   * @public
   * @param {function} fn
   * @return {domReady}
  ###
  domReady = (fn) ->
    domReady.on fn

  ###*
   * Add code or function to execute when the DOM is ready
   * @public
   * @param {function} fn
   * @return {domReady}
  ###
  domReady.on = (fn) ->
    ###
     call imediately when DOM is already ready
    ###
    if isReady
      call fn
    else
      ###
       add to the list
      ###
      fns[fns.length] = fn
    this

  ###*
   * Set params that will be passed to every ready handler
   * @public
   * @param {Array.<*>} params
   * @return {domReady}
  ###
  domReady.params = (params) ->
    args = params
    this

  ###*
   * Set error callback
   * @public
   * @param {function([Error|string])} fn
   * @return {domReady}
  ###
  domReady.error = (fn) ->
    errorHandler = fn
    this

  ###
   initialize
  ###
  init()

  exports.domReady = domReady
, 'domReady'
