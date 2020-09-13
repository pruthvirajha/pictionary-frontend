import io from 'socket.io-client';
import { reconnectionConfig } from './socketConfig'

function connectToSocket() {
    console.log(`Connecting to SOCKET_URL --> ${process.env.REACT_APP_SOCKET_URL}`);
    const socket = io(process.env.REACT_APP_SOCKET_URL, reconnectionConfig);
    socket.on('connect', () => {
        console.log(`Socket connected - OK`);
    });
}

export { connectToSocket }