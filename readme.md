## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions

For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
PrivateKey/PublicKey:
6b911fd31cef7c81d4d0adb1ab7fb822ed2539b0ad9ab18d7725ac88b29b718e/0380005c32265a88828f936b0fea965f79289183efc4272ea4918502f3792c5b35
6b911fd31cef7c81d4d2adb1abefb822ed2539b0ad9ab18d7725ac88b29b718e/028c99982a4e1f3fa57ae10075dca438ff0a9a481a422023063c2b57a381ae75f9
6b921fd31cef5c81d4d2adb1abefb822ed2539b0ad9ab18d7725ac98b29b718e/029350422f8f58509cc428cbccc86da64873da78bcb18b0be8b445f0d4d013a494
