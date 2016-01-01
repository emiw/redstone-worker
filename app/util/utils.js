/* (c) 2015-2016 EMIW, LLC. emiw.xyz/license */

// http://stackoverflow.com/a/10915724/1928484
export function splitByLength(str, len) {
  const parts = [];
  for (let offset = 0, strLen = str.length; offset < strLen; offset += len) {
    parts.push(str.slice(offset, len + offset));
  }
  return parts;
}
