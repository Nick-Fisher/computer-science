HTTP/1 came out in 1996. It's built on top of TCP. Every request to the same server requires a separate TCP connection.
HTTP/1.1 followed in 1997. It introduced a keep-alive mechanism("keep-alive" reuse the same TCP connection). Connection could be reuse for more than a single request. The persistant connections reduce request latency because the client does not need to initiate expensive TCP three-way handshake for every request.
It's also added HTTP pipelining but it's tricky and hard to implement and it's support was removed from many web browsers.
HTTP/2 published in 2015. It's introduces HTTP streams, where multiple streams of requests could be sent to the the same server on a single connection. Unlike HTTP/1.1 pipelining each stream is independent of each other and it doesn't need to be sent or received in order. HTTP/2 solves the headline blocking issue at the application layer.

**HTTP Head of line blocking**

Head of Line blocking in HTTP terms is often referring to the fact that each browser/client has a limited number of connections to a server and doing a new request over one of those connections has to wait for the ones to complete before it can fire it off.

The head of line requests block the subsequent ones.

HTTP/2 solves this by introducing multiplexing so that you can issue new requests over the same connection without having to wait for the previous ones to complete.

In theory, the pipelining of HTTP/1.1 also offered a way around HOL, but it was tricky and very error-prone to implement in practice. That has made it not get widely enabled on the web even up till today.

**TCP Head of line blocking**

HTTP/2 does however still suffer from another kind of HOL, namely on the TCP level. One lost packet in the TCP stream makes all streams wait until that packet is re-transmitted and received. This HOL is being addressed with the QUIC protocol...

QUIC is a "TCP-like" protocol implemented over UDP where each stream is independent so that a lost packet only halts the particular stream to which the lost packet belongs, while the other streams can go on.

HTTP/3 is being done over QUIC instead of TCP and TLS.

HTTP/2 also introduced a push capability to allow servers to send updates to the clients whenever new data is available without requiring a client to poll.

HTTP/3 began as a draft in 2020 and published june 2022. It uses new protocol called QUIC instead of TCP as underlying transport protocol. QUIC is based on UDP. It introduces streams as the first-class citizen at the transport layer.

QUIC streams share the same quick connection so no additional handshake are required to create a new ones. QUIC streams are deliverd independently. In most cases packet loss affecting one stream and doesn't affect others. QUIC is designed for mobile heavy internet usage and for easy switching between source of internet(4G/wifi etc.). This

QUIC also implements a concept called connection ID which allows connections to move between IP addresses and network interfaces quickly and reliably.