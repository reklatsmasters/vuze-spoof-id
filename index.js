'use strict'

const hat = require('hat')
const ipaddr = require('ipaddr.js')
const crypto = require('crypto')

function md5(data) {
  var hash = crypto.createHash('md5')
  hash.update(data)
  
  return hash.digest()
}

/**
 * Randomely generated key at the start
 * Part of each spoof id
 */
exports.key = function spoof_key() {
  return new Buffer(hat(128), 'hex')
}

/**
 * @param {string} address - ipv4 address
 * @param {buffer} spoof_key 
 */
exports.id = function spoof_id(ip, spoof_key) {
  if (!Buffer.isBuffer(spoof_key) || spoof_key.length != 16) {
    throw new TypeError('Invalid spoof_key')
  }
  
  var address = ipaddr.IPv4.parse(ip).toByteArray()
  var data_in = new Buffer(spoof_key)
  
  for ( var i=0;i<address.length;i++){
    data_in[i] ^= address[i]
  }
  
  var data_out = md5(data_in)
  
  return (data_out[0]<<24)&0xff000000 |
         (data_out[1] << 16)&0x00ff0000 | 
         (data_out[2] << 8)&0x0000ff00 | 
         data_out[3]&0x000000ff
}