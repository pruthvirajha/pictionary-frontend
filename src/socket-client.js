import io from 'socket.io-client';
import { reconnectionConfig } from './socketConfig'

function connectToSocket() {
    console.log("Connecting to SOCKET_URL @: " + process.env.SOCKET_URL);
    const socket = io(process.env.SOCKET_URL, reconnectionConfig);
    socket.on('connect', (socketResponse) => {
        console.log("Socket connected" + JSON.stringify(socketResponse));
    });
}

export { connectToSocket }