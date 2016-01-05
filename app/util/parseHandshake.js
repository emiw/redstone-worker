/* (c) 2016 EMIW, LLC. emiw.xyz/license */
import varint from 'varint';

function getVarInt(bytes) {
  const ret = varint.decode(bytes);
  bytes.splice(0, varint.decode.bytes); // I bet there's a better way to do this, but I couldn't figure it out.
  return ret;
}

export default function parseMinecraftHandshake(bytes) {
  if (!(bytes instanceof Buffer)) throw new TypeError();

  bytes = [].slice.apply(bytes);

  /* eslint no-unused-vars:0 */
  const length = getVarInt(bytes);
  const packetID = getVarInt(bytes); // This will always be zero, but we need to get rid of the bytes.
  const protocolVersion = getVarInt(bytes); // This should be 47.
  const hostNameLength = getVarInt(bytes);
  const hostnameBytes = bytes.splice(0, hostNameLength);
  const hostname = new Buffer(hostnameBytes).toString('utf8');
  const port = (bytes.shift() << 8) + bytes.shift(); // The next two bytes are the port. Usually 25565.
  const nextState = getVarInt(bytes);

  return { hostname, port, status: nextState === 1, game: nextState === 2 };
}
