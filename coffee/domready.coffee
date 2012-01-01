###*
 * DOMReady
 *
 * Cross browser object to attach functions that will be called
 * immediatly when the DOM is ready.
 *
 * @version   1.0
 * @author    Victor Villaverde Laan
 * @link      http://www.freelancephp.net/domready-javascript-object-cross-browser/
 * @license   MIT license
###

DOMReady = (->
  fns = []
  isReady = false
  errorHandler = null
  getFunc = (fn) ->
    if typeof fn is "string"
      return ->
        eval fn
    fn

  ready = ->
    isReady = true
    x = 0

    # call all registered functions
    while x < fns.length
      try
        # call function
        fns[x]()
      catch err
        # error occured while executing function
        errorHandler err  if errorHandler
      x++

  ###*
   * Setting error handler
   * @param {function|string} fn  When string will be run like code with eval()
   * @return {this} For chaining
  ###
  @setOnError = (fn) ->
    errorHandler = getFunc(fn)
    this

  ###*
   * Add code or function to execute when the DOM is ready
   * @param {function|string} fn  When string will be run like code with eval()
   * @return {this} For chaining
  ###
  @add = (fn) ->
    fn = getFunc(fn)
    # call imediately when DOM is already ready
    if isReady
      fn()
    else
      # add to the list
      fns[fns.length] = fn
    # return this for chaining
    this

  # For all browsers except IE
  if window.addEventListener
    document.addEventListener "DOMContentLoaded", (->
      ready()
    ), false
  else
    # For IE
    # Code taken from http://ajaxian.com/archives/iecontentloaded-yet-another-domcontentloaded
    (->
      # check IE's proprietary DOM members
      return  if not document.uniqueID and document.expando
      # you can create any tagName, even customTag like <document :ready />
      tempNode = document.createElement("document:ready")
      try
        # see if it throws errors until after ondocumentready
        tempNode.doScroll "left"
        # call ready
        ready()
      catch err
        setTimeout arguments.callee, 0
    )()
  this
)()