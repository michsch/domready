/* jshint unused:false */

( function( $, root ) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module( 'domReady', {
    // This will run before each test in this module.
    setup: function() {
      return true;
    }
  });

  test('is function', function() {
    expect(1);
    strictEqual( typeof domReady, 'function', 'should be chainable');
  });

  test( 'domReady event', function() {
    expect(1);
    strictEqual( $('h1#domReady').text(), 'domReady', 'domReady' );
  });

  if (typeof root.DOMAssistant !== 'object' && typeof root.DOMAssistant !== 'function') {
    test( 'nested domReady', function() {
      expect(1);
      strictEqual( $('h1#nestedDomReady').text(), 'nestedDomReady', 'nestedDomReady' );
    });
  }

}( jQuery, window ));
