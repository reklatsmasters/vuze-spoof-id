'use strict'

const test = require('tape')
const spoof = require('./')

test('should work', function (t) {
  var key = spoof.key()
  
  t.ok(Buffer.isBuffer(key), 'is buffer')
  t.equal(key.length, 16)
  
  var id = spoof.id('1.2.3.4', key)
  t.equal(typeof id, 'number')
  
  t.throws(function () {
    spoof.id('1.2', key)
  })
  
  t.throws(function () {
    spoof.id('1.2.3.4', new Buffer(3))
  })
  
  t.end()
})