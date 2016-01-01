/* (c) 2015 EMIW, LLC. emiw.xyz/license */

// WARNING: The terminology in this file is very loosely defined.
// TODO: Fix terminology.
export const END_OF_PACKET = ';';
export const CONTROL_SEPERATOR = ':';
export const ENCODING = 'base64';

function isWorthEncoding(str) {
  return str !== undefined && str !== null;
}

export function enc(ctrl, packet = new Buffer('')) {
  if (!(packet instanceof Buffer)) throw new TypeError('Packet must be a Buffer');
  packet = packet.toString(ENCODING);
  if (isWorthEncoding(ctrl)) {
    ctrl = JSON.stringify(ctrl);
    ctrl = encodeURIComponent(ctrl);
  } else {
    ctrl = '';
  }
  return ctrl + CONTROL_SEPERATOR + packet + END_OF_PACKET;
}

export function dec(str) {
  // I think this is slightly more performant in the long run, because we iterate over the string only once
  const strLen = str.length;
  let ctrlDone = false;
  let ctrlStr = '';
  let packetStr = '';

  if (str[strLen - 1] !== ';') throw new Error('Invalid Packet: Incomplete');

  if (str[0] === ':') {
    // If there's not ctrl, then we can cheat.
    packetStr = str.slice(1, -1);
  } else {
    for (let i = 0; i < strLen - 1; ++i) {
      const char = str[i];
      if (char === CONTROL_SEPERATOR) {
        ctrlDone = true;
      } else if (ctrlDone) {
        packetStr += char;
      } else {
        ctrlStr += char;
      }
    }
  }

  let ctrl;

  if (ctrlStr !== '') {
    ctrlStr = decodeURIComponent(ctrlStr);
    ctrl = JSON.parse(ctrlStr);
  } else {
    ctrl = null;
  }
  const packet = new Buffer(packetStr, ENCODING);

  return { ctrl, packet: packet };
}
