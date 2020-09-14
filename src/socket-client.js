import io from 'socket.io-client';
import { reconnectionConfig, SOCKET_EVENT } from './socketConfig';

var socket;

function connectToSocket() {
    console.log(`Connecting to SOCKET_URL --> ${process.env.REACT_APP_SOCKET_URL}`);
    socket = io(process.env.REACT_APP_SOCKET_URL, reconnectionConfig);
    socket.on('connect', () => {
        console.log(`Socket connected - OK`);
    });
}

function subscribeToReceiveCoordinates(eventName, eventHandler){
    socket.on(eventName,eventHandler);
}

function emitMouseCoordinates(payload) {
    console.log(`Mouse Coordinate Payload: ${payload}`);
    socket.emit(SOCKET_EVENT.SEND_COORDINATES, payload);
}

export { connectToSocket, emitMouseCoordinates, subscribeToReceiveCoordinates }