var SOCKET_EVENT = {};
SOCKET_EVENT.SEND_COORDINATES = 'send_coordinates';
SOCKET_EVENT.RECEIVE_COORDINATES = 'receive_coordinates';

const reconnectionConfig = {
    reconnection: false,             // whether to reconnect automatically
    reconnectionAttempts: 1, // number of reconnection attempts before giving up
    reconnectionDelay: 1000,        // how long to initially wait before attempting a new reconnection
    reconnectionDelayMax: 0,     // maximum amount of time to wait between reconnection attempts. Each attempt increases the reconnection delay by 2x along with a randomization factor
    randomizationFactor: 0
}
export { reconnectionConfig, SOCKET_EVENT };