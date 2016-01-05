# Minecraft handshake
---

The first thing every minecraft connection does is a [handshake][]. Its pre-encryption, so we can intercept it, and it
contains a few useful things, namely the target hostname and if it's a status ping or a actual game connection.

Here's an example handshake packet that I harvested. It was game connection, connecting to `localhost:3001`:

```
0f 00 2f 09 6c 6f 63 61 6c 68 6f 73 74 0b b9 02
```

Here it is in plain binary:

```
0000 1111 0000 0000 0010 1111 0000 1001 0110 1100 0110 1111 0110 0011 0110 0001 0110 1100 0110 1000 0110 1111 0111 0011 0111 0100 0000 1011 1011 1001 0000 0010
```

And here's what it means:

```
 _______________________________________________________________________________________________________________________________________________________________
|         |         |         |                         Hostname (it's a string, so it's rather complex.)                         |                   |         |
|0000 1111|0000 0000|0010 1111|0000 1001 0110 1100 0110 1111 0110 0011 0110 0001 0110 1100 0110 1000 0110 1111 0111 0011 0111 0100|0000 1011 1011 1001|0000 0010|
|packet   | packet  |protocol |hostname |                         hostname (UTF-8 encoded)='localhost'                            |     port=3001     |   Next  |
|length=15|  ID=0   |   v=47  |length=9 |                                                                                         |                   | State=2 |
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------
```

[handshake]: http://wiki.vg/Protocol#Handshaking
